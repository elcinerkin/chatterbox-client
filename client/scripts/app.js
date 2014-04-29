// YOUR CODE HERE:
$(document).ready(function(){
  setInterval(function(){
  	app.init();
  },3000);

  $("#sendMessage").on("click", function(){
  	app.send();
  	$(".input").val("");
  });

  $("#addRoom").on("click", function(){
  	app.send();
  	$(".room").val(""); 
  });

});

var app = {

  init:function(){
 	console.log("Initialize");
 	this.fetch();
  },

  send:function(){
	var location = window.location.href;
	var username = location.slice(location.indexOf("name=")+5);
	var text = $(".input").val();
	var roomname = $(".room").val();
	var message = {
		'username': username,
		'text': text,
		'roomname': roomname
	};
	// either show and send at the same time or call fetch after send
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

  fetch:function(){
	var display = this.display;
	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  data: {order:"-createdAt"},
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message received');
	    console.dir(data);
		display(data);
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to get message');
	  }
	});
  },

  //create a list of current messages with a unique identifier
  // when a new msg arrives append that to the old ones
  display:function(data){
	for(var i = 0; i < 100; i++) {
	  $('#li' + i).remove();
	  $("a").remove();
	}  	
	var obj = data['results'];
	var rooms = {};
	for(var j = 0; j < obj.length; j++) {
	  if(obj[j]['username'] && obj[j]['text']) {
	  	$('#chats').append('<li id=li' + j +'>'+'</li>');
	  	$('#li' + j).text(obj[j]['username'] + ' : ' + obj[j]['text']);
	  	if(obj[j]['roomname']) {
		  	rooms[obj[j]['roomname']] = true;
		}
	  }
    }
	for(var k in rooms)
	  $(".chatRooms").append("<a href='#'>"+k+ "/" + " </a>");

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
