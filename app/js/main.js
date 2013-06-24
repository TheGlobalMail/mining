require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    backbone: '../components/backbone/backbone',
    config: './config',
    events: './utils/events',
    soundManager: '../components/soundmanager/script/soundmanager2'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    },
    soundManager: {
      exports: 'soundManager'
    }
  }
});

require([
  'jquery',
  './app/main',
  // Dependencies
  'events'
],
function ($, app) {
  $(app.init);
});
