define([
  'lodash',
  'config'
], function(_, config) {

  var fadeStepDelay = 20;
  var volumeMax = 100;
  var volumeMin = 0;

  var fadeTimeouts = [];

  var defaultFadeInOptions = {
    amount: 2, // step amount, % percentage increase per step
    complete: null // callback
  };

  var defaultFadeOutOptions = {
    amount: 2, // step amount, % percentage decrease per step
    complete: null // callback
  };

  var clearFadeTimeouts = function() {
    _.each(fadeTimeouts, function(id) {
      console.log(clearTimeout(id));
    });
    fadeTimeouts = [];
  };

  var fadeIn = function(sound, options) {
    clearFadeTimeouts();

//    console.log('fade in', +new Date);
    options = _.extend(defaultFadeInOptions, options);
    options.amount = Math.abs(options.amount);

    sound.setVolume(0).play();

    if (config.quiet) {
      return;
    }

    // The step function
    var _fadeIn = function(sound, options) {
      var vol = sound.volume;

      if (vol >= volumeMax) {
        if (options.complete) {
          options.complete();
        }
        return;
      }

      sound.setVolume(Math.min(volumeMax, vol + options.amount));

      var timeoutID = setTimeout(function() {
        _fadeIn(sound, options);
      }, fadeStepDelay);
      fadeTimeouts.push(timeoutID);
    };

    _fadeIn(sound, options);
  };

  var fadeOut = function(sound, options) {
    clearFadeTimeouts();

//    console.log('fade out', +new Date);
    options = _.extend(defaultFadeOutOptions, options);
    options.amount = Math.abs(options.amount);

    if (config.quiet) {
      return;
    }

    // The step function
    var _fadeOut = function(sound, options) {
      var vol = sound.volume;

      if (vol <= volumeMin) {
        sound.pause();
        if (options.complete) {
          options.complete();
        }
        return;
      }

      sound.setVolume(Math.max(volumeMin, vol - options.amount));

      var timeoutID = setTimeout(function() {
        _fadeOut(sound, options);
      }, fadeStepDelay);
      fadeTimeouts.push(timeoutID);
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