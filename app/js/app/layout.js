define([
  'lodash',
  'jquery',
  'events',
  'config'
], function(_, $, events, config) {

  var navBar;
  var introContainer;
  var introImage;
  var videoContainers;
  var chaptersContainer;
  var chapters;
  var chaptersButton;

  var scaleIntro = function() {
    // Window height minus the navbar
    var introHeight = window.innerHeight - navBar.outerHeight();
    // Minus the intro container's padding
    introHeight -= (introContainer.outerHeight() - introContainer.height());
    introContainer.css({
      height: introHeight
    });
  };

  var scaleVideoContainers = function() {
    videoContainers.css({
      height: window.innerHeight
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