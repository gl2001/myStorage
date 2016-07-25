onload = function(){
	init();
	$("btn").onclick = function(){
		var user = readContent();
		var db = createDataBase();
		db.transaction(function(trans){
			
			trans.executeSql("insert into student(username,pwd,age) values(?,?,?)",[user.username,user.pwd,user.age],function(trans,result){
				alert(result);
			},function(trans,result){
				alert(result);
			});
		});
	};
	
	
}

function init(){
	var db = createDataBase();
	if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
	db.transaction(function(trans){
		trans.executeSql("create table if not exists student(username text null,pwd text null,age text null)",[],function(trans,result){
			alert("1111");
			console.log(trans);
			console.log(result);
		},function(trans,message){
			alert("2222");
			console.log(trans);
			console.log(message);
		});
	});
}

function createDataBase(){
	var db = openDatabase("student","1.0","学生表",1024*1024,function(){});
	return db;
}

function $(id){
	return document.getElementById(id);
}

function readContent(){
	var user = {};
	user.username = $("username").value;
	user.pwd = $("pwd").value;
	user.age = $("age").value;
	return user;
}


function showContent(){
	
}
