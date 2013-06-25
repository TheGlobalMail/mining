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
        events.trigger('media/intro/load');
      }
    });
    introAudio.setVolume(0);
    audio_utils.loopSound(introAudio);
    introAudio.pause();
  };

  var initTestVideo = function() {
    testVideo = videojs('test_video_1', {
      loop: true,
      width: '100%',
      height: 'auto'
    });
    testVideo.volume(0);
  };

  var soundManagerOnReady = function() {
    initIntroAudio();
  };

  var setBindings = function() {
    events.on(config.enterViewportEvent + 'intro', function() {
      introAudio.resume();
      introAudio.setVolume(0);
      if (!config.quiet) {
        audio_utils.fadeIn(introAudio, 4);
      }
    });
    events.on(config.exitViewportEvent + 'intro', function() {
      if (!config.quiet) {
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