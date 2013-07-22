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

      var $audio = container.find('audio').first();
      var audio = $audio.get(0);

      audio.loop = true;
      bindSources($audio);
    });
  };

  var initVideos = function(){

    $('.ambient-video').each(function(){
      var video = this;
      var $video = $(video);

      bindSources($video);

      var id = $video.attr('id');

      this.loop = true;
      this.volume = 0;
    });
  };

  var initMediaSections = function() {

    $('.article-section').each(function() {
      var element = $(this);
      element.addClass('loading');

      // Pull in all the media that we're supporting
      var mediaSelector = '.ambient-video';
      if (audioSupport) {
        mediaSelector += ', .ambient-audio'
      }
      var media = element.find(mediaSelector);

      mediaSections.push({
        element: element,
        media: media
      });
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

    _.each(mediaSections, function(section, i) {

      // When this section's loading has been triggered
      events.on('media:load-section:' + i, function() {

        // When this section has loaded
        var onMediaLoad = _.after(section.media.length, function() {
          section.element.removeClass('loading');
          setTimeout(function() {
            events.trigger('media:load-section:' + (i + 1));
          }, 2000);
          // Trigger loading on the next section
          // Notify that this section has loaded
          events.trigger('media:section-loaded:' + (section.element.attr('id') || i));
        });

        // Trigger loading of each media element
        section.media.each(function() {
          var element = $(this);
          var id = element.attr('id');
          var mediaElement = this;
          if (element.hasClass('ambient-audio')) {
            mediaElement = element.find('audio').get(0);
          }

          if (Modernizr.hasEvent('canplaythrough', mediaElement)) {
            mediaElement.addEventListener('canplaythrough', onMediaLoad);
          } else {
            onMediaLoad();
          }

          mediaElement.load();

          events.on('scroll:enter:' + id, function() {
            mediaElement.play();
          });
          events.on('scroll:exit:' + id, function() {
            mediaElement.pause();
          });
        });

      });

    });

    _.defer(function() {
      events.trigger('media:load-section:0');
    });
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
