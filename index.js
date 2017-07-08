document.getElementById("input").addEventListener("keydown", function(e) {
  console.log("test1");
  if (!e) { var e = window.event; }
    console.log("test2");
    e.preventDefault(); // sometimes useful
    // Enter is pressed
    console.log("test3");
    if (e.keyCode == 13) {
      console.log("test3");
      submitFunction();
    }
}, false);

submitFunction() {
  console.log("test3");
  alert("this worked!");
  console.log(getElementById("input").value);
}
