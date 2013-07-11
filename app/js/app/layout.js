define([
  'lodash',
  'jquery',
  'events',
  'config'
], function(_, $, events, config) {

  var navBar;
  var introContainer;
  var introImage;
  var introh1;
  var videoContainers;
  var chaptersContainer;
  var chapters;
  var chaptersButton;

  var scaleIntro = function() {
    // Window height minus the navbar
    var introHeight = window.innerHeight - navBar.outerHeight();

    introContainer.css({
      height: introHeight
    });

    var introh1Height = introh1.outerHeight();
    if (introh1Height < introHeight) {
      introh1.css({
        top: (introHeight - introh1.outerHeight()) / 3
      });
    }
  };

  var scaleVideoContainers = function() {
    videoContainers.each(function() {
      var element = $(this);
      var row = element.parent().find('.row');
      if (window.innerHeight <= row.outerHeight()) {
        row.addClass('no-border-radius');
      }
      element.css({
        height: Math.max(window.innerHeight, row.outerHeight()),
        width: window.innerWidth
      });
    });
  };

  var scaleChapterContainer = function() {
    chaptersContainer.css({
      'height': chapters.outerHeight(true)
    });
  };

  var chapterButtonOnclick = function() {
    if (chapters.hasClass('fixed')) {
      if (chapters.hasClass('active')) {
        chapters
          .addClass('inactive')
          .removeClass('active');
      } else {
        chapters
          .removeClass('inactive')
          .addClass('active');
      }
    }
  };

  var toggleChapterState = function() {
    chaptersContainer.toggleClass('pinned-child');
    chapters
      .toggleClass('fixed')
      .removeClass('active')
      .removeClass('inactive');
  };

  var setBindings = function() {
    // Set the size for objects
    events.on('init:end', function() {
      scaleIntro();
      scaleVideoContainers();
      scaleChapterContainer();
      events.trigger('layout:end');
    });


    events.on('scroll:enter:chapters-container', function() {
      if (chapters.hasClass('fixed')) {
        toggleChapterState();
      }
    });
    events.on('scroll:exit:chapters-container', toggleChapterState);

    chaptersButton.on('click', chapterButtonOnclick)
  };

  var init = function() {
    navBar = $('.navbar');
    introContainer = $('.article-header');
    introImage = introContainer.find('img');
    introh1 = introContainer.find('h1');
    videoContainers = $('.video-container');
    chaptersContainer = $('.chapters-container');
    chapters = chaptersContainer.find('.chapters');
    chaptersButton = chapters.find('.open');

    setBindings();
  };

  return {
    init: init
  };
});