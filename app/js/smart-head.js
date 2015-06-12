var $ = require('jquery');

var SmartHead = (function() {
  'use strict';

  function SmartHead(args) {
    // enforces new
    if (!(this instanceof SmartHead)) {
      return new SmartHead(args);
    }
    // constructor body
    this.selectors = {
      window: '.c-canvas__on-canvas'
    };

    this.$smartHeads = $('.jsSmartHead');
    this.smartHeads = [];
    this.totalHeights = 0;

    this.initialize();
  }

  SmartHead.prototype = {
    constructor: SmartHead,

    initialize: function() {
      this.initializeSmartHeads();
      this.onScroll();
    },

    initializeSmartHeads: function() {
      var SH = this;
      var totalHeights;
      this.$smartHeads.each(function(index, el) {
        var $el = $(el),
          $clone = $el.clone(true, true).removeClass('jsSmartHead').addClass('jsSmartHeadClone'),
          props = {},
          prevSmartHeadHeight = 0;

        $el.after($clone);
        // Initialize Appended Clone CSS 
        $clone.css({
          display: 'none',
          position: 'absolute',
          left: '0',
          right: '0',
          // background: 'red',
          // opacity: '0.75'
        });

        props.$el = $el;
        props.$clone = $clone;
        props.height = $el.outerHeight();
        props.activationPos = $el.position().top;
        props.deactivationPos = $el.position().top;
        props.isActivated = false;

        if (index == 0) {
          props.posWhenScrollingDown = -props.height;
          props.posWhenScrollingUp = 0;

        } else {
          prevSmartHeadHeight = SH.smartHeads[index - 1].height;
          props.deactivationPos = $el.position().top - props.height;
          props.posWhenScrollingDown = 0;
          props.posWhenScrollingUp = prevSmartHeadHeight;
        }

        SH.totalHeights = SH.totalHeights + props.height;
        SH.smartHeads.push(props);
      });
    },

    onScroll: function() {
      var SH = this;
      var prevScrollTop = 0;
      var scrollTop = $(SH.selectors.window).scrollTop();
      this.toggleSmartHeads(prevScrollTop, scrollTop);

      $(SH.selectors.window).scroll(function(event) {
        prevScrollTop = scrollTop;
        scrollTop = $(SH.selectors.window).scrollTop();

        SH.toggleSmartHeads(prevScrollTop, scrollTop);
      });
    },

    toggleSmartHeads: function(prevScrollTop, scrollTop) {
      var SH = this;
      var scrollDirection = (scrollTop - prevScrollTop > 0) ? 'down' : 'up';

      this.smartHeads.forEach(function(element, index) {

        if (scrollTop > element.activationPos) {
          if (!element.isActivated) {
            SH.activateSmartHeadCss(scrollDirection, element);
            element.isActivated = true;
          }

          SH.directionDependentCss(scrollDirection, element);
        }

        if (scrollTop <= element.deactivationPos && element.isActivated) {
          element.isActivated = false;
          SH.deactivateSmartHeadCss(element);
        }
      });

      if (scrollTop <= this.smartHeads[0].activationPos) {
        this.deactivateAllSmartHeads();
      }
    },

    activateSmartHeadCss: function(direction, props) {
      props.$clone.css({
        'display': 'block',
        'position': 'fixed',
        'z-index': '9999',
        'webkit-transition': 'top 0.25s ease-out',
        'transition': 'top 0.25s ease-out',
        'webkit-backface-visiblity': 'hidden',
        'webkit-transform': 'translateZ(0)'
      });

      props.$clone.addClass('is-fixed');
    },

    deactivateSmartHeadCss: function(props) {
      props.$clone.css({
        'display': 'none',
        'position': 'absolute',
        'top': '0',
        'z-index': '-1'
      });

      props.$clone.removeClass('is-fixed')

    },

    directionDependentCss: function(direction, props) {
      if (direction === 'down') {
        props.$clone.css({
          'top': props.posWhenScrollingDown,
        });
      } else {
        props.$clone.css({
          'top': props.posWhenScrollingUp
        });
      }
    },

    deactivateAllSmartHeads: function() {
      var SH = this;
      this.smartHeads.forEach(function(props, index) {
        SH.deactivateSmartHeadCss(props);
      });
    }
  };

  return SmartHead;
}());

// using window load instead of document ready to ensure all images
// are loaded before firing smart head
$(window).load(function($) {
  'use-strict';
  SmartHead();
});
