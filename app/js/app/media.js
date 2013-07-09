define([
  'jquery',
  'lodash',
  'soundManager',
  'videojs',
  'events',
  'config',
  './audio_utils',
  './video_utils',
  './../utils/getScrollY',
  './scroll',
  // dependencies
  'scPlayer'
], function($, _, soundManager, videojs, events, config, audio_utils, video_utils, getScrollY, scroll) {

  var AUDIO_ROOT = '/audio/';
  var AUDIO_FILES = {
    intro: AUDIO_ROOT + 'bulga-morning-birdcall-servo.mp3'
  };

  var testVideo;
  var introAudio;
  var playIntroAudio;

  var videos = {};
  var activeVideo;

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

  var initVideos = function(){
    $('.ambient-video').each(function(){
      var $video = $(this);
      var id = $video.attr('id');
      videos[id] = videojs(id, {
        loop: true,
        width: 'auto',
        height: 'auto'
      }).volume(0);
    });
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

    bindAudioControl();
  };

  var init = function() {

    soundManager.setup({
      url: '/components/soundmanager/swf/soundmanager2.swf',
      onready: soundManagerOnReady,
      debugMode: config.debug
    });

    initVideos();

    setBindings();

    $('.soundcloud-player').scPlayer();
  };

  return {
    init: init
  };
});
