$(document).ready(function() {
  "use strict";
  // Scroll to top
  $("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Smooth scroll
  $('a.scroll-to').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 700);
    event.preventDefault();
  });

  $('.site-testimonial-item').on('mouseenter', function(){
    $('.site-testimonial-item').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
  });
  $('.site-testimonial-item').on('mouseleave', function(){
    $('.site-testimonial-item').removeClass('inactive');
    $('.site-testimonial-item').removeClass('active');
  });
});

$(window).on('scroll', function () {
  var windscroll = $(window).scrollTop();
  if (windscroll >= 100) {
    $('.site-navigation').addClass('nav-bg');
  } else {
    $('.site-navigation').removeClass('nav-bg');
  }
});

var canvas = $("<div id='canvas' style='z-index: -1; position: fixed; top: 0'></div>");
$("body").append(canvas);

var width = window.innerWidth;
var height = window.innerHeight;
canvas.css("width", width);
canvas.css("height", height);

var elements = new Array(5);
var pictures = new Array(35);
var directionX = new Array(35);
var directionY = new Array(35);
var dx = new Array(35);
var dy = new Array(35);

for(var i = 1; i <= 3; i++) {
  var url = "../images/backgrounds/" + i + ".png";
  var element = "<img src=\"" + url + "\" style='position: absolute' height='30px' z-index='0'" + "/>";
  elements[i - 1] = element;
}

for(var i = 1; i <= 30; i++){
  var dirX = Math.random();
  var dirY = Math.random();

  if(dirX >= 0.5)
    directionX[i] = 1;
  else directionX[i] = -1;

  if(dirY >= 0.5)
    directionY[i] = 1;
  else directionY[i] = -1;

}

var move = function () {
  for(var i = 1; i <= 30; i++){
    var picture = pictures[i];
    var ex = parseInt(picture.css("top")) + directionX[i];
    var ey = parseInt(picture.css("left")) + directionY[i];
    if(ex < 0 || ex > height){
      directionX[i] = - directionX[i];
      var ex = parseInt(picture.css("top")) + 2*directionX[i];
    }
    if(ey < 0 || ey > width){
      directionY[i] = - directionY[i];
      var ey = parseInt(picture.css("left")) + 2*directionY[i];
    }
    picture.css("top", ex);
    picture.css("left", ey);
  }
}

var draw = function () {
  for (var i = 1; i <= 30; i++) {
    var chosen = Math.floor(Math.random() * 3);
    var object = $(elements[chosen]);
    var x = Math.floor(Math.random() * height);
    var y = Math.floor(Math.random() * width);
    object.css("top", x);
    object.css("left", y);
    canvas.append(object);
    pictures[i] = object;
  }
}

draw();

setInterval(move, 6);