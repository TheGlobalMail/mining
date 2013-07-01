define([
  'jquery',
  'lodash',
  'events',
  './layout',
  './media',
  './scroll'
], function($, _, events, layout, media, scroll) {
  'use strict';

  var init = function() {
    // Initialise modules
    layout.init();
    media.init();
    scroll.init();

    _.defer(function() {
      events.trigger('init:end');
    });
  };

  return {
    init: init
  };
});
