 $(document).ready(function(){
          
      var counter = 0;
     
     
     $("button").click(function(){
            
            message = $('#input').val();
            // emojis:
            message = message.replace(":)", '<img alt="happy face" class="emoji" src="happy_face.png">');
            
            message = message.replace(":(", '<img alt="sad face" class="emoji" src="sad_face.png">');
         
            message = message.replace(":O", '<img alt="shocked face" class="emoji" src="shocked_face.png">');
         
            message = message.replace(":o", '<img alt="shocked face" class="emoji" src="shocked_face.png">');
         
            message = message.replace("O:)", '<img alt="angel face" class="emoji" src="angel_face.png">');
         
            message = message.replace("o:)", '<img alt="angel face" class="emoji" src="angel_face.png">');
         
            message = message.replace(":P", '<img alt="tongue face" class="emoji" src="tongue_face.png">');
         
            message = message.replace(":p)", '<img alt="tongue face" class="emoji" src="tongue_face.png">');
         
         
            var $newMsg = $("<div></div>");
            $newMsg.attr("id", "newMsg" + counter++);
            $newMsg.html(message);
            $(".messagebody").append($newMsg);
            $("#input").val("");
                    });


   var counter2 = 0

   
$(document).keypress(function(e) {
    if(e.which == 13) {
            $("button").click(function();
        /* message = $('#input').val();
            // emojis:
            message = message.replace(":)", '<img alt="happy face" class="emoji" src="happy_face.png">');
            
            message = message.replace(":(", '<img alt="sad face" class="emoji" src="sad_face.png">');
         
            message = message.replace(":O", '<img alt="shocked face" class="emoji" src="shocked_face.png">');
         
            message = message.replace(":o", '<img alt="shocked face" class="emoji" src="shocked_face.png">');
         
            message = message.replace("O:)", '<img alt="angel face" class="emoji" src="angel_face.png">');
         
            message = message.replace("o:)", '<img alt="angel face" class="emoji" src="angel_face.png">');
         
        
        var $newMsg = $("<div></div>");
            $newMsg.attr("id", "newMsg" + counter2++);
            $newMsg.html(message);
            $(".messagebody").append($newMsg);
            $("#input").val("");*/)
    }
});
     
});