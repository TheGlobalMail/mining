define([
  'jquery',
  'lodash',
  'events',
  'config',
  './../utils/getScrollY',
  'easing',
  'scrollTo'
], function ($, _, events, config, getScrollY) {

  var selectorsToWatch = [

  ];

  var elementsToWatch = [{
    selector: '#chapters-container',
    eventIdentifier: 'chapters-container',
    filter: {
      exit: function(obj) {
        // Prevent the exit event from firing if you
        // scroll above the chapter container
        return obj.offset.top < scrollY;
      }
    }
  }];

  // Cached globals values
  var scrollY;
  var windowHeight;
  var fixedHeaderHeight;

  var _populateConfig = function(selector) {
    $(selector).each(function() {
      var element = $(this);
      var id = element.attr('id');
      var matches = _(elementsToWatch).filter(function(obj) {
        return obj.selector = selector;
      });
      if (!matches.length) {
        elementsToWatch.push({
          selector: '#' + id,
          eventIdentifier: id
        });
      }
    });
  };

  var populateConfig = function() {
    $('.article-section').each(function() {
      _populateConfig('#' + $(this).attr('id'));
    });
    _populateConfig('.ambient-video, .ambient-audio, #footer');
  };

  var _initElement = function(obj) {
    // Calculate the position of an element and cache
    // as many values as possible

    var element = $(obj.selector);
    var offset = element.offset();
    offset.bottom = offset.top + element.outerHeight();
    return _.extend(obj, {
      element: element,
      offset: offset,
      inViewport: false
    });
  };

  var initElements = function() {
    _.map(elementsToWatch, _initElement);
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

  var _checkElement = function(obj) {
    // Check if an element is within the viewport and trigger
    // events when an element enters or exits.

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
        return;
      }
      event = 'scroll:exit:' + eventIdentifier;
    }

    if (event) {
      events.trigger(event);
    }
  };

  var checkElements = function() {
    _.each(elementsToWatch, _checkElement);
  };

  var getScrollYWrapper = function() {
    return getScrollY() + fixedHeaderHeight;
  };

  var getWindowHeight = function() {
    return window.innerHeight - (fixedHeaderHeight);
  };

  var onScroll = function() {
    scrollY = getScrollYWrapper();
    checkElements();
  };

  var onResize = function() {
    windowHeight = getWindowHeight();
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

    $('article-section').each(function() {
      var element = $(this);
      if (element.attr('id') !== undefined) {
        events.on('media:section:loaded:' + element.attr('id'), function() {
          _.each(elementsToWatch, function(obj) {
            if (obj.element.is(element)) {
              _checkElement(element);
            }
          });
        });
      }
    });
  };

  var init = function() {
    fixedHeaderHeight = $('.navbar').outerHeight();

    scrollY = getScrollYWrapper();
    windowHeight = getWindowHeight();

    events.on('layout:end', function() {
      populateConfig();
      setBindings();
      initElements();
      setBindings();
      checkElements();
      events.trigger('scroll:end');
    });

    // Bit of a hack to trigger scroll events immediately after audio is loaded
    events.on('media:ready:audio', forceRecheckOfElements);
    events.on('media:audio:on', forceRecheckOfElements);
  };

  return {
    init: init
  };
});