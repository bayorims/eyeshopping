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

  now.receiveMessage = function(url) {
    changePicture(9, url);
  }
  
  var button = document.getElementById("button");

  button.onsubmit = function() {
    var text = document.getElementById("text").value;
    now.distributeMessage(text);
  }
  setInterval("changeImage();", 15000);
});

function changePicture(i, url) {
  if (i == 1) {
    var elem = document.getElementById("s1");
    elem.innerHTML = ("<a href='/searchbylink?image_url=" + url + "'><img src=\""+url+"\"/\></\>");
    return;
  }
  var curr = document.getElementById("s" + i);
  var prev = document.getElementById("s" + (i - 1));
  var currImg = curr.getElementsByTagName("img")[0];
  var prevImg = prev.getElementsByTagName("img")[0];
  var currA = curr.getElementsByTagName("a")[0];
  currA.href = '/searchbylink?image_url=' + prevImg.src;
  $(currImg).fadeOut(150, function() {
    $(this).attr('src', prevImg.src).bind('onstatechange load', function() {
      if (this.complete) {
        $(this).fadeIn(150);
        changePicture(i - 1, url);
      }
    });
  });
}