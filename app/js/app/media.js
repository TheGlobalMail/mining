define([
  'jquery',
  'lodash',
  'events',
  'config',
  './audio_utils',
  // dependencies
  'scPlayer'
], function($, _, events, config, audio_utils) {

  var videoSupport = !!Modernizr.video;
  var audioSupport = !!Modernizr.audio;

  var mediaSections = [];

  var videos = {};

  var bindSources = function(element) {
    // Replace data-src attributes with src attributes

    element.find('source').each(function() {
      var source = $(this);

      source
        .attr('src', source.attr('data-src'))
        .removeAttr('data-src');
    });
  };

  var initAudio = function() {
    $('.ambient-audio').each(function() {
      var container = $(this);
      var id = container.attr('id');

      var $audio = $(this).find('audio').first();
      var audio = $audio.get(0);

      if (id.match(/opener-birdsong/)) {
        var mediaReady = function() {
          events.trigger('media:ready:audio');
        };
        if (Modernizr.hasEvent('canplaythrough', audio)) {
          audio.addEventListener('canplaythrough', mediaReady);
        } else {
          mediaReady();
        }
      }
      bindSources($audio);
      audio.loop = true;

      audio.load();

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
      var video = this;
      var $video = $(video);

      bindSources($video);

      var id = $video.attr('id');

      this.loop = true;
      this.volume = 0;
      this.load();

      videos[id] = this;

      if (Modernizr.hasEvent('canplaythrough', video)) {
        video.addEventListener('canplaythrough', onAmbientVideoLoad);
      } else {
        onAmbientVideoLoad();
      }

      events.on('scroll:enter:' + id, function() {
        videos[id].play();
      });
      events.on('scroll:exit:' + id, function() {
        videos[id].pause();
      });
    });
  };

  var initMediaSections = function() {

    $('.article-section').each(function() {
      var element = $(this);
      var section = {
        element: element
      };
      element.addClass('loading');
      var mediaSelector = '.ambient-video';
      if (audioSupport) {
        mediaSelector += ', .ambient-audio'
      }
      section.media = element.find(mediaSelector);

      mediaSections.push(section);
    });
  };

  var loadMediaBySection = function() {
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
  };

  var bindAudioControl = function() {

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

  var init = function() {

    if (config.ambianceEnabled && videoSupport) {
      initVideos();
      if (audioSupport) {
        initAudio();
        bindAudioControl();
      }
      initMediaSections();
      loadMediaBySection();
    }

    if (!config.ambianceEnabled || !videoSupport) {
      events.trigger('media:ready:video');
      events.trigger('media:ready:audio');
    }

    $('.soundcloud-player').scPlayer();
  };

  return {
    init: init
  };
});
