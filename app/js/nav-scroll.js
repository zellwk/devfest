var $ = require('jquery');


$(document).ready(function() {
  var eventsHeaderHeight = $('.c-events-nav').outerHeight();

  $('.c-events-nav').on('click','a', function(event) {
    event.preventDefault();
    var curPos = $(window).scrollTop();
    var $target = $($(this).attr('href'));
    var targetTop = parseInt($target.offset().top);

    $('body').animate({
      scrollTop: targetTop - eventsHeaderHeight
    }, 1500);
  });
});
