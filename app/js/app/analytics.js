define([
  'events'
], function(events) {

  var init = function() {
    // Log the page load
    window._gaq && _gaq.push(['_trackEvent', 'Page load']);

    // Log the user passing the fold
    events.on('scroll:exit:article-header', function() {
      window._gaq && _gaq.push(['_trackEvent', 'Read to', 'ID', 'The fold']);
    });

    // Log the user hitting each chapter
    var logged = [];
    _.each(_.range(1, 7), function(num) {
      events.on('scroll:enter:chapter' + num, function() {
        // Prevent multiple logs
        if (!_.contains(logged, num)) {
          logged.push(num);
          window._gaq && _gaq.push(['_trackEvent', 'Read to', 'ID', 'Chapter ' + num]);
        }
      });
    });

    // Log the user hitting the footer
    events.on('scroll:enter:footer', function() {
      window._gaq && _gaq.push(['_trackEvent', 'Read to', 'ID', 'The footer']);
    });
  };

  return {
    init: init
  };
});