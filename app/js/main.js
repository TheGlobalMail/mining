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
    bootstrapSwitch: '../components/bootstrap-switch/static/js/bootstrapSwitch',
    scPlayer: './libs/sc-player'
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
    },
    scPlayer: {
      deps: [
        './libs/soundcloud.player.api'
      ]
    }
  }
});

require([
  'jquery',
  'events',
  './app/main',
  'config',
  // dependencies
  'bootstrapSwitch'
],
function($, events, app, config) {
  if (config.debugEvents) {
    window.fc = events;
  }
  $(app.init);
});
