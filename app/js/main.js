// Initializes scripts
global.jQuery = require('jquery');

var $ = global.jQuery; 

require('./svg');
// require('./smart-head');
require('./zell-scrollspy');
require('./nav-scroll');
require('./canvas');
require('./jqueryform');

// Header 
// $(window).load(function() {
//   var $el = $('.jsFixedHeader');
//   var $clone = $('.jsFixedHeader').clone(true, true).removeClass('jsFixedHeader').addClass('jsFixedHeaderClone');

//   var activationPos = $el.position().top;

//   $clone.css({
//     display: 'none',
//     position: 'absolute', 
//     top: '0',
//     left: '0',
//     right: '0',
//     zIndex: '9999'
//   });

//   $el.after($clone);

//   function activateFixed() {
//     $clone.css({
//       'display': 'block',
//       'position': 'fixed'
//     })
//   }

//   function deactivateFixed() {
//     $clone.css({
//       'display': 'none',
//       'position': 'absolute',
//     })
//   }

//   $('.c-canvas__on-canvas').scroll(function(event) {
//     var $container = $('.c-canvas__on-canvas');
//     if ($container.scrollTop() > activationPos) {
//       console.log('activated');
//       activateFixed();
//     } else {
//       console.log('deactivated');
//       deactivateFixed();
//     }
//   });
// })

$(document).ready(function() {
  var $form = $("#subscribeForm");
  var  $text = $('#subscribeForm .msg').find('span');
  var $spinner = $form.find('.spinner');
  var $social = $('.social');

  $("#subscribeForm").ajaxForm({
    url: "http://2014.cssconf.asia/addsubscriber.php",
    dataType: "html",
    beforeSubmit: function() {
      // Resets text before submitting 
      $text.text("");
      // Starts spinner
      $spinner.show().addClass('play');
      $social.hide();
    },
    success: function(r) {
      if (r.substr(0, 6) != "Thanks") {
        console.log("No Thanks");
        $text.text(r.substr(0, r.indexOf('<br/>')));
      } else {
        console.log("Thanks");
        $form.find('input').val('');
        $text.text("Thanks. We'll keep you updated!");

        $form.find('.social-msg').text('You might want to check out our Facebook or Twitter page :)')
        $social.show().addClass('form-show');
      }
    },
    error: function(r, s) {
      // $("#subscribeForm").removeClass("load").addClass("failure");
      $text.text("Something went utterly wrong...");
    },
    complete: function() {
      console.log('complete');
      $spinner.hide().removeClass('play');
      // Stops spinner
    }
  });
});
