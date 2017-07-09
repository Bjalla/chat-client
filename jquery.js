var activeChat = ''; 
var userName = 'amilabell3'; 

$(document).ready(function() {
     
     
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
            // emojis:
            //var message = emojifying(message);
         
            /*$newMsg.attr("id", "newMsg" + counter++);
            $newMsg.html(message);
            $(".messagebody").append($newMsg);
            $("#input").val("");
                    });
            */
    
          
      /*var counter = 0;
      
     
     $("#button").click(function(){
            
            message = $('#input').val();
            // emojis:
            var message = emojifying(message);
         
         
            var $newMsg = $("<div></div>");
            $newMsg.attr("id", "newMsg" + counter++);
            $newMsg.html(message);
            $(".messagebody").append($newMsg);
            $("#input").val("");
                    });


   var counter2 = 0
*/
   
$('#chatBar').keypress(function(e) {
    if(e.which == 13) {
       sendMessage();
    }
});
     
});

//used to change and reload the chat
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
             //differenciation between messages from the user and from others (for left and right aligned messages)
             if(data[i].user == userName) {
                $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": " + data[i].message))).addClass("ownMessage
                                                                                                                                         
             } else {
                $('#messages').append($("<li>").append($("<p>").html(emojifying(data[i].user + ": " + data[i].message))));         
             }
         });
    });
    
}

//Snding message                
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
         data: JSON.stringify({  "roomId": activeChat, 'user': userName, 'message': message}),
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