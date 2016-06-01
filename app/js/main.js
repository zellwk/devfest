// Initializes scripts

// Resets Hash location Immediately

var $ = global.jQuery;

// require('./smart-head');
require('./simple-header');
require('./zell-scrollspy');
require('./canvas');
require('./svg');
require('./hash-scroll');
require('./jqueryform');

$(document).ready(function() {
  var $form = $("#subscribeForm");
  var  $text = $('#subscribeForm .msg').find('span');
  var $spinner = $form.find('.spinner');
  var $social = $('.social');

  $("#subscribeForm").ajaxForm({
    url: "https://2014.cssconf.asia/addsubscriber.php",
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

        $form.find('.social-msg').text('Check out our facebook page now! :)')
        // $social.show().addClass('form-show');

        setTimeout(function() {
          window.location.href = 'https://facebook.com/devfestasia'
        }, 2000);

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

require('./jobs');

$(document).ready(function() {
  let $tels = $('.jsTel'); 

  $tels.each(function(index, el) {
    let $el = $(el);
    let tel = $el.attr('data-tel');
    let link = $el.attr('data-link');
    let ww = $(window).width();

    checkTelAndUrl($el, tel, link, ww)

    $(window).resize(function() {
      ww = $(window).width();
      checkTelAndUrl($el, tel, link, ww)
    });
  
  }); 

  function changeTelAndUrl ($el, value){
    console.log(value);
    $el.attr('href', value);
  }

  function checkTelAndUrl ($el, tel, link, ww){
    if (ww > 1024) {
      changeTelAndUrl($el, link);
    } else {
      changeTelAndUrl($el, tel);
    }
  }
});