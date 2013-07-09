define([
  'jquery',
  'lodash',
  'events',
  'easing',
  'scrollTo'
], function($, _, events) {
  var chapter1;
  var chapter2;
  var chapter3;
  var chapter4;
  var chapter5;
  var chapter6;
  var chapterButtonText;

  var buttonText = 'Chapter {0} of 6';

  // Scroll to the correct chapter
  var setChapterNavBindings = function() {
    $('.chapters a').on('click', function(e){
      e.preventDefault();
      var options = {
        duration: 2000,
        easing: 'easeInOutCubic'
      };
      $.scrollTo($(this).attr('href'), options);
    });
  };

  var setChapterNumberBindings = function() {
    events.on('scroll:enter:chapter1', function() {
      chapterButtonText.text(buttonText.replace('{0}', 1))
    });
    events.on('scroll:enter:chapter2', function() {
      chapterButtonText.text(buttonText.replace('{0}', 2))
    });
    events.on('scroll:enter:chapter3', function() {
      chapterButtonText.text(buttonText.replace('{0}', 3))
    });
    events.on('scroll:enter:chapter4', function() {
      chapterButtonText.text(buttonText.replace('{0}', 4))
    });
    events.on('scroll:enter:chapter5', function() {
      chapterButtonText.text(buttonText.replace('{0}', 5))
    });
    events.on('scroll:enter:chapter6', function() {
      chapterButtonText.text(buttonText.replace('{0}', 6))
    });
  };

  var init = function() {
    chapterButtonText = $('.chapters .button-text');

    chapter1 = $('#chapter1');
    chapter2 = $('#chapter2');
    chapter3 = $('#chapter3');
    chapter4 = $('#chapter4');
    chapter5 = $('#chapter5');
    chapter6 = $('#chapter6');

    setChapterNavBindings();
    setChapterNumberBindings();
  };

  return {
    init: init
  };
});
