define([
  'jquery',
  'lodash',
  'events',
  'config',
  './audio_utils',
  // dependencies
  'scPlayer'
], function($, _, events, config, audio_utils) {

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

  var $document = $('html');
  var supportsVideo = $document.hasClass('video');
  var supportsAudio = $document.hasClass('audio');

  var videos = {};

  var CDN = 'bulga.theglobalmail.org';

  var bindSources = function(element, useCDN) {
    // Replace data-src attributes with src attributes

    var root = '//' + (useCDN ? CDN : window.location.host);
    element.find('source').each(function() {
      var source = $(this);
      source
        .attr('src', root + source.attr('data-src'))
        .removeAttr('data-src');
    });
  };

  var initAudio = function() {
    $('.ambient-audio').each(function(){
      var container = $(this);
      var id = container.attr('id');

      var $audio = $(this).find('audio').first();
      var audio = $audio.get(0);

      bindSources($audio);

      audio.load();
      audio.loop = true;

      if (id.match(/opener-birdsong/)) {
        audio.addEventListener('canplaythrough', function() {
          events.trigger('media:ready:audio');
        });
      }

      // listen to scroll events for this id
      events.on('scroll:enter:' + id, function() {
        audio_utils.fadeIn(audio);
      });
      events.on('scroll:exit:' + id , function() {
        audio_utils.fadeOut(audio);
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

      bindSources($video, true);

      var id = $video.attr('id');

      this.loop = true;
      this.volume = 0;
      this.load();

      videos[id] = this;

      onAmbientVideoLoad();
    });
  };

  var setAudioBindings = function() {

    var audioControl = $('.audio-control');
    audioControl.find('.toggle').on('click', function() {
      config.quiet = !config.quiet;
      audioControl.toggleClass('muted');
      if (config.quiet) {
        audio_utils.mute();
      } else {
        events.trigger('media:audio:on');
      }
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

    if (config.ambianceEnabled) {
      if (supportsVideo) {
        initVideos();
        setVideoBindings();
        if (supportsAudio) {
          initAudio();
          setAudioBindings();
        } else {
          events.trigger('media:ready:audio');
        }
      }
    }

    if (!config.ambianceEnabled || !supportsVideo) {
      events.trigger('media:ready:video');
      events.trigger('media:ready:audio');
    }

    $('.soundcloud-player').scPlayer();
  };

  return {
    init: init
  };
});
