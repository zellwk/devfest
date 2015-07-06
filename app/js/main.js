// Initializes scripts
global.jQuery = require('jquery');

var $ = global.jQuery; 

require('./svg');
// require('./smart-head');
require('./zell-scrollspy');
require('./nav-scroll');
require('./canvas');

$(window).load(function() {
  var $el = $('.jsFixedHeader');
  var $clone = $('.jsFixedHeader').clone(true, true).removeClass('jsFixedHeader').addClass('jsFixedHeaderClone');

  var activationPos = $el.position().top;

  $clone.css({
    display: 'none',
    position: 'absolute', 
    top: '0',
    left: '0',
    right: '0',
    zIndex: '9999'
  });

  $el.after($clone);

  function activateFixed() {
    $clone.css({
      'display': 'block',
      'position': 'fixed'
    })
  }

  function deactivateFixed() {
    $clone.css({
      'display': 'none',
      'position': 'absolute',
    })
  }

  $('.c-canvas__on-canvas').scroll(function(event) {
    var $container = $('.c-canvas__on-canvas');
    if ($container.scrollTop() > activationPos) {
      console.log('activated');
      activateFixed();
    } else {
      console.log('deactivated');
      deactivateFixed();
    }
  });
})
