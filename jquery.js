/*global $*/

var activeChat = '';
var messages;
var chats;
var user;
var userName = '';
var activeUser = 0;
var displayname = '';
var password = '';
var statusCode = '';
var permission;

$(document).ready(function() {

  function checkCookie() {
    var cUser = getCookie("username");
    if (cUser != "") {
      alert("Welcome back " + cUser);
    } else {
      checkActiveUser();
    }
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }


  checkCookie();
// desktop notifications
  document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted") {
      permission = Notification.requestPermission();
    }
  });


//smileypicker


  $("#smileypicker").on('click', function() {
    var x = document.getElementById("list");
    // console.log(x.style.display);
    if (x.style.display === 'block') {
      x.style.setProperty("display", "none", "important");
    } else {
      x.style.setProperty("display", "block", "important");
    }
  });


  $(function () {
    $('#alien').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :alien: ');
    });
  });

  $(function () {
    $('#unicorn').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :unicorn: ');
    });
  });


  $(function () {
    $('#party').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :party: ');
    });
  });

  $(function () {
    $('#angel_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' O:) ');
    });
  });

  $(function () {
    $('#crying_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + " :'( ");
    });
  });

  $(function () {
    $('#hearteyed_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :hearteyes: ');
    });
  });

  $(function () {
    $('#kissing_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :* ');
    });
  });

  $(function () {
    $('#mouthless_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :mouthless: ');
    });
  });

  $(function () {
    $('#nerd_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :nerd: ');
    });
  });

  $(function () {
    $('#heart').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :love: ');
    });
  });

  $(function () {
    $('#happy_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :) ');
    });
  });

  $(function () {
    $('#smirking_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :smirking: ');
    });
  });

  $(function () {
    $('#sleeping_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :sleeping: ');
    });
  });

  $(function () {
    $('#unamused_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :unamused: ');
    });
  });

  $(function () {
    $('#zippermouthed_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :zippermouth: ');
    });
  });

  $(function () {
    $('#laughing_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :D ');
    });
  });

  $(function () {
    $('#sad_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :( ');
    });
  });

  $(function () {
    $('#shocked_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :O ');
    });
  });

  $(function () {
    $('#tongue_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' :P ');
    });
  });

  $(function () {
    $('#winking_face').on('click', function () {
      var text = $('#chatBar');
      text.val(text.val() + ' ;) ');
    });
  });



  $("#textSizeplus").click(function() {
    var msg = document.getElementById("messages")
    var userl = document.getElementById("chats")

    var sizemsg = window.getComputedStyle(msg, null).getPropertyValue("font-size");
    msg.style.fontSize =(parseFloat(sizemsg.replace(/px/,"")))+5.00+"px";

    var sizeuserl = window.getComputedStyle(userl, null).getPropertyValue("font-size");
    userl.style.fontSize =(parseFloat(sizeuserl.replace(/px/,"")))+5.00+"px";

    // console.log(sizemsg);
    // console.log(sizeuserl);
  });

  $("#textSizeminus").click(function() {
    var msg = document.getElementById("messages")
    var userl = document.getElementById("chats")

    var sizemsg = window.getComputedStyle(msg, null).getPropertyValue("font-size");
    msg.style.fontSize =(parseFloat(sizemsg.replace(/px/,"")))-5.00+"px";

    var sizeuserl = window.getComputedStyle(userl, null).getPropertyValue("font-size");
    userl.style.fontSize =(parseFloat(sizeuserl.replace(/px/,"")))-5.00+"px";
  })


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

  $("button#light").click(function() {
    $("link[rel=stylesheet]").attr({
      href: "light.css"
    });
  });

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

      setCookie("username", displayname, 0.5);
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
      data.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      chats = data;

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


  function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").href=sheet;
  }

  function initate() {
    var style1 = document.getElementById("stylesheetdark");
    var style2 = document.getElementById("stylesheetlight");

    style1.onclick = function () {
      swapStyleSheet("stylesheetdark.css")
    }

    style2.onclick = function () {
      swapStyleSheet("stylesheetlight.css");
    }
  }

  window.onload = initate;

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
      data.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      user = data;
      $.each(data, function(i) {
        $('#userlist').append($("<li>").append($("<a>").text(data[i]).css('color', colorfying(data[i])).attr('href','javascript:changeActiveRoom("' + data[i] + '")')));

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
      //differenciation between messages from the user and from others (for left and right align)
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
  li.append($("<p>").html(emojifying(regexcheck(text))));

  // message time
  li.append($("<p>").html(timing(time)).addClass("time"));

  return li;
}


function notify(user, message) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser.');

    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  } else {
    var notification = new Notification('New Message!', {
      icon: 'notification.png',
      body: '\n' + user + ': ' + message
    });

    notification.onclick = function () {
      window.open("./index.html");
    };
  }
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
        if(data[i].user === displayname) {
          $('#messages').append(createMessage(data[i].user, data[i].message, data[i].timestamp).addClass("ownMessage"));
        } else {
          $('#messages').append(createMessage(data[i].user, data[i].message, data[i].timestamp));
        }
      }

      var notificationUser = data[messages.length - 1].user.toString();
      var notificationMessage = data[messages.length - 1].message.toString();

      // console.log(notification);
      notify(notificationUser, notificationMessage);
    }
  });
  $(document).ready(function(){
    $('#messageid').animate({
      scrollTop: $('#messageid').get(0).scrollHeight}, 1);
  });
}

