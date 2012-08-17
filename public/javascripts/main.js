function changeImage() {
  var elem = document.getElementById("search-area");
  
  var curIndex = elem.style.backgroundImage;
  var nextIndex = elem.style.backgroundImage;
  while(curIndex == nextIndex) {
    var randomnumber = Math.floor(Math.random()*3) + 1;
    nextIndex = "url(http://localhost:3004/images/back" + randomnumber + ".jpg)";
  }
  elem.style.backgroundImage = nextIndex;
}
$(document).ready(function() {
  
  console.log("loaded");

  now.receiveMessage = function(url) {
    for(var i = 9; i > 1; i--) {
      var curr = document.getElementById("s" + i);
      var prev = document.getElementById("s" + (i - 1));
      curr.innerHTML = prev.innerHTML;
    }
    var elem = document.getElementById("s1");
    elem.innerHTML = ("<a href='/searchbylink?image_url=" + url + "'><img src=\""+url+"\"/\></\>");
    console.log(elem.innerHTML);
  }
  
  var button = document.getElementById("button");

  console.log(button);

  button.onsubmit = function() {
    console.log("submitted");
    var text = document.getElementById("text").value;
    console.log("***************" + text);
    now.distributeMessage(text);
  }
  setInterval("changeImage();", 30000);
});

var $container = $('#container');

$container.imagesLoaded( function(){
  $container.masonry({
    itemSelector : '.cell'
  });
});