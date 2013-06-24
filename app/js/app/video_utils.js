define(function() {

//  var fadeIn = function(video, amount) {
//    var vol = video.volume();
//    if (vol === 100) {
//      return;
//    }
//    if (amount < 0) {
//      amount = amount * -1;
//    }
//    video.volume(Math.min(100, vol + amount));
//    setTimeout(function() {
//      fadeIn(video, amount)
//    }, 20);
//  };
//
//  var fadeOut = function(video, amount) {
//    var vol = video.volume();
//    if (vol === 0) {
//      return;
//    }
//    if (amount > 0) {
//      amount = amount * -1;
//    }
//    video.volume(Math.max(0, vol + amount));
//    setTimeout(function() {
//      fadeOut(video, amount)
//    }, 20);
//  };

//  var fadeOut = function(soundID, amount) {
//    var s = soundManager.getSoundById(soundID);
//    if (!s) {
//      return;
//    }
//    var vol = s.volume;
//    if (vol === 0) {
//      return;
//    }
//    if (amount > 0) {
//      amount = amount * -1;
//    }
//    s.setVolume(Math.max(0, vol + amount));
//    setTimeout(function(){
//      fadeOut(soundID,amount)
//    }, 20);
//  };

  return {
//    fadeIn: fadeIn,
//    fadeOut: fadeOut
  };
});