// YOUR CODE HERE:
var isRoomSelected = false;
var room;
var friends = [];

$(document).ready(function(){
  setInterval(function(){
  	app.init(isRoomSelected);
  },3000);

  $("#sendMessage").on("click", function(){
  	app.send();
  	$(".input").val("");
  });

  $("#addRoom").on("click", function(){
  	app.send();
  	$(".room").val(""); 
  });

  $(document).on("click", "a", function(e){  
  	room = $(this).text().slice(0,-2);
  	isRoomSelected = true;
  	app.fetch(room);
  });

});

var app = {

  init:function(){
 	console.log("Initialize");
 	if(!isRoomSelected)
	  this.fetch();
	else
	  this.fetch(room);
  },

  send:function(){
	var location = window.location.href;
	var username = location.slice(location.indexOf("name=")+5);
	var text = $(".input").val();
	var roomname;
	if(isRoomSelected)
	  roomname = $(".room").val();
	else
	  roomname= '';
	var message = {
		'username': username,
		'text': text,
		'roomname': roomname
	};

	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to send message');
	  }
	});
  },

  fetch:function(room){
	var display = this.display;
	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  data: {order:"-createdAt"},
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message received');
		display(data, room);
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to get message');
	  }
	});
  },

  display:function(data, room, friends){
	for(var i = 0; i < 100; i++) {
	  $('#spanU' + i).remove();
	  $('#spanT' + i).remove();
	  $('#li' + i).remove();
	  $("a").remove();
	}

	var obj = data['results'];
	var rooms = {};

	if(!room) {  	
		for(var j = 0; j < obj.length; j++) {
		  if(obj[j]['username'] && obj[j]['text']) {
		  	$('#chats').append('<li id=li'+j+'>'+'<span id=spanU' + j +'>' +'</span>'+ " : " +'<span id=spanT' + j +'>'+ '</span></li>');
		  	$('#spanU' + j).text(obj[j]['username']);
		  	$('#spanT' + j).text(obj[j]['text']);
		  }
		  if(obj[j]['roomname']) {
		  	rooms[obj[j]['roomname']] = true;
		  }
	    }
	}
	else {
		for(var j = 0; j < obj.length; j++) {
		  if(obj[j]['username'] && obj[j]['text'] && obj[j]['roomname'] === room) {
		  	$('#chats').append('<li id=li' + j +'>'+'</li>');
		  	$('#li' + j).text(obj[j]['username'] + ' : ' + obj[j]['text']);
		  }
		  if(obj[j]['roomname']) {
		  	rooms[obj[j]['roomname']] = true;
		  }
	    }
	}

	for(var k in rooms)
	  $(".chatRooms").append("<a href='javascript:void(0)' class='roomlist'>"+k+ "/" + " </a>");
  }

};

//app.init();

//var orig = $('#chats').html('<blink>OMG IT\'s 1998!</blink>');
//app.clearMessages();
//expect($('#chats').children().length).to.equal(0);

// to go from an object to html we render it to a string
// generate html string from the object
// iterate through each of the keys and append to the html message

// model data ->
// message ={
	//author:'alice',
	//text:'Hi all!'
// };

//view code output -> 
// messageDOM = makeNode("<div class='message'></div>")

//addNodeToPage(".message" DOM Node)
// classes[.message, .bright]
// children[".from", "sent", "text"]

//browser renders to the screen
