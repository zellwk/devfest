var $ = global.jQuery;

$(document).ready(function() {

  if (location.hash) {
    setTimeout(function() {
      hashChangeScroll();
    }, 800);
  }

  $('.downarr').click(function(event) {
    event.preventDefault();
    replaceHashAndScroll($(this));
  }); 

  $('.c-events-nav').on('click', 'a', function(event) {
    event.preventDefault();
    replaceHashAndScroll($(this));
  });

  $('.c-community__ways').on('click', 'a', function(event) {
    event.preventDefault();
    replaceHashAndScroll($(this));
  });

  function replaceHashAndScroll($this) {
    var hash = $this.attr('href')
    var targetHash = hash.replace('-hash', '');

    if (history.pushState) {
      history.pushState(null, null, targetHash);
    } else {
      location.hash = targetHash;
    }
    hashChangeScroll();
  }

  function hashChangeScroll() {
  var eventsHeaderHeight = $('.c-events-nav').outerHeight();

  // scrolls to hash location 
  var curPos = $(window).scrollTop();
  var currHash = location.hash;
  var targetHash = location.hash + '-hash';
  var $target = $(targetHash);
  var targetTop = parseInt($target.offset().top);

  $('body').animate({
      scrollTop: targetTop - eventsHeaderHeight
    }, 1500);
}

});
