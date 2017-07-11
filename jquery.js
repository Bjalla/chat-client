/*global $*/

var activeChat = '';
var messages;
var userName = '';
var activeUser = 0;
var displayname = '';
var password = '';
var colors = ["e1f7d5", "ffbdbd", "c9c9ff", "f1cbff", "ffb3ba", "ffdfba", "ffffba", "baffc9", "bae1ff", "fea3aa", "f8b88b", "faf884", "baed91", "b2cefe", "f2a2e8", "7979ff", "86bcff", "8adcff", "1ffef3", "4bfe78", "f9bb00", "ff800d", "ff9331", "c47557", "c48484"];
var statusCode = '';

var userColors = {};

$(document).ready(function() {
    // console.log('going again...');

  $("#login").hide();

  if (activeUser === 0){
    $("#login").show();
    $( "div:not(.login)").fadeTo( "slow" , 0.5, function() {
        // Animation complete.
    });
    $("#submit").prop("disabled", true)
  }

  $("#login").change(function() {
    checkActiveUser();
  })
  $("#submit").click(function(){
    checkCredentials();
  })
  $('#password').keypress(function(e) {
    if(e.which == 13) {
      checkCredentials();
    }
  });


  function checkActiveUser(){
    var displayname =  $('#displayname').val();
    var userName =  $('#username').val();
    var password =  $('#password').val();
    if (displayname != '' && userName != '' && password != '') {
      $("#submit").prop("disabled", false);
    }
  }


  function checkCredentials(){
    displayname =  $('#displayname').val();
    userName =  $('#username').val();
    password =  $('#password').val();
    getChats();
    getUser();
    if (statusCode === 200) {
      activeUser = displayname;
      $( '#login' ).hide();
      $( "div").css({opacity: 1});
      changeActiveRoom();

    } else {
      alert('Username or password not correct. Please enter the correct credentials.');
    }
  }

  function reload() {
    getNewMessages();
  }

  setInterval(reload, 5000);

  // Anfrage auf url mit type und header(für authorization)
  function getChats() {
    $.ajax(({
      type: "GET",
      url: "http://liebknecht.danielrutz.com:3000/api/chats/",
      statusCode: {
        200: function () {
          statusCode = 200;
        },
        401: function () {
          statusCode = 400;
        },
        403: function () {
          statusCode = 403;
        },
        405: function () {
          statusCode = 405;
        }
      },
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa(userName + ":" + password)
      }

        //verarbeitung der response daten
    })).then(function(data) {   //wird aufgerufen sobald response auf anfrage kommt
      if(data.length > 0) {
        changeActiveRoom(data[0]);
      }
      else {
         // no rooms yet .. maybe show button to create a new one?
      }
      $.each(data, function(i) {
        $('#chats').append($("<li>").append($("<a>").text(data[i]).attr('href','javascript:changeActiveRoom("' + data[i] + '")')));

      });
    });
  }


  function getUser() {
    $.ajax(({
      type: "GET",
      url: "http://liebknecht.danielrutz.com:3000/api/chats/Lobby/users",
      statusCode: {
        200: function () {
          statusCode = 200;
        },
        401: function () {
          statusCode = 400;
        },
        403: function () {
          statusCode = 403;
        },
        405: function () {
          statusCode = 405;
        }
      },
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa(userName + ":" + password)
      }

          //verarbeitung der response daten
    })).then(function(data) {   //wird aufgerufen sobald response auf anfrage kommt
      $.each(data, function(i) {
        $('#userlist').append($("<li>").append($("<a>").text(data[i]).css('color', colorfying(data[i])).attr('href','javascript:changeActiveRoom("' + data[i] + '")')));

            // assign a color to each user
        userColors[data[i].toString()] = colors[i % colors.length];
      });
    });
  }


     // show active chat

  $("#button").click(function(){
    sendMessage();
  });

  $('#chatBar').keypress(function(e) {
    if(e.which == 13) {
      sendMessage();
    }
  });

  $('#searchBar').keypress(function(e) {
    if(e.which == 13) {
      search();
    }
  });

  $('#searchrev').click(function(){
    reversesearch();
  })

  function search(){
    // console.log('going again...');
    var searchval = $('#searchBar').val().toLowerCase();
    $("#messages li").each(function() {
      var s = $(this).text().toLowerCase();
      $(this).closest('#messages li')[ s.indexOf(searchval) !== -1 ? 'show' : 'hide' ]();
    });
  }

  document.getElementById('searchBar').value = '';
});

function reversesearch(){
  $("#messages li").show()

}



