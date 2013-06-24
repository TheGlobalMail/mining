define(function() {

  // Defaults
  var config = {
    // flags
    quiet: false,
    debug: false,
    // variables
    enterViewportEvent: 'scroll/enter/',
    exitViewportEvent: 'scroll/exit/'
  };

  if (location.search.indexOf('quiet') != -1) {
    // Suppress sound playback
    config.quiet = true;
  }

  if (location.search.indexOf('debug') != -1) {
    // Verbose logging
    config.debug = true;
  }

  return config

});