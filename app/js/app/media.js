define([
  'lodash',
  'soundManager',
  'videojs',
  'events',
  'config',
  './audio_utils',
  './video_utils'
], function(_, soundManager, videojs, events, config, audio_utils, video_utils) {

  var AUDIO_ROOT = '/audio/';
  var AUDIO_FILES = {
    intro: AUDIO_ROOT + 'bulga-morning-birdcall-servo.mp3'
  };

  var testVideo;
  var introAudio;

  var initIntroAudio = function() {
    // Trigger load and play of intro sound
    introAudio = soundManager.createSound({
      id: 'intro',
      url: AUDIO_FILES.intro,
      autoLoad: true,
      onload: function() {
        audio_utils.fadeIn(this, 4);
      }
    });
  };

  var initTestVideo = function() {
    testVideo = videojs('test_video_1', {
      loop: true,
      width: '100%',
      height: 'auto'
    }).volume(0);
  };

  var soundManagerOnReady = function() {
    initIntroAudio();
  };

  var setBindings = function() {
    events.on(config.enterViewportEvent + 'intro', function() {
      if (introAudio && introAudio.paused) {
            console.log('fade in', +new Date);
        audio_utils.fadeIn(introAudio);
      }
    });
    events.on(config.exitViewportEvent + 'intro', function() {
      if (!config.quiet) {
            console.log('fade out', +new Date);
        audio_utils.fadeOut(introAudio, 2, introAudio.pause);
      }
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