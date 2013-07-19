define([
  'lodash',
  'config'
], function(_, config) {

  var states = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out'
  };

  var playingSounds = {};

  var defaultOptions = {
    stepAmount: 0.02, // step amount
    fadeStepDelay: 20,
    volumeMax: 1,
    volumeMin: 0
  };
  var defaultFadeInOptions = _.extend(defaultOptions, {});
  var defaultFadeOutOptions = _.extend(defaultOptions, {});

  var fadeIn = function(sound, options) {
    options = _.extend(defaultFadeInOptions, options);
    options.stepAmount = Math.abs(options.stepAmount);

    playingSounds[sound.id] = sound;

    if (sound && !config.quiet) {

      sound.state = states.fadeIn;

      sound.volume = 0;

      if (sound.paused || sound.readyState == 4) {
        sound.play();
      }

      // The step function
      var _fadeIn = function(sound, options) {

        if (sound.state !== states.fadeIn) {
          return;
        }

        var vol = sound.volume;

        if (vol >= options.volumeMax) {
          sound.state = null;
          return;
        }

        sound.volume = Math.min(options.volumeMax, vol + options.stepAmount);

        sound.timer = setTimeout(function() {
          _fadeIn(sound, options);
        }, options.fadeStepDelay);
      };

      _fadeIn(sound, options);
    }
  };

  var fadeOut = function(sound, options) {

    options = _.extend(defaultFadeOutOptions, options);
    options.stepAmount = Math.abs(options.stepAmount);

    if (sound && !config.quiet) {
      sound.state = states.fadeOut;

      // The step function
      var _fadeOut = function(sound, options) {

        if (sound.state !== states.fadeOut) {
          return;
        }

        var vol = sound.volume;

        if (vol <= options.volumeMin) {
          sound.pause();
          sound.state = null;
          delete playingSounds[sound.id];
          return;
        }

        sound.volume = Math.max(options.volumeMin, vol - options.stepAmount);

        sound.timer = setTimeout(function() {
          _fadeOut(sound, options);
        }, options.fadeStepDelay);
      };

      _fadeOut(sound, options);
    }
  };

  var mute = function(){
    _.each(playingSounds, function(sound){
      sound.volume = defaultOptions.volumeMin;
      sound.pause();
      sound.state = null;
      delete playingSounds[sound.id];
    });
  };

  return {
    fadeIn: fadeIn,
    fadeOut: fadeOut,
    mute: mute
  };
});