function getNewRooms() {
  $.ajax(({
    type: "GET",
    url: "http://liebknecht.danielrutz.com:3000/api/chats/",
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa(userName + ":" + password)
    }

       //verarbeitung der response daten
  })).then(function(data) {
    if (data.length > chats.length) {
      for (var i = chats.length; i < data.length; i++) {
        chats[i] = data[i];
      }
      if(data.length > 0) {
        changeActiveRoom(data[0]);
      }
      else {
         // no rooms yet .. maybe show button to create a new one?
      }
      $.each(data, function(i) {
        $('#chats').append($("<li>").append($("<a>").text(data[i]).attr('href','javascript:changeActiveRoom("' + data[i] + '")')));

      });
    }
  });


  $(document).ready(function(){
    $('#messageid').animate({
      scrollTop: $('#messageid').get(0).scrollHeight}, 1);
  });
}


function getNewUsers() {

  $.ajax(({
    type: "GET",
    url: "http://liebknecht.danielrutz.com:3000/api/chats/Lobby/users",
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa(userName + ":" + password)
    }

       //verarbeitung der response daten
  })).then(function(data) {
      // console.log("users reloaded");
    if (data.length > user.length) {
      for (var i = user.length; i < data.length; i++) {
        user[i] = data[i];
      }
      if(data.length > 0) {
        changeActiveRoom(data[0]);
      }
      else {
         // no rooms yet .. maybe show button to create a new one?
      }
      $.each(data, function(i) {
        $('#userlist').append($("<li>").append($("<a>").text(data[i]).css('color', colorfying(data[i])).attr('href','javascript:changeActiveRoom("' + data[i] + '")')));

      });
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
  message = message.replace(/:party:/g, '<img alt="party emoji" class="emoji" src="images/party_emoji.png">');

  message = message.replace(/\:\(/g, '<img alt="sad face" class="emoji" src="images/sad_face.png">');
  message = message.replace(/\:-\(/g, '<img alt="sad face" class="emoji" src="images/sad_face.png">');

  message = message.replace(/:O/g, '<img alt="shocked face" class="emoji" src="images/shocked_face.png">');
  message = message.replace(/:-O/g, '<img alt="shocked face" class="emoji" src="images/shocked_face.png">');
  message = message.replace(/:o/g, '<img alt="shocked face" class="emoji" src="images/shocked_face.png">');
  message = message.replace(/:o/g, '<img alt="shocked face" class="emoji" src="images/shocked_face.png">');

  message = message.replace(/O:\)/g, '<img alt="angel face" class="emoji" src="images/angel_face.png">');
  message = message.replace(/O:-\)/g, '<img alt="angel face" class="emoji" src="images/angel_face.png">');
  message = message.replace(/o:\)/g, '<img alt="angel face" class="emoji" src="images/angel_face.png">');
  message = message.replace(/o:-\)/g, '<img alt="angel face" class="emoji" src="images/angel_face.png">');

  message = message.replace(/:P/g, '<img alt="angel face" class="emoji" src="images/tongue_face.png">');
  message = message.replace(/:-P/g, '<img alt="angel face" class="emoji" src="images/tongue_face.png">');
  message = message.replace(/:p/g, '<img alt="angel face" class="emoji" src="images/tongue_face.png">');
  message = message.replace(/:-p/g, '<img alt="angel face" class="emoji" src="images/tongue_face.png">');

  message = message.replace(/:unicorn:/g, '<img alt="unicorn emoji" class="emoji" src="images/unicorn_emoji.png">');

  message = message.replace(/:-D/g, '<img alt="laughing face" class="emoji" src="images/laughing_face.png">');
  message = message.replace(/:D/g, '<img alt="laughing face" class="emoji" src="images/laughing_face.png">');

  message = message.replace(/:\)/g, '<img alt="happy face" class="emoji" src="images/happy_face.png">');
  message = message.replace(/:-\)/g, '<img alt="happy face" class="emoji" src="images/happy_face.png">');

  message = message.replace(/:love:/g, '<img alt="heart_emoji" class="emoji" src="images/heart_emoji.png">');
  message = message.replace(/\<3/g, '<img alt="sad face" class="emoji" src="images/sad_face.png">');
  message = message.replace(/;\)/g, '<img alt="shocked face" class="emoji" src="images/wink_face.png">');
  message = message.replace(/;-\)/g, '<img alt="shocked face" class="emoji" src="images/wink_face.png">');

  message = message.replace(/:'\(/g, '<img alt="crying face" class="emoji" src="images/crying_face.png">');

  message = message.replace(/:hearteyes:/g, '<img alt="hearteyed face" class="emoji" src="images/hearteyed_face.png">');

  message = message.replace(/:\*/g, '<img alt="kissing face" class="emoji" src="images/kissing_face.png">');

  message = message.replace(/:mouthless:/g, '<img alt="mouthless face" class="emoji" src="images/mouthless_face.png">');

  message = message.replace(/:nerd:/g, '<img alt="nerd face" class="emoji" src="images/nerd_face.png">');

  message = message.replace(/:smirking:/g, '<img alt="smirking face" class="emoji" src="images/smirking_face.png">');

  message = message.replace(/:sleeping:/g, '<img alt="sleeping face" class="emoji" src="images/sleeping_face.png">');

  message = message.replace(/:\//g, '<img alt="unamused face" class="emoji" src="images/unamused_face.png">');

  message = message.replace(/:unamused: /g, '<img alt="unamused face" class="emoji" src="images/unamused_face.png">');

  message = message.replace(/:zippermouth: /g, '<img alt="zippermouthed face" class="emoji" src="images/zippermouthed_face.png">');

  message = message.replace(/:alien: /g, '<img alt="alien emoji" class="emoji" src="images/alien_emoji.png">');

  message = message.replace(/:ghost: /g, '<img alt="ghost emoji" class="emoji" src="images/ghost_emoji.png">');

  return message;
}

function regexcheck(message){

  message = message.replace(/&/g, '&amp;');
  message = message.replace(/</g, '&lt;');
  message = message.replace(/>/g, '&gt;');
  message = message.replace(/"/g, '&quot;');

  return message;
}
