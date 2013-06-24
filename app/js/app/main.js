define([
  'jquery',
  'events',
  './layout',
  './media'
], function($, events, layout, media) {
  'use strict';

  var init = function() {
    layout.init();
    media.init();
  };

  return {
    init: init
  }
});
