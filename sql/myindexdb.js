function $(id){
	return document.getElementById(id);
}

function readContent(){
	var user = {};
	user.id = parseInt(localStorage.pk==null?pk:localStorage.pk);
	localStorage.pk = ++user.id;
	user.username = $("username").value;
	user.pwd = $("pwd").value;
	user.age = $("age").value;
	return user;
}
var pk = 1002;
var db;
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

function createObjectStore(){
	var req = indexedDB.open("emp");
	req.onerror = function(e){
		console.log(e.target.errorCode);
	}
	
	req.onsuccess = function(e){
		db = e.target.result;
		console.log("successs");
	}
	
	req.onupgradeneeded = function(e){
		//当创建新的数据库或者版本发生变化时，需要创建objectstore(类似于创建表)
		db = e.target.result;
		if(!db.objectStoreNames.contains("emp")){
			db.createObjectStore("emp",{keyPath:"username"});
		}
		console.log("建表成功");
	}
}


window.addEventListener("load",loaddemo,false);
function loaddemo(){
	//indexedDB.deleteDatabase("emp");
	createObjectStore();
	$("btn").onclick = function(){
		var user = readContent();
		addData(user);
	}
	
	setTimeout(readData,500);
	
}
var flag = false;
function addData(user){
	var trans = db.transaction(["emp"],"readwrite");
	var objectstore = trans.objectStore("emp");
	flag = false;
	var res = objectstore.add(user);
	res.onerror = function(e){
		alert("添加失败");
	}
	res.onsuccess = function(evt){
		alert("添加成功");
		flag = true;
	}
	setTimeout(function(){
		if(flag){
			showUser(user);
		}
	},500);
}


/**
 * 从indexedDb数据库中读取所有的数据
 */
function readData(){
	var trans = db.transaction(["emp"],"readwrite");//创建事务
	var objectstore = trans.objectStore("emp");//得到对应的objectStore对象
	//这里，因为要读取多条数据，需要使用游标来读取
	objectstore.openCursor().onsuccess = function(evt){
		var cursor = evt.target.result;
		if(cursor){
			var user = cursor.value;
			showUser(user);
			cursor.continue();//如果有下一条数据，就继续读取
		}
	}
}

/**
 * 用来把一个user对象拼接到页面上的table表格内 
 * @param {Object} user
 */
function showUser(user){
	var tr = $("tb").insertRow($("tb").rows.length);
	tr.id = "mytr_"+user.id;
	td0 = tr.insertCell(0);
	td0.innerHTML = user.id;
	tr.insertCell(1).innerHTML = "<a href='javascript:showOne(\""+user.username+"\");'>"+user.username+"</a>";
	tr.insertCell(2).innerHTML = user.pwd;
	tr.insertCell(3).innerHTML = user.age;
	tr.insertCell(4).innerHTML = "<a href='javascript:deleteUser(\""+user.username+"\",\""+user.id+"\");'>删除</a>";
}

function showOne(userid){
	var trans = db.transaction(["emp"],"readwrite");//创建事务
	var objectstore = trans.objectStore("emp");//得到对应的objectStore对象
	var req = objectstore.get(userid);
	console.log(req);
	req.onsuccess = function(evt){
		console.log(evt);
		var user = evt.target.result;
		//console.log(user);
		alert(user.id+"---"+user.username+"----"+user.pwd+"----"+user.age);
	};
}

function deleteUser(username,userid){
	var trans = db.transaction(["emp"],"readwrite");//创建事务
	var objectstore = trans.objectStore("emp");//得到对应的objectStore对象
	var req = objectstore.delete(username);
	req.onsuccess = function(e){
		console.log(e);
		alert('删除成功');
		$("tb").deleteRow($("mytr_"+userid).rowIndex);
	}
}
