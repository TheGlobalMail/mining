define([
  'lodash',
  'jquery',
  'events'
], function(_, $, events) {

  var navBar;
  var introContainer;
  var introImage;
  var videoContainers;

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

  var init = function() {
    navBar = $('.navbar');
    introContainer = $('.article-header');
    introImage = introContainer.find('img');
    videoContainers = $('.video-container');

    events.on('init:end', function() {
      scaleIntro();
      scaleVideoContainers();
      events.trigger('layout:end');
    });
  };

  return {
    init: init
  };
});