define(function() {

  // Defaults
  var config = {
    quiet: false,
    debug: false
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