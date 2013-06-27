define([
  'lodash',
  'soundManager',
  'videojs',
  'events',
  'config',
  './audio_utils',
  './video_utils',
  './../utils/getScrollY',
  './scroll'
], function(_, soundManager, videojs, events, config, audio_utils, video_utils, getScrollY, scroll) {

  var AUDIO_ROOT = '/audio/';
  var AUDIO_FILES = {
    intro: AUDIO_ROOT + 'bulga-morning-birdcall-servo.mp3'
  };

  var testVideo;
  var introAudio;

  var initIntroAudio = function() {
    // Trigger load and play of intro sound
    introAudio = soundManager.createSound({
      url: AUDIO_FILES.intro,
      autoplay: true,
      autoLoad: true,
      onplay: function() {
        var intro = $('.article-header');
        if (scroll.elementInViewport(intro)) {
          audio_utils.fadeIn(this, 4);
        }
      }
    });
  };

  var initTestVideo = function() {
    testVideo = videojs('test_video_1', {
      loop: true
    }).volume(0);
  };

  var soundManagerOnReady = function() {
    initIntroAudio();
  };

  var setBindings = function() {
    events.on(config.enterViewportEvent + 'intro', function() {
      audio_utils.fadeIn(introAudio);
    });
    events.on(config.exitViewportEvent + 'intro', function() {
      audio_utils.fadeOut(introAudio);
    });

    events.on(config.enterViewportEvent + 'test-video', function() {
      video_utils.fadeIn(testVideo);
    });
    events.on(config.exitViewportEvent + 'test-video', function() {
      video_utils.fadeOut(testVideo);
    });
  };

  var init = function() {

    soundManager.setup({
      url: '/components/soundmanager/swf/soundmanager2.swf',
      onready: soundManagerOnReady,
      debugMode: config.debug
    });

    initTestVideo();

    setBindings();
  };

  return {
    init: init
  };
});