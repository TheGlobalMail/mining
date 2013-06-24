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
    layout.init();
    media.init();
    _.defer(scroll.init);
  };

  return {
    init: init
  }
});
