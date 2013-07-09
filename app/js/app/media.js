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

  var testVideo;

  var videos = {};
  var activeVideo;

  var clips = {};

  var initAudio = function() {

    $('.ambient-audio').each(function(){
      var $clip = $(this);
      var id = $clip.attr('id');

      // create the soundManager clip
      var clip = soundManager.createSound({
        id: id,
        //url: AUDIO_ROOT + id + '.mp3',
        // TODO remove hardcode
        url: AUDIO_ROOT + 'bulga-morning-birdcall-servo.mp3',
        autoLoad: true,
        onload: function(){
          if (id.match(/intro/)){
            // HACK HACK. Trigger sound for the first video
            events.trigger('scroll:enter:' + id);
          }
        }
      });

      // listen to scroll events for this id
      events.on('scroll:enter:' + id, function() {
        audio_utils.fadeIn(clip);
      });
      events.on('scroll:exit:' + id , function() {
        audio_utils.fadeOut(clip);
      });

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

  var initAndSetAudioBindings = function() {
    var audioControl = $('.audio-control');
    audioControl.find('.switch').on('switch-change', function (e, data) {
      var quiet = !data.value;
      if (!config.quiet && quiet){
        audio_utils.mute();
      }else if (config.quiet && !quiet){
        audio_utils.unmute();
      }
      config.quiet = quiet;
      events.trigger('audio:' + (config.quiet ? 'on' : 'off'));
    });
  };

  var setVideoBindings = function() {

    $('.ambient-video').each(function() {
      var element = $(this);
      var id = element.attr('id');
      events.on('scroll:enter:' + id, function() {
        videos[id].play();
      });
      events.on('scroll:exit:' + id, function() {
        videos[id].pause();
      });
    });

  };

  var init = function() {

    initVideos();

    setVideoBindings();

    initAndSetAudioBindings();

    soundManager.setup({
      url: '/components/soundmanager/swf/soundmanager2.swf',
      onready: initAudio,
      debugMode: config.debug
    });

    $('.soundcloud-player').scPlayer();
  };

  return {
    init: init
  };
});
