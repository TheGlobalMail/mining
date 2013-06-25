define([
  'soundManager'
], function(soundManager) {

  var fadeIn = function(sound, amount, callback) {
    var vol = sound.volume;
    if (vol === 100) {
      if (callback) {
        callback();
      }
      return;
    }
    if (amount < 0) {
      amount = amount * -1;
    }
    sound.setVolume(Math.min(100, vol + amount));
    setTimeout(function() {
      fadeIn(sound, amount, callback)
    }, 20);
  };

  var fadeOut = function(sound, amount, callback) {
    var vol = sound.volume;
    if (vol === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    if (amount > 0) {
      amount = amount * -1;
    }
    sound.setVolume(Math.max(0, vol + amount));
    setTimeout(function() {
      fadeOut(sound, amount, callback)
    }, 20);
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