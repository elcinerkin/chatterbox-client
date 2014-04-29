// YOUR CODE HERE:
$(document).ready(function(){
  // setInterval(function(){
  // 	//app.wipe();
  // 	app.fetch();
  // },3000);
  $(".button").on("click", function(){
  	app.send();
  });
});

var app = {

  init:function(){
 	console.log("Initialize");
  },

  send:function(){
	var location = window.location.href;
	var username = location.slice(location.indexOf("name=")+5);
	var text = $(".input").val();
	var message = {
		'username': username,
		'text': text,
		'roomname': '4chan'
	};
	// either show and send at the same time
	// or call fetch after send
	//console.log(message);
	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message');
	  }
	});
  },

  fetch:function(){
	var display = this.display;
	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  data: {},
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message received', data);
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
	//wipe
	//create a span and put the username there, hence check for xss attacks
	//
	var obj = data['results'];
	for(var j=0; j<obj.length; j++) {
		$("#chats").append("<li>" + obj[j]['username'] + " : " + obj[j]['text'] + " Created At: " + obj[j]['createdAt'] + "</li>");
    }
  }
};
app.fetch();

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
