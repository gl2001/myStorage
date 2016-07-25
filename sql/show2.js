onload = function(){
	//createDatabase();
	indexedDB.deleteDatabase("student");
};

var db;
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
function createDatabase(){
	
	var openrequest = indexedDB.open("student");
	openrequest.onerror = function(e){
		alert("error");
		console.log(e.target.errorCode);
	};
	
	openrequest.onsuccess = function(event){
		db = openrequest.result;
		alert("success");
		
	};
	
	openrequest.onupgradeneeded = function(evt){
			//var emp = evt.currentTarget.result.createObjectStore("emp",user);
			
	}
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
