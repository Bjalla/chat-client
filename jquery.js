var activeChat = '';
var userName = '';
var activeUser = 0;
var displayname = '';
var userName = '';
var password = '';
var statusCode = '';

$(document).ready(function() {
    console.log('going again...');

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
        checkCredentials()
    })

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

        if (statusCode === 200) {
          activeUser = displayname;
          $( '#login' ).hide();
          } else {
            alert('Username or password not correct. Please enter the correct credentials.');
        }
      }


    // Anfrage auf url mit type und header(für authorization)
    function getChats() {
      $.ajax(({
          type: "GET",
          url: "http://liebknecht.danielrutz.com:3000/api/chats/",
          statusCode: {
            200: function (response) {
              statusCode = 200;
            },
            401: function (response) {
              statusCode = 400;
            },
            403: function (response) {
              statusCode = 403;
            },
            405: function (response) {
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

     // show active chat

    $("#button").click(function(){
        sendMessage();
    });

   var counter2 = 0


  $('#chatBar').keypress(function(e) {
      if(e.which == 13) {
         sendMessage();
      }
  });

});

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
            "Authorization": "Basic " + btoa("dhbw" + ":" + 'dhbw-pw')
          }

         //verarbeitung der response daten
    })).then(function(data) {   //wird aufgerufen sobald response auf anfrage kommt
         $.each(data, function(i) {
             //differenciation between messages from the user and from others (for left and right aligne)
             if(data[i].user == displayname) {


                $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": " + data[i].message))).addClass("ownMessage"));
             } else {
                $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": " + data[i].message))));
             }
         });
    });

}

function sendMessage() {
     message = $('#chatBar').val();
     $.ajax(({
          type: "POST",
          url: "http://liebknecht.danielrutz.com:3000/api/chats/" + activeChat,
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + btoa("dhbw" + ":" + 'dhbw-pw')
          },
         contentType: 'application/json',
         data: JSON.stringify({ "roomId": activeChat, 'user': displayname, 'message': message }),
         async: false
    })).then(function(data) {
            changeActiveRoom(activeChat);
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

    message = message.replace(/:\'D/g, '<img alt="laughing face" class="emoji" src="images/laughing_face.png">');

    message = message.replace(/:\)/g, '<img alt="happy face" class="emoji" src="images/happy_face.png">');

    message = message.replace(/:love:/g, '<img alt="heart_emoji" class="emoji" src="images/heart_emoji.png">');


 return message;
}
