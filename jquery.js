var activeChat = '';
var messages;
var user = 0;
var activeUser = 0;
var displayname = '';
var userName = '';
var password = '';
var searchval = 0;
var colors = ["#e1f7d5", "#ffbdbd", "#c9c9ff", "#f1cbff", "#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff", "#fea3aa", "#f8b88b", "#faf884", "#baed91", "#b2cefe", "#f2a2e8", "#7979ff", "#86bcff", "#8adcff", "#1ffef3", "#4bfe78", "#f9bb00", "#ff800d", "#ff9331", "#c47557", "#c48484"];
var statusCode = '';

$(document).ready(function() {
    console.log('going again...');

    $("#login").hide();

    if (activeUser === 0){
        $("#login").show();
        $( "div:not(.login)").fadeTo( "slow" , 0.5, function() {
        });
        $("#submit").prop("disabled", true)
    }

    $("#login").change(function() {
        checkActiveUser();
    })
    $("#submit").click(function(){
        checkCredentials()
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
        $( "div").css({opacity: 1});
        getChats();
        getUser();
        if (statusCode === 200) {
          activeUser = displayname;
          $( '#login' ).hide();
          changeActiveRoom();

          } else {
            alert('Username or password not correct. Please enter the correct credentials.');
        }
    }

    userc =$.ajax(({
        type: "GET",
        url: "http://liebknecht.danielrutz.com:3000/api/chats/Lobby/users/",
        dataType: 'json',
        async: false,
        headers: {
            "Authorization": "Basic " + btoa("dhbw" + ":" + 'dhbw-pw')
          }
    }))

    function reload() {
      getNewMessages();
    }

    setInterval(reload, 5000);
    
   function unicoder(data){
       for (var i = 0; i < data.length; i++) {
       var unistring = data.charCodeAt(i);
}
   }
    
    function toUnicode(inputString) {
            var outputString = '';
            var theUnicode = ''
            for (var i=0; i < inputString.length; i++) {
            var theUnicode = theUnicode + inputString.charCodeAt(i);
                while (theUnicode.length < 6) {
                    theUnicode = theUnicode + theUnicode.charCodeAt(i);
                }
            outputString += theUnicode;
            }
        return theUnicode
        }     

    function colorfying(data){
            var userAscii = toUnicode(data)
            
            /*if(userAscii.length < 6){
                while(userAscii.length < 6){
                    userAscii = userAscii + userAscii;
                }*/
            
            if(userAscii.length > 6){
                userAscii = userAscii.substring(0, 6)
            }  
            var usercolor= "#" + userAscii
        return usercolor;
        
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

    
    
    function getUser() {
      $.ajax(({
          type: "GET",
          url: "http://liebknecht.danielrutz.com:3000/api/chats/Lobby/users",
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
         $.each(data, function(i) {
             var uc = colors;
            $('#userlist').append($("<li>").append($("<a>").text(data[i]).attr('href','javascript:changeActiveRoom("' + data[i] + '")').css('color', colorfying(data[i]))));
             console.log(toUnicode(data[i]));
             console.log(colorfying(data[i]));

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

    $('#searchBar').keypress(function(e) {
      if(e.which == 13) {
         search();
      }
  });

    $('#searchrev').click(function(e){
        reversesearch();
    })

function search(){

    console.log('going again...');
            var searchval = $('#searchBar').val().toLowerCase();
            $("#messages li").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('#messages li')[ s.indexOf(searchval) !== -1 ? 'show' : 'hide' ]();
            });
                };

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

                 
                $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": <br/>" + data[i].message))).addClass("ownMessage").css('background-color', 'red'));
             } else {
                $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + "  : <br/> " + data[i].message))));
             }
         });
    });
    $(document).ready(function(){
      $('#messageid').animate({
      scrollTop: $('#messageid').get(0).scrollHeight}, 1);
    });
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
          var prevLength = messages.length;
          if (data.length > messages.length) {
            for (var i = messages.length; i < data.length; i++) {
              messages[i] = data[i];
              if(data[i].user == displayname) {
        
                  $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": <br/>" + data[i].message))).addClass("ownMessage"));
              } else {  
                  $.each(data, function(i){
                      var uc= colors
                  })
                                        $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + "  : <br/> " + data[i].message).attr('color', 'red'))));
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
     message = $('#chatBar').val();
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
    })).then(function(data) {
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

    message = message.replace(/:\'D/g, '<img alt="laughing face" class="emoji" src="images/laughing_face.png">');

    message = message.replace(/:\)/g, '<img alt="happy face" class="emoji" src="images/happy_face.png">');

    message = message.replace(/:love:/g, '<img alt="heart_emoji" class="emoji" src="images/heart_emoji.png">');


 return message;
}
