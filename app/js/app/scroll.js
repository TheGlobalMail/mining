define([
  'jquery',
  'lodash',
  'events',
  'config',
  './../utils/getScrollY'
], function ($, _, events, config, getScrollY) {

  var elementsToWatch = [{
    selector: '.article-header',
    eventIdentifier: 'intro'
  }//, {
//    selector: '#test_video_1',
//    eventIdentifier: 'test-video'
//  }
  ];

  // Cached globals values
  var scrollY;
  var windowHeight;

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

  var elementInViewport = function(element) {
    var offset = element.offset();
    offset.bottom = offset.top + element.outerHeight();
    return offsetInViewport(offset, true);
  };

  var checkElements = function() {
    // Check if each element is within the viewport and trigger
    // events when an element enters or exits.

    for (var i = 0; i < elementsToWatch.length; i++) {
      var obj = elementsToWatch[i];
      var offset = obj.offset;
      var event = null;

      var inViewport = offsetInViewport(offset);

      if (!obj.inViewport && inViewport) {
        obj.inViewport = true;
        event = config.enterViewportEvent + obj.eventIdentifier;
      } else if (obj.inViewport && !inViewport) {
        obj.inViewport = false;
        event = config.exitViewportEvent + obj.eventIdentifier;
      }
      if (event) {
        if (config.debug) {
          console.log('scroll event: ', event);
        }
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

  var setBindings = function() {
    $(window).on('scroll', _.throttle(onScroll, 50));
    $(window).on('resize', _.debounce(onResize, 50));
  };

  var init = function() {
    scrollY = getScrollY();
    windowHeight = window.innerHeight;

    events.on('layout:end', function() {
      setBindings();
      initElements();
      setBindings();
      checkElements();
      events.trigger('scroll:end');
    });
  };

  return {
    init: init,
    elementInViewport: elementInViewport,
    elementsToWatch: elementsToWatch
  }
});
