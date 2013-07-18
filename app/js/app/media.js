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

  // Step 3 onwards: successive chapter loads
  // display the chapter
  // show loading icons over other chapter's thumbnails
  // replace header's loading icon with down arrow
  // display a loading icon at the end of the chapter

  // Final step: display the footer

  var maxFlashTimeouts = 5;
  var flashTimeouts = 0;
  var AUDIO_ROOT = '/audio/';

  var videos = {};

  var initAudio = function() {

    $('div[data-ambient-audio],video[data-ambient-audio]').each(function(){
      var $clip = $(this);
      var id = $clip.attr('id');
      var clipFile = $clip.data('ambient-audio');

      // create the soundManager clip
      console.log('++++', id)
      var clip = soundManager.createSound({
        url: AUDIO_ROOT + clipFile,
        autoLoad: true,
        loops: 50,
        onload: function(){
          console.log('####',id);
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

    var ambientVideos = $('.ambient-video');

    var onAmbientVideoLoad = _.after(ambientVideos.length, function() {
      events.trigger('media:ready:video');
    });

    ambientVideos.each(function(){
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

      onAmbientVideoLoad();
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

    // Ensure that issues connecting to the swf file
    // don't prevent other stages from completing
    flashTimeouts += 1;
    if (flashTimeouts >= maxFlashTimeouts) {
      events.trigger('media:ready:audio');
      return;
    }

    soundManager = window.soundManager = new SoundManager();

    soundManager.setup({
      url: '//bulga.theglobalmail.org' + '/components/soundmanager/swf/soundmanager2_debug.swf',
      onready: initAudio,
      debugMode: config.debug,
      ontimeout: initSoundManager
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
