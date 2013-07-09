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
    scPlayer: './libs/sc-player',
    highcharts: '../components/highcharts.com/js/highcharts.src',
    scrollTo: '../components/jquery.scrollTo/jquery.scrollTo',
    easing: '../components/jquery-easing/jquery.easing'
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
    },
    scrollTo: {
      deps: ['jquery']
    },
    highcharts: {
      deps: ['jquery'],
      exports: 'Highcharts'
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