function changeActiveRoom(name) {
  activeChat = name;
  $('#chatname').text("Active Chat: " + activeChat)

  $('#messages').empty();

  $.ajax(({
    type: "GET",
    url: "http://liebknecht.danielrutz.com:3000/api/chats/" + name,
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa(userName + ":" + password)
    }

         //verarbeitung der response daten
  })).then(function(data) {   //wird aufgerufen sobald response auf anfrage kommt
    messages = data;
    $.each(data, function(i) {
      // messages[i] = data[i];
      //differenciation between messages from the user and from others (for left and right aligne)
      if(data[i].user == displayname) {
        $('#messages').append(createMessage(data[i].user, data[i].message, data[i].timestamp).addClass("ownMessage"));
      } else {
        $('#messages').append(createMessage(data[i].user, data[i].message, data[i].timestamp));
      }
    });
  });
  $(document).ready(function(){
    $('#messageid').animate({
      scrollTop: $('#messageid').get(0).scrollHeight}, 1);
  });
}

function timing(timestamp){
  var time = new Date(timestamp);
  var date = time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear();
  var hours = (time.getHours() < 10) ? "0" + time.getHours() : time.getHours();
  var minutes = (time.getMinutes() < 10) ? "0" + time.getMinutes() : time.getMinutes();
  time = hours + ":" + minutes;

  timestamp = time + " / " + date;

  return timestamp;
}

function toUnicode(inputString) {
  var theUnicode = '';
  for (var i=0; i < inputString.length; i++) {
    theUnicode = theUnicode + inputString.charCodeAt(i);
    while (theUnicode.length < 6) {
      theUnicode = theUnicode + Math.pow((theUnicode.charCodeAt(i)), 2);
    }
  }
  // console.log(theUnicode);

  return theUnicode;
}

function colorfying(data){
  var userAscii = toUnicode(data);
  if(userAscii.length > 6){
    userAscii = userAscii%999999;
  }
  var usercolor= "#" + userAscii;

  return usercolor;
}

function createMessage(user, text, time) {
  // root list element
  var li = $("<li>")
  var username = $("<p>").html(user + ":");
  if(user != displayname) {
    username.css('color', colorfying(user));
  }

  li.append(username);

  // message text
  li.append($("<p>").html(text));

  // message time
  li.append($("<p>").html(timing(time)).addClass("time"));

  return li;
}


function getNewMessages() {

  $.ajax(({
    type: "GET",
    url: "http://liebknecht.danielrutz.com:3000/api/chats/" + activeChat,
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa(userName + ":" + password)
    }

       //verarbeitung der response daten
  })).then(function(data) {
    if (data.length > messages.length) {
      for (var i = messages.length; i < data.length; i++) {
        messages[i] = data[i];
        if(data[i].user == displayname) {
          $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": <br/>" + data[i].message))).addClass("ownMessage"));
        } else {
          var li = $("<li>").append($("<p>").html(emojifying(data[i].user + "  : <br/> " + data[i].message)));
          li.addClass("ownMessage");
          li.attr('background-color', 'red !important');
          $('#messages').append(li);
        }
      }
    }
  });
  $(document).ready(function(){
    $('#messageid').animate({
      scrollTop: $('#messageid').get(0).scrollHeight}, 1);
  });
}




function sendMessage() {
  var message = $('#chatBar').val();
  $.ajax(({
    type: "POST",
    url: "http://liebknecht.danielrutz.com:3000/api/chats/" + activeChat,
    dataType: 'json',
    headers: {
      "Authorization": "Basic " + btoa(userName + ":" + password)
    },
    contentType: 'application/json',
    data: JSON.stringify({ "roomId": activeChat, 'user': displayname, 'message': message }),
    async: false
  })).then(function() {
    changeActiveRoom(activeChat);
  });
  $(document).ready(function(){
    $('#messageid').animate({
      scrollTop: $('#messageid').get(0).scrollHeight}, 1);
  });
  document.getElementById('chatBar').value = '';
}

function emojifying(message){

  message = message.replace(/\:\(/g, '<img alt="sad face" class="emoji" src="images/sad_face.png">');

  message = message.replace(/:O/g, '<img alt="shocked face" class="emoji" src="images/shocked_face.png">');

  message = message.replace(/:o/g, '<img alt="shocked face" class="emoji" src="images/shocked_face.png">');

  message = message.replace(/O:\)/g, '<img alt="angel face" class="emoji" src="images/angel_face.png">');

  message = message.replace(/o:\)/g, '<img alt="angel face" class="emoji" src="images/angel_face.png">');

  message = message.replace(/:P/g, '<img alt="angel face" class="emoji" src="images/tongue_face.png">');

  message = message.replace(/:party:/g, '<img alt="party emoji" class="emoji" src="images/party_emoji.png">');

  message = message.replace(/:unicorn:/g, '<img alt="unicorn emoji" class="emoji" src="images/unicorn_emoji.png">');

  message = message.replace(/:\:D/g, '<img alt="laughing face" class="emoji" src="images/laughing_face.png">');

  message = message.replace(/:\)/g, '<img alt="happy face" class="emoji" src="images/happy_face.png">');

  message = message.replace(/:love:/g, '<img alt="heart_emoji" class="emoji" src="images/heart_emoji.png">');


  return message;
}
