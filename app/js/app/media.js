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
  var playIntroAudio;

  var initIntroAudio = function() {
    // Trigger load and play of intro sound
    introAudio = soundManager.createSound({
      url: AUDIO_FILES.intro,
      autoLoad: true,
      onload: function() {
        if (playIntroAudio) {
          audio_utils.fadeIn(introAudio);
        }
      }
    });
  };

  var initTestVideo = function() {
//    var testVideoElement = $('#test_video_1');
//    testVideo = videojs('test_video_1', {
//      loop: true
//    }).volume(0);
  };

  var soundManagerOnReady = function() {
    initIntroAudio();
  };

  var bindAudioControl = function() {
    var audioControl = $('.audio-control');
    audioControl.find('.switch').on('switch-change', function (e, data) {
      config.quiet = data.value;
      events.trigger('audio:' + (data.value ? 'on' : 'off'));
    });
  };

  var setBindings = function() {
    events.on('scroll:enter:intro', function() {
      playIntroAudio = true;
      audio_utils.fadeIn(introAudio);
    });
    events.on('scroll:exit:intro', function() {
      playIntroAudio = false;
      audio_utils.fadeOut(introAudio);
    });

//    events.on(config.enterViewportEvent + 'test-video', function() {
//      video_utils.fadeIn(testVideo);
//    });
//    events.on(config.exitViewportEvent + 'test-video', function() {
//      video_utils.fadeOut(testVideo);
//    });

    bindAudioControl();
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