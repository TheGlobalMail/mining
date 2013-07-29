define([
  'jquery',
  'lodash',
  'events',
  './layout',
  './media',
  './visualisations',
  './scroll',
  './chapters',
  './analytics',
  './elements'
], function($, _, events, layout, media, visualisations, scroll, chapters, analytics, elements) {
  'use strict';

  var body;

  var removeGlobalLoadingAfter = [
    'scroll:end',
    'media:section-loaded:article-header'
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
    elements.init();

    _.defer(function() {
      events.trigger('init:end');
    });
  };

  return {
    init: init
  };
});
