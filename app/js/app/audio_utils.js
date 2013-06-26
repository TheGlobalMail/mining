define([
  'lodash',
  'config'
], function(_, config) {

  var fadeStepDelay = 20;
  var volumeMax = 100;
  var volumeMin = 0;

  var states = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out'
  };

  var defaultOptions = {
    amount: 2, // step amount, % percentage increase per step
    complete: null // callback
  };
  var defaultFadeInOptions = _.extend(defaultOptions, {});
  var defaultFadeOutOptions = _.extend(defaultOptions, {});

  var fadeIn = function(sound, options) {
    if (!sound) {
      return;
    }

    sound.state = states.fadeIn;

    options = _.extend(defaultFadeInOptions, options);
    options.amount = Math.abs(options.amount);

    sound.setVolume(0);

    if (sound.paused || sound.playState == 0) {
      sound.play();
    }

    if (config.quiet) {
      return;
    }

    // The step function
    var _fadeIn = function(sound, options) {
      if (sound.state !== states.fadeIn) {
        return;
      }

      var vol = sound.volume;

      if (vol >= volumeMax) {
        if (options.complete) {
          options.complete();
        }
        return;
      }

      sound.setVolume(Math.min(volumeMax, vol + options.amount));

      setTimeout(function() {
        _fadeIn(sound, options);
      }, fadeStepDelay);
    };

    _fadeIn(sound, options);
  };

  var fadeOut = function(sound, options) {
    if (!sound) {
      return;
    }

    sound.state = states.fadeOut;

    options = _.extend(defaultFadeOutOptions, options);
    options.amount = Math.abs(options.amount);

    if (config.quiet) {
      return;
    }

    // The step function
    var _fadeOut = function(sound, options) {
      if (sound.state !== states.fadeOut) {
        return;
      }

      var vol = sound.volume;

      if (vol <= volumeMin) {
        sound.pause();
        if (options.complete) {
          options.complete();
        }
        return;
      }

      sound.setVolume(Math.max(volumeMin, vol - options.amount));

      setTimeout(function() {
        _fadeOut(sound, options);
      }, fadeStepDelay);
    };

    _fadeOut(sound, options);
  };

  var loopSound = function(sound) {
    setTimeout(function() {
      sound.play({
        onfinish: function() {
          loopSound(sound);
        }
      });
    }, 1);
  };

  return {
    fadeIn: fadeIn,
    fadeOut: fadeOut,
    loopSound: loopSound
  };
});