define([
  'lodash',
  'jquery'
], function(_, $) {

  var navBar;
  var introContainer;
  var introImage;

  var scaleIntro = function() {
    var introHeight = window.innerHeight - navBar.height() - (introContainer.outerHeight() - introContainer.height());
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