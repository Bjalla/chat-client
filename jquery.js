$(document).ready(function(){

     var counter = 0;

    $("button").click(function(){
             /*var $box = $("div>", {id: "box", "class": "box"});
             $(".box").html("test")
             $(".messagebody").append("test");
             $(".sender").html("test");*/

           //var $message = document.getElementById("input").value;
           var bla = $('#input').val();
           var $newMsg = $("<div></div>");
           $newMsg.attr("id", "newMsg" + counter++);
           $newMsg.html(bla);
           $(".messagebody").append($newMsg);

                   });
             });

  var counter2 = 0

$(document).keypress(function(e) {
   if(e.which == 13) {
       var bla = $('#input').val();
       var $newMsg = $("<div></div>");
           $newMsg.attr("id", "newMsg" + counter2++);
           $newMsg.html(bla);
           $(".messagebody").append($newMsg);
           $("#input").val("");
   }
});
