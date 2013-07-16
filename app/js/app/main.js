define([
  'jquery',
  'lodash',
  'events',
  './layout',
  './media',
  './visualisations',
  './scroll',
  './chapters',
  './analytics'
], function($, _, events, layout, media, visualisations, scroll, chapters, analytics) {
  'use strict';

  var body;

  var setBindings = function() {
    events.on('scroll:end', function() {
      body.removeClass('loading');
    });
  };

  var init = function() {
    body = $('body');

    setBindings();

    // Initialise modules
    layout.init();
    media.init();
    visualisations.init();
    chapters.init();
    scroll.init();
    analytics.init();

    _.defer(function() {
      events.trigger('init:end');
    });
  };

  return {
    init: init
  };
});
