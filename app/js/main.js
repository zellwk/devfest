// Initializes scripts

// Resets Hash location Immediately

var $ = global.jQuery;

// require('./smart-head');
require('./simple-header');
require('./zell-scrollspy');
require('./jqueryform');
require('./canvas');
require('./svg');

require('./hash-scroll');

// $(document).ready(function() {
//   var $form = $("#subscribeForm");
//   var  $text = $('#subscribeForm .msg').find('span');
//   var $spinner = $form.find('.spinner');
//   var $social = $('.social');

//   $("#subscribeForm").ajaxForm({
//     url: "http://2014.cssconf.asia/addsubscriber.php",
//     dataType: "html",
//     beforeSubmit: function() {
//       // Resets text before submitting 
//       $text.text("");
//       // Starts spinner
//       $spinner.show().addClass('play');
//       $social.hide();
//     },
//     success: function(r) {
//       if (r.substr(0, 6) != "Thanks") {
//         console.log("No Thanks");
//         $text.text(r.substr(0, r.indexOf('<br/>')));
//       } else {
//         console.log("Thanks");
//         $form.find('input').val('');
//         $text.text("Thanks. We'll keep you updated!");

//         $form.find('.social-msg').text('Check out our facebook page now! :)')
//         // $social.show().addClass('form-show');
//
//         setTimeout(function() {
//           window.location.href = 'http://facebook.com/devfestasia'
//         }, 2000);

//       }
//     },
//     error: function(r, s) {
//       // $("#subscribeForm").removeClass("load").addClass("failure");
//       $text.text("Something went utterly wrong...");
//     },
//     complete: function() {
//       console.log('complete');
//       $spinner.hide().removeClass('play');
//       // Stops spinner
//     }
//   });
// });
