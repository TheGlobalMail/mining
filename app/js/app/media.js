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

  var initIntroAudio = function() {
    // Trigger load and play of intro sound
    soundManager.createSound({
      id: 'intro',
      url: AUDIO_FILES.intro,
      autoLoad: true,
      onload: function() {
        events.trigger('media/intro/load');
        audio_utils.loopSound(this.id);
        audio_utils.fadeIn('intro', 2);
      }
    });
  };

  var initTestVideo = function() {
    testVideo = videojs('test_video_1', {
      loop: true,
      width: '100%'
    });
  };

  var soundManagerOnReady = function() {
    if (!config.quiet) {
      initIntroAudio();
    }
  };

  var setBindings = function() {
    events.on(config.enterViewportEvent + 'intro', function() {
      audio_utils.fadeIn('intro', 2);
    });
    events.on(config.exitViewportEvent + 'intro', function() {
      audio_utils.fadeOut('intro', 2);
    });
    events.on(config.enterViewportEvent + 'test-video', function() {
      testVideo.play();
    });
    events.on(config.exitViewportEvent + 'test-video', function() {
      testVideo.pause();
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