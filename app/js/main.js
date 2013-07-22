require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    backbone: '../components/backbone/backbone',
    config: './config',
    events: './app/events',
    fatcontroller: './libs/fatcontroller',
    scPlayer: './libs/sc-player',
    highcharts: '../components/highcharts.com/js/highcharts.src',
    scrollTo: '../components/jquery.scrollTo/jquery.scrollTo',
    easing: '../components/jquery-easing/jquery.easing',
    modernizr: './libs/modernizr'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    },
    soundManager: {
      exports: 'soundManager'
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
    },
    modernizr: {
      exports: 'Modernizr'
    }
  }
});

// Defer SoundManager2 instantiation until we're ready
window.SM2_DEFER = true;

require([
  'jquery',
  'events',
  './app/main',
  'config'
],
function($, events, app, config) {
  if (config.debugEvents) {
    window.fc = events;
  }
  $(app.init);
});
