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

$(document).ready(function() {
  
  $("#subscribeForm").ajaxForm({
    url: "http://2014.cssconf.asia/addsubscriber.php",
    dataType: "html",
    beforeSubmit: function() {
      $("#subscribeForm").removeClass("failure success").addClass("load");
      $("#subscribeForm .msg").removeClass("play");
    },
    success: function(r) {
      console.log(r);
      if (r.substr(0, 6) != "Thanks") {
        $("#subscribeForm").removeClass("load").addClass("failure");
        $("#subscribeForm .msg span").text(r.substr(0, r.indexOf('<br/>')));
        $("#subscribeForm .msg").addClass("play");
        setTimeout(function() {
          $("#subscribeForm").removeClass("failure");
          $("#subscribeForm input[name='email']").focus();
        }, 5000);
      } else {
        $("#subscribeForm").removeClass("load").addClass("success");
        $("#subscribeForm .msg span").text("Thanks. We'll keep you updated!");
        $("#subscribeForm .msg").addClass("play");
        setTimeout(function() {
          $("#subscribeForm input[name='email']").val("");
          $("#subscribeForm").removeClass("success active");
          $("#subscribeForm .msg").removeClass("play");
        }, 3000);
        setTimeout(function() {
          window.location = "http://facebook.com/cssconfasia";
        }, 3200);
      }
    },
    error: function(r, s) {
      console.log(r);
      $("#subscribeForm").removeClass("load").addClass("failure");
      $("#subscribeForm .msg span").text("Something went utterly wrong...");
      setTimeout(function() {
        $("#subscribeForm").removeClass("failure");
      }, 4000);
    }
  });

});
