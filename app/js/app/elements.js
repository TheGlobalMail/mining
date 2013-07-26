define([
  'jquery'
], function($) {

  var init = function() {
    $('a[data-return-to-main]').on('click', function(e){
      e.preventDefault();
      var options = {
        duration: 2000,
        easing: 'easeInOutCubic'
      };
      $.scrollTo('#main', options);
    });

    $('#story-kickoff').on('click', function(e){
      e.preventDefault();
      var options = {
        duration: 700,
        easing: 'easeInOutCubic'
      };
      $.scrollTo('#chapter1', options);
      window._gaq && _gaq.push(['_trackEvent', 'Click', 'ID', 'Story kickoff arrow']);
    });
  };

  return {
    init: init
  };
});