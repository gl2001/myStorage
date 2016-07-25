onload = function(){
	sessionStorage.setItem("familyname","go");
	var obj = {"name":"zhang",age:20};
	sessionStorage.setItem("obj",JSON.stringify(obj));
	console.log(sessionStorage);
	
	var myobj = sessionStorage.getItem("obj");
	var o = JSON.parse(myobj);
	alert(o.age);
	
	
	
	
	
};
