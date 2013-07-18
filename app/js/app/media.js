define([
  'jquery',
  'lodash',
  'soundManager',
  'events',
  'config',
  './audio_utils',
  './video_utils',
  // dependencies
  'scPlayer'
], function($, _, soundManager, events, config, audio_utils, video_utils) {

  // TODO: SEQUENTIAL LOADING

  // step 1: page & css loaded
  // display loading screen

  // step 2: first video & audio loaded
  // show header with bg & audio
  // show loading icon instead of down arrow

  // Step 3: first chapter loaded
  // display the chapter
  // show loading icons over other chapter's thumbnails
  // replace header's loading icon with down arrow
  // display a loading icon at the end of the chapter

  // step 4 onwards: successive chapter loads
  // display the chapter
  // remove the loading icon at the end of the previous chapter

  // Last step: display the footer


  var AUDIO_ROOT = '/audio/';

  var videos = {};

  var initAudio = function() {

    $('div[data-ambient-audio],video[data-ambient-audio]').each(function(){
      var $clip = $(this);
      var id = $clip.attr('id');
      var clipFile = $clip.data('ambient-audio');

      // create the soundManager clip
      var clip = soundManager.createSound({
        url: AUDIO_ROOT + clipFile,
        autoLoad: true,
        loops: 50,
        onload: function(){
          if (id.match(/header-ambient-audio/)){
            events.trigger('media:ready:audio');
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
      $video.find('source').each(function() {
        var element = $(this);
        var src = element.attr('data-src');
        element.attr('src', '//bulga.theglobalmail.org' + src);
      });
      var id = $video.attr('id');
      if (!id) {
        throw Error('Missing ID', this, id);
      }
      this.loop = true;
      this.volume = 0;
      this.load();

      videos[id] = this;
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
      events.trigger('media:audio:' + (!config.quiet ? 'on' : 'off'));
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

  var initSoundManager = function() {
    soundManager = window.soundManager = new SoundManager();

    soundManager.setup({
      url: '/components/soundmanager/swf/soundmanager2.swf',
      onready: initAudio,
      debugMode: config.debug,
      ontimeout: _.debounce(initSoundManager, 500)
    });

    // Ensure start-up in case document.readyState and/or DOMContentLoaded are unavailable
    soundManager.beginDelayedInit();
  };

  var init = function() {

    // Only if we're enabling ambient audio and video
    if (config.ambianceEnabled) {

      initVideos();

      setVideoBindings();

      initAndSetAudioBindings();

      _.defer(initSoundManager);
    }

    $('.soundcloud-player').scPlayer();
  };

  return {
    init: init
  };
});
