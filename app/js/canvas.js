var jQuery = require('jquery');

jQuery(document).ready(function($) {
  var $container = $('.jsCanvasContainer');
  var $toggle = $('.jsCanvasToggle');

  $toggle.on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    if ($container.hasClass('is-open')) {
      $container.removeClass('is-open');
    } else {
      $container.addClass('is-open');
      $('body').on('click', bodyClickOffCanvas);
    }
  });

  $(window).resize(function(event) {
    var ww = $(window).width();
    if (ww >= 960) {
      resetOffCanvas();
    }
  });

  function hasParentClass(elem, className) {
    return $(elem).closest('.' + className) && $(elem).closest('.' + className).length;
  }

  function resetOffCanvas() {
    $('.jsCanvasContainer').removeClass('is-open');
  }

  function bodyClickOffCanvas(e) {
    if (hasParentClass(e.target, 'is-open') && !hasParentClass(e.target, 'jsOffCanvas')) {
      resetOffCanvas();
      $(this).off('click', bodyClickOffCanvas);
    }
  }
});
