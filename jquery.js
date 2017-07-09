var activeChat = '';
var userName = '';
var activeUser = 0;
var displayname = '';
var userName = '';
var password = '';
$(document).ready(function() {

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
        if (userName == 'dhbw' && password == 'dhbw-pw') {
            $( '#login' ).hide();
            alert('Log-in successful. Your display name is: ' + displayname);
          
          } else {
            alert('Username or password not correct. Please enter the correct credentials.');
        }
    }
    
    
    function assignColor(user){
        
    }


    // Anfrage auf url mit type und header(für authorization)
     $.ajax(({
          type: "GET",
          url: "http://liebknecht.danielrutz.com:3000/api/chats/",
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa("dhbw" + ":" + 'dhbw-pw')
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
             if(data[i].user == userName) {

        
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
         data: JSON.stringify({ "roomId": activeChat, 'user': userName, 'message': message }),
         async: false
    })).then(function(data) {
            changeActiveRoom(activeChat);
    });
}

function emojifying(message){

    message = message.replace(/\:\(/g, '<img alt="sad face" class="emoji" src="sad_face.png">');

    message = message.replace(/:O/g, '<img alt="shocked face" class="emoji" src="shocked_face.png">');

    message = message.replace(/:o/g, '<img alt="shocked face" class="emoji" src="shocked_face.png">');

    message = message.replace(/O:\)/g, '<img alt="angel face" class="emoji" src="angel_face.png">');

    message = message.replace(/o:\)/g, '<img alt="angel face" class="emoji" src="angel_face.png">');

    message = message.replace(/:P/g, '<img alt="angel face" class="emoji" src="tongue_face.png">');

    message = message.replace(/:party:/g, '<img alt="party emoji" class="emoji" src="party_emoji.png">');

    message = message.replace(/:unicorn:/g, '<img alt="unicorn emoji" class="emoji" src="unicorn_emoji.png">');

    message = message.replace(/:\'D/g, '<img alt="laughing face" class="emoji" src="laughing_face.png">');

    message = message.replace(/:\)/g, '<img alt="happy face" class="emoji" src="happy_face.png">');


 return message;
}
