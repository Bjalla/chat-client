window.onload = enter;

function enter(e) {
  document.getElementById("input").addEventListener("keydown", function(e) {
      // submit message on enter
      if (e.keyCode === 13) {
        alert("This worked!");
      }
    }, false);
}
