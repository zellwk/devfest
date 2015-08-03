var $ = global.jQuery;
require('scrollSpy');

$(window).load(function() {
  'use-strict';
  var stickyHeadHeight = $('.c-events-header').outerHeight();
  var extraPadding = 21;
  var circleSize = 63;
  var scrollDirection = 'down';

  $('.jsScrollSpyContainer').each(function(index, el) {
    var props = {},
      $el = $(el);

    props.offsetTop = parseInt($el.offset().top);
    props.height = $el.height();
    props.minWhenScrollingDown = parseInt($el.offset().top) - stickyHeadHeight - extraPadding;
    props.maxWhenScrollingDown = props.minWhenScrollingDown + props.height - circleSize;
    props.minWhenScrollingUp = parseInt($el.offset().top) - extraPadding;
    props.maxWhenScrollingUp = props.minWhenScrollingUp + props.height - circleSize;

    // Note to self: Need to set new scrollspy for every date
    el.asd = $el.scrollspy({
      container: '.c-canvas__on-canvas',
      min: props.minWhenScrollingDown,
      max: props.maxWhenScrollingDown,
      props: props,
      scrollDirection: 'down',
      transition: 'none',

      onTick: function() {
        this.setScrollDirection(true);

        // Change CSS for enter status depending on scroll direction
        if (this.status === 'enter') {
          if (this.scrollDirection === 'down') {
            this.$el.css({
              position: 'fixed',
              top: 90,
              bottom: 'auto',
            });
          } else {
            this.$el.css({
              position: 'fixed',
              top: 158
            });
          }
        }
      },
      onEnter: function(elem, pos) {
        this.status = 'enter';

        // Initializes variables
        this.$el = $el.find('.jsScrollSpy');
        this.$container = $(this.container)

        // Gets scroll direction 
        this.setScrollDirection(false);
        this.removeTransition();
      },
      
      onLeave: function(elem, pos) {
        var nextEnterDirection;
        this.status = 'leave';
        this.setScrollDirection();
        this.removeTransition();

        /**
         * Checks whether scrollSpy is leaving from Bottom or Top
         */
        if (this.scrollDirection === 'down') {
          // Leave bottom
          this.$el.css({
            position: 'absolute',
            top: 'auto',
            bottom: '0',
          });

          nextEnterDirection = 'up';

        } else {
          // Leave top

          this.$el.css({
            position: 'absolute',
            top: '0',
            bottom: 'auto',
          });

          nextEnterDirection = 'down';

        }

        // Sets minMax when leaving (Opposite of current direction)
        // this.changeMinMax(nextEnterDirection);
      },

      onScroll: function () {
        var SS = this;
        $(this.container).on('scroll', function(event) {
          event.preventDefault();
          console.log('test');
          SS.setScrollDirection();
        });        
      }, 

      /**
       * Sets scroll direction up | down
       */
      setScrollDirection: function(changeTransition) {
        var currentDirection = this.scrollDirection;
        changeTransition = changeTransition || false;

        this.oldTop = this.scrollTop || 0;
        this.scrollTop = this.$container.scrollTop();

        if (this.scrollTop >= this.oldTop) {
          this.scrollDirection = 'down';
        } else {
          this.scrollDirection = 'up';
        }

        // Change minMax if direction changes
        if (currentDirection !== this.scrollDirection) {
          this.changeMinMax(this.scrollDirection);
        }

        // Direction Change, activate transition
        if (currentDirection !== this.scrollDirection && changeTransition) {
          this.setTransition();
        }
      },

      setTransition: function() {
        if (this.transition === 'none') {
          this.$el.css({
            'webkit-transition': 'top 0.25s ease-out',
            'transition': 'top 0.25s ease-out'
          });
        }
      },

      removeTransition: function() {
        this.$el.css({
          'webkit-transition': 'none',
          'transition': 'none'
        })
      },

      /**
       * Changes Min / Max options whenever scroll direction changes
       */
      changeMinMax: function(scrollDirection) {
        if (scrollDirection === 'down') {
          this.min = this.props.minWhenScrollingDown;
          this.max = this.props.maxWhenScrollingDown;
        } else {
          this.min = this.props.minWhenScrollingUp;
          this.max = this.props.maxWhenScrollingUp;
        }

        console.log('min', this.min, 'max', this.max);
      }
    });
  });
});
