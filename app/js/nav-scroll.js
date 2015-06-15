var $ = require('jquery');


$(document).ready(function() {
  $('.c-events-nav').on('click','a', function(event) {
    event.preventDefault();
    var curPos = $('.c-canvas__on-canvas').scrollTop();
    var $target = $($(this).attr('href'));
    var targetTop = parseInt($target.offset().top);
    $('.c-canvas__on-canvas').animate({
      scrollTop: curPos + targetTop 
    }, 1500);
  });
});
