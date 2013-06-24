define([
  'soundManager'
], function(soundManager) {

  var fadeIn = function(soundID, amount) {
    var s = soundManager.getSoundById(soundID);
    if (!s) {
      return;
    }
    var vol = s.volume;
    if (vol === 100) {
      return;
    }
    if (amount < 0) {
      amount = amount * -1;
    }
    s.setVolume(Math.min(100, vol + amount));
    setTimeout(function() {
      fadeIn(soundID, amount)
    }, 20);
  };

  var fadeOut = function(soundID, amount) {
    var s = soundManager.getSoundById(soundID);
    if (!s) {
      return;
    }
    var vol = s.volume;
    if (vol === 0) {
      return;
    }
    if (amount > 0) {
      amount = amount * -1;
    }
    s.setVolume(Math.max(0, vol + amount));
    setTimeout(function(){
      fadeOut(soundID, amount)
    }, 20);
  };

  var loopSound = function(soundID) {
    setTimeout(function() {
      soundManager
        .play(soundID, {
          onfinish: function() {
            loopSound(soundID);
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