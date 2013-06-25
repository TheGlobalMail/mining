define([
  'lodash',
  'jquery'
], function(_, $) {

  var navBar;
  var introContainer;
  var introImage;

  var scaleIntro = function() {
    // Window height minus the navbar minus the intro container's padding
    var introHeight = window.innerHeight - navBar.outerHeight() - (introContainer.outerHeight() - introContainer.height());
    introContainer.css({
      height: introHeight
    });
  };

  var init = function() {
    navBar = $('.navbar');
    introContainer = $('.article-header');
    introImage = introContainer.find('img');

    scaleIntro();
  };

  return {
    init: init
  };
});