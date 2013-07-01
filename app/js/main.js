require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    backbone: '../components/backbone/backbone',
    config: './config',
    events: './app/events',
    fatcontroller: './libs/fatcontroller',
    soundManager: '../components/soundmanager/script/soundmanager2',
    videojs: '../components/video.js/video',
    bootstrapSwitch: '../components/bootstrap-switch/static/js/bootstrapSwitch'
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
    },
    bootstrapSwitch: {
      deps: ['jquery']
    }
  }
});

require([
  'jquery',
  'events',
  './app/main',
  // dependencies
  'bootstrapSwitch'
],
function($, events, app) {
  $(app.init);
});
