define([
  'lodash',
  'config'
], function(_, config) {

  var states = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out'
  };

  var defaultOptions = {
    amount: 2, // step amount, % percentage increase per step
    complete: null, // callback
    fadeStepDelay: 20,
    volumeMax: 100,
    volumeMin: 0
  };
  var defaultFadeInOptions = _.extend(defaultOptions, {});
  var defaultFadeOutOptions = _.extend(defaultOptions, {});

  var fadeIn = function(sound, options) {
    options = _.extend(defaultFadeInOptions, options);
    options.amount = Math.abs(options.amount);

    if (sound && !config.quiet) {

      sound.state = states.fadeIn;

      sound.setVolume(0);

      if (sound.paused || sound.playState == 0) {
        sound.play();
      }

      // The step function
      var _fadeIn = function(sound, options) {
        if (sound.state !== states.fadeIn) {
          return;
        }

        var vol = sound.volume;

        if (vol >= options.volumeMax) {
          if (options.complete) {
            options.complete();
          }
          return;
        }

        sound.setVolume(Math.min(options.volumeMax, vol + options.amount));

        setTimeout(function() {
          _fadeIn(sound, options);
        }, options.fadeStepDelay);
      };

      _fadeIn(sound, options);
    }
  };

  var fadeOut = function(sound, options) {

    options = _.extend(defaultFadeOutOptions, options);
    options.amount = Math.abs(options.amount);

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
          if (options.complete) {
            options.complete();
          }
          return;
        }

        sound.setVolume(Math.max(options.volumeMin, vol - options.amount));

        setTimeout(function() {
          _fadeOut(sound, options);
        }, options.fadeStepDelay);
      };

      _fadeOut(sound, options);
    }
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