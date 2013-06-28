require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    backbone: '../components/backbone/backbone',
    config: './config',
    events: './utils/events',
    soundManager: '../components/soundmanager/script/soundmanager2',
    videojs: '../components/video.js/video'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    },
    soundManager: {
      exports: 'soundManager'
    },
    videojs: {
      exports: 'videojs'
    }
  }
});

require([
  'jquery',
  // keep events high so that everything can use the one dispatcher
  'events',
  './app/main',
  // dependencies
  '../components/bootstrap-switch/static/js/bootstrapSwitch'
],
function($, events, app) {
  $(app.init);
});
