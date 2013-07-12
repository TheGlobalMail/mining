define(function() {

  // Defaults
  var config = {
    // flags
    quiet: false,
    debug: false,
    debugEvents: false
  };

  // media off in IE10 for the moment, still buggy
  // blargh, see http://stackoverflow.com/questions/16135814/check-for-ie-10
  var isIE10 = false;
  /*@cc_on
    if (/^10/.test(@_jscript_version)) {
      isIE10 = true;
    }
  @*/

  if (isIE10) {
    document.documentElement.className += ' ie10';
  }

  var wideAndNotIE = window.innerWidth > 1300 &&
    document.documentElement.className.indexOf('ie8') == -1;

  if (wideAndNotIE && !window.location.href.match(/ambient=disable/i)){
    config.ambianceEnabled = true;
  }

  if (location.search.indexOf('quiet') != -1) {
    // Suppress sound playback
    config.quiet = true;
  }

  if (location.search.indexOf('debug') != -1) {
    // Verbose logging
    config.debug = true;
  }

  if (location.search.indexOf('events') != -1 || config.debug) {
    // Log event bindings and triggers with stack traces
    config.debugEvents = true;
  }

  return config;

});
