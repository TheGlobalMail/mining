define([
  'lodash',
  'jquery'
], function(_, $) {

  var navBar;
  var introContainer;
  var introImage;
  var videoContainers;

  var scaleIntro = function() {
    // Window height minus the navbar minus the intro container's padding
    var introHeight = window.innerHeight - navBar.outerHeight() - (introContainer.outerHeight() - introContainer.height());
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

    scaleIntro();
    scaleVideoContainers();
  };

  return {
    init: init
  };
});