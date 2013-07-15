define([
  'jquery',
  'lodash',
  'events',
  'config',
  './../utils/getScrollY',
  'easing',
  'scrollTo'
], function ($, _, events, config, getScrollY) {

  var elementsToWatch = [{
    selector: '.article-header',
    eventIdentifier: 'intro'
  }, {
    selector: '.chapters-container',
    eventIdentifier: 'chapters-container',
    filter: {
      exit: function(obj) {
        // Prevent the exit event from firing if you
        // scroll above the chapter container
        return obj.offset.top < scrollY;
      }
    }
  }, {
    selector: '#chapter1',
    eventIdentifier: 'chapter1'
  }, {
    selector: '#chapter2',
    eventIdentifier: 'chapter2'
  }, {
    selector: '#chapter3',
    eventIdentifier: 'chapter3'
  }, {
    selector: '#chapter4',
    eventIdentifier: 'chapter4'
  }, {
    selector: '#chapter5',
    eventIdentifier: 'chapter5'
  }, {
    selector: '#chapter6',
    eventIdentifier: 'chapter6'
  }];

  // Cached globals values
  var scrollY;
  var windowHeight;

  var populateConfig = function() {
    $('.ambient-video,[data-ambient-audio]').each(function() {
      var element = $(this);
      var id = element.attr('id');
      elementsToWatch.push({
        selector: '#' + id,
        eventIdentifier: id
      });
    });
  };

  var initElements = function() {
    // Calculate the position of each element and cache
    // as many values as possible

    _.map(elementsToWatch, function(obj) {
      var element = $(obj.selector);
      var offset = element.offset();
      offset.bottom = offset.top + element.outerHeight();
      return _.extend(obj, {
        element: element,
        offset: offset,
        inViewport: false
      });
    });
  };

  var offsetInViewport = function(offset, resetScrollY) {
    if (resetScrollY) {
      scrollY = getScrollY();
    }
    return (
      (offset.top >= scrollY) && (offset.top <= scrollY + windowHeight) ||
      (offset.bottom >= scrollY) && (offset.bottom <= scrollY + windowHeight)
    );
  };

  var checkElements = function() {
    // Check if each element is within the viewport and trigger
    // events when an element enters or exits.

    for (var i = 0; i < elementsToWatch.length; i++) {
      var obj = elementsToWatch[i];
      var offset = obj.offset;
      var event = null;

      var inViewport = offsetInViewport(offset);

      var eventIdentifier = obj.eventIdentifier;

      if (inViewport && !obj.inViewport) {
        obj.inViewport = true;
        event = 'scroll:enter:' + eventIdentifier;
      } else if (!inViewport && obj.inViewport) {
        obj.inViewport = false;
        if (obj.filter && obj.filter.exit && !obj.filter.exit(obj)) {
          continue;
        }
        event = 'scroll:exit:' + eventIdentifier;
      }

      if (event) {
        events.trigger(event);
      }
    }
  };

  var onScroll = function() {
    scrollY = getScrollY();
    checkElements();
  };

  var onResize = function() {
    windowHeight = window.innerHeight;
    initElements();
  };

  var forceRecheckOfElements = function() {
    // reset all inViewport attributes
    for (var i = 0; i < elementsToWatch.length; i++) {
      elementsToWatch[i].inViewport = false;
    }
    // trigger on scroll
    onScroll();
  };

  var setBindings = function() {
    $(window).on('scroll', _.throttle(onScroll, 50));
    $(window).on('resize', _.debounce(onResize, 50));
    events.on('layout:change', _.throttle(onResize, 100));
  };

  var init = function() {
    scrollY = getScrollY();
    windowHeight = window.innerHeight;

    events.on('layout:end', function() {
      populateConfig();
      setBindings();
      initElements();
      setBindings();
      checkElements();
      events.trigger('scroll:end');
    });

    $('a[data-return-to-main]').on('click', function(e){
      e.preventDefault();
      var options = {
        duration: 2000,
        easing: 'easeInOutCubic'
      };
      $.scrollTo('#main', options);
    });

    $('#story-kickoff').on('click', function(e){
      e.preventDefault();
      var options = {
        duration: 700,
        easing: 'easeInOutCubic'
      };
      $.scrollTo('#chapter1', options);
    });

    // Bit of a hack to trigger scroll events immediately after audio is loaded
    events.on('media:ready:audio', forceRecheckOfElements);
    events.on('media:audio:on', forceRecheckOfElements);
  };

  return {
    init: init
  }
});
