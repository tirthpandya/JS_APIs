
/*function List(){
	List.makeNode=function(){ 
		return {data:null,next:null};
	};

	this.add=function (data){
		if(this.start===null){ 
			this.start=List.makeNode(); 
			this.end=this.start;
		}else{ 
			this.end.next=List.makeNode(); 
			this.end=this.end.next; 
		};
		this.end.data=data; 
	};

	this.remove = function(data) { 
		  var current = this.start; 
		  var previous = this.start; 
		  while (current !== null) { 
		   if (data === current.data) { 
		    if (current === this.start) { 
		     this.start = current.next; 
		     return; 
		    } 
		    if (current === this.end) 
		                      this.end = previous;
		    previous.next = current.next; return; 
		    }
		    previous = current; 
		    current = current.next; 
		   }
		 }; 

		 this.insertAsFirst = function(d) { 
		  var temp = List.makeNode(); 
		  temp.next = this.start; 
		  this.start = temp; 
		  temp.data = d; 	
		 };

		 this.insertAfter = function(t, d) { 
		  var current = this.start; 
		  while (current !== null) { 
		   if (current.data === t) { 
		    var temp = List.makeNode();
		    temp.data = d; 
		    temp.next = current.next; 
		    if (current === this.end) this.end = temp;
		    current.next = temp; 
		    return; 
		   } 
		   current = current.next; 
		   }
		  };

		  this.item = function(i) { 
		   var current = this.start; 
		   while (current !== null) { 
		    i--; 
		    if (i === 0) return current; 
		    current = current.next; 
		   } 
		   return null; 
		  }; 


}

var list=new List(); 
for(var i=1;i<=10;i++){ 
 list.add(i);
}; */

//function Friend(){var username;var password; function getusername(){alert('asdf');}}

/*
 * Session management Code. Session class. Singleton.
 */
var Session = (function(){

	function Session(){
		//god knows what goes here
		alert("ghost code");
		var sessionTimeout = 1200000; //default timeout = 20 mins
		var timeoutRedirectPage = './index.html'; //default redirect page. can be rewritten by the setter
		this.setSessionTimeout=function(timeout){
			alert("in setSessionTimeout method");
			this.sessionTimeout = timeout;
		};
		this.setTimeoutRedirectPage=function(redirectPage){
			this.timeoutRedirectPage = redirectPage;
		};
		this.trackUserActivity = function(){
			var timer;
			window.onload = resetTimer;
		    window.onmousemove = resetTimer;
		    window.onmousedown = resetTimer; 
		    window.onclick = resetTimer;     
		    window.onscroll = resetTimer;    
		    window.onkeypress = resetTimer;
		    function logout() {
		    	//alert("timeout caused");
		        window.location.href = this.timeoutRedirectPage;
		    };

		    function resetTimer() {
		        clearTimeout(timer);
		        timer = setTimeout(logout, sessionTimeout);  // time is in milliseconds
		    };
		};
	}
	var instance;
	return {
		createSession : function(){
			if(instance == null){
				alert("creating new session instance");
								
				instance = new Session();
				instance.trackUserActivity();
				instance.constructor = null;
			}
			alert("returning session instance");

			return instance;
		} 
	};

})();


function createType() {
	"use strict";
	//evt.preventDefault();
	alert("inside fun");
	var jsonString = document.getElementById("json").value;
	var primaryKeyName = "";
	//alert(jsonString);
	if(jsonString != "")
	{
		var obj = JSON.parse(jsonString);

		// var head = document.getElementsByTagName('head')[0]
		var script = document.createElement("script");
		var typeName = document.getElementById('typename');
		// Begin of main persistent data type creation
		script.innerHTML = "function "+typename.value+"(){ " ;

		for(var i=0;i<obj.fields.length;i++)
		{

			if(obj.fields[i].name != "")
			{
				alert(obj.fields[i].name);
				if(obj.fields[i].primary == true)
				{
					primaryKeyName = obj.fields[i].name ;
				}
				script.innerHTML += "var "+ obj.fields[i].name +";"+
				"this.set"+obj.fields[i].name+"=function(paramValue){" +
				" this."+obj.fields[i].name+"= paramValue;" +
				" alert(this."+obj.fields[i].name+");}; \n" +

				"this.get"+obj.fields[i].name +"=function(){" +
				"return this."+obj.fields[i].name+"};" ;

			}	
		};
		script.innerHTML += "}" ; //End of the main persistent data type creation
		//Begin of QueryClass for the persistent data type
		script.innerHTML += "\nfunction "+typename.value+"Query(){"
		script.innerHTML += "this.get"+typename.value+"By"+primaryKeyName+" =  function(value){";
		script.innerHTML += "\n //implement code to  talk to Django here \n";
		script.innerHTML += "alert('query function called');}"
		script.innerHTML += "}" ; 
		//End of QueryClass for the persistent data type
		alert(script.innerHTML)
		document.head.appendChild(script);
	}
}

function testScript(){
	alert('in test script');
	var firstFriend = new Friend();

	firstFriend.setusername('Pappa');
	alert(firstFriend.getusername())	;
	var mySession = Session.createSession();
//	alert(mySession.sessionTimeout)
	mySession.setSessionTimeout(60000);
	var fq = new FriendQuery();
	fq.getFriendByusername("test");
}





