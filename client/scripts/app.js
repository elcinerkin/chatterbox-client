// YOUR CODE HERE:
$(document).ready(function(){
  //setInterval(function(){fetcher(displayer);},3000);
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
	    console.log('chatterbox: Message received'+ data);
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to get message');
	  }
	}).done(function(data) {
		display(data);
	});
  },

  display:function(data){
	for(var key in data) {
      for(var i=0; i< data[key].length; i++) {
		var obj = data[key];
		for(var j=0; j<obj.length; j++) {
	      for(var k in obj[j]) {
			$(".messages").append("<li>" + obj[j]['username'] + " : " + obj[j]['text'] + " Created At: " + obj[j]['createdAt'] + "</li>");
		  }
		}
	  }
	}
  }
};
app.fetch();

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
