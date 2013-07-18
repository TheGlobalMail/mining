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

  var removeGlobalLoadingAfter = [
    'scroll:end',
    'media:ready:audio',
    'media:ready:video'
  ];
  var removeGlobalLoading = _.after(removeGlobalLoadingAfter.length, function() {
    body.removeClass('loading');
  });

  var setBindings = function() {
    _.each(removeGlobalLoadingAfter, function(eventName) {
      events.on(eventName, removeGlobalLoading);
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
