var $ = require('jquery');

var ScrollSpy = (function() {
  'use strict';

  function ScrollSpy(options) {
    // enforces new
    if (!(this instanceof ScrollSpy)) {
      return new ScrollSpy(options);
    }

    var defaults = {
      min: 0,
      max: 0,
      buffer: 0,
      props: {
        min: 0,
        max: 0,
        buffer: 0,
      },
      mode: 'vertical',
      namespace: 'scrollSpy',
      container: window,
    };

    this.options = $.extend({}, defaults, options);

    // initializes other variables

    this.oldPosition = {
      top: 0,
      left: 0
    };

    this.curPosition = {
      top: 0,
      left: 0
    };

    this.direction = 'down';
    this.transition = 'none';

    // constructor body
    this.init();
  }

  ScrollSpy.prototype = {
    constructor: ScrollSpy,

    init: function() {
      var SS = this;
      var o = this.options;
      var $el = o.$el;
      var mode = o.mode;
      var $container = $(o.container);
      var buffer = o.buffer;
      var enters = 0;
      var leaves = 0;
      var inside = false;

      this.$el = $el;

      $container.on('scroll.' + o.namespace, function(event) {
        event.preventDefault();

        // Updates old position
        SS.oldPosition = SS.curPosition

        var position = {
          top: $(this).scrollTop(),
          left: $(this).scrollLeft()
        };

        var xy = (mode == 'vertical') ? position.top + buffer : position.left + buffer;

        var max = o.max;
        var min = o.min;
        var oldDirection = SS.direction;

        // Updates new position
        SS.curPosition = position;

        // Updates Direction 
        if (o.mode === 'vertical') {
          SS.direction = (SS.curPosition.top > SS.oldPosition.top ? 'down' : 'up');
        }

        if (oldDirection != SS.direction) {
          SS.onScrollDirectionChange();
        }

        // fit max 
        // if (typeof o.max === 'function') {
        //   max = o.max();
        // }

        // if (typeof o.min === 'function') {
        //   max = o.min();
        // }

        if (max === 0) {
          max = (mode == 'vertical') ? $container.height() : $container.outerWidth() + $(element).outerWidth();
        }

        // if we have reached the minimum bound but are below the max ... 
        if (xy >= min && xy <= max) {
          // Trigger enter event 
          if (!inside) {
            inside = true;
            enters++;

            // Fire enter event 
            // $el.trigger('scrollEnter', {
            //   position: position
            // });

            SS.onEnter($el, position);
          }

          // Trigger Tick 
          $el.trigger('scrollTick', {
            position: position,
            inside: inside,
            enters: enters,
            leaves: leaves
          });

          SS.onTick($el, position, inside, enters, leaves);
        } else {
          if (inside) {
            inside = false;
            leaves++;

            // Triggers leave event
            $el.trigger('scrollLeave', {
              position: position,
              leaves: leaves
            });

            SS.onLeave($el, position);
          }
        }
      });

    },

    onEnter: function($el, pos) {
      this.status = 'enter';
      this.removeTransition();

      this.options.props.highlightComponent.addClass('is-active');
    },

    onLeave: function($el, pos) {
      this.status = 'leave';
      this.removeTransition();

      this.options.props.highlightComponent.removeClass('is-active');


      if (this.direction === 'down') {
        this.options.$item.css({
          position: 'absolute',
          top: 'auto',
          bottom: '0',
        });
      } else {
        this.options.$item.css({
          position: 'absolute',
          top: '0',
          bottom: 'auto',
        });
      }
    },

    onTick: function($el, pos, inside, enters, leaves) {
      if (this.direction === 'down') {
        this.options.$item.css({
          position: 'fixed',
          top: this.options.props.fixedTop,
          bottom: 'auto',
        });
      } else {
        this.options.$item.css({
          position: 'fixed',
          // top: this.options.props.fixedTop + this.options.props.buffer,
          top: this.options.props.fixedTop
        });
      }
    },

    setTransition: function() {
      var transition = 'top 0.25s ease-out'
      if (this.transition === 'none') {
        this.transition = transition;
        this.options.$item.css({
          'webkit-transition': transition,
          'transition': transition,
        });
      }
    },

    removeTransition: function() {
      var transition = 'none';
      if (this.transition !== 'none') {
        this.transition = 'none';
        this.options.$item.css({
          'webkit-transition': transition,
          'transition': transition,
        });
      }
    },

    onScrollDirectionChange: function() {
      this.setTransition();
      this.changeMinMax();
    },

    changeMinMax: function() {
      var o = this.options
      // if (this.direction === 'down') {
        o.min = o.props.min;
        o.max = o.props.max;
      // } else {
      //   o.min = o.props.min - o.props.buffer;
      //   o.max = o.props.max - o.props.buffer;
      // }

      this.options = o;
    },

    update: function(props) {
      this.options.props = $.extend({}, this.options.props, props);
      this.changeMinMax();
    }
  }

  return ScrollSpy;
}());

$(window).load(function() {
  'use-strict';
  var globalProps = getProps();

  $('.jsScrollSpyContainer').each(function(index, el) {
    var $el = $(el);
    var props = calcScrollSpyProps(globalProps, $el);
    var scrollSpyHighlight = $el.find('.jsScrollSpy').attr('data-scrollSpyHighlight');

    props.highlightComponent = $('.jsScrollSpyHighlight').filter(function() {
      return $(this).attr('data-scrollSpyHighlight') === scrollSpyHighlight;
    });

    el.scrollSpy = new ScrollSpy({
      $el: $(el),
      $item: $(el).find('.jsScrollSpy'),
      container: '.c-canvas__on-canvas',
      props: props,
      min: props.min,
      max: props.max,
    });
  });

  $(window).on('resize', function(event) {
    var globalProps = getProps();

    $('.jsScrollSpyContainer').each(function(index, el) {
      var $el = $(el);
      console.log('calc props');
      var props = calcScrollSpyProps(globalProps, $el);

      el.scrollSpy.update(props);
    });

  });

  function getProps() {
    var o = {};
    o.hiddenHeader = $('.c-site-header').outerHeight();
    o.stickyHeadHeight = $('.c-events-header').outerHeight();
    o.extraPadding = parseInt($('.c-events-header').css('margin-bottom')) || 0;
    o.circleSize = $('.jsScrollSpy').outerHeight();
    o.fixedTop = o.stickyHeadHeight + o.extraPadding;

    console.log(o);
    return o;
  }

  function calcScrollSpyProps(globalProps, $el) {
    var props = {};

    props.height = parseInt($el.outerHeight());
    props.min = parseInt($el.offset().top) - globalProps.stickyHeadHeight - globalProps.extraPadding;
    props.max = props.min + props.height - globalProps.circleSize;
    props.buffer = globalProps.hiddenHeader;
    props.fixedTop = globalProps.fixedTop;

    return props;
  }

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
});
