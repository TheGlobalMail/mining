define([
  'events',
  'soundManager',
  'config'
], function(events, soundManager, config) {

  var AUDIO_ROOT = '/audio/';
  var AUDIO_FILES = {
    intro: AUDIO_ROOT + 'bulga-morning-birdcall-servo.mp3'
  };

  var loopSound = function(soundID) {
    setTimeout(function() {
      soundManager.play(
        soundID,
        {
          onfinish: function() {
            loopSound(soundID);
          }
        }
      );
    }, 1);
  };

  var initIntroAudio = function() {
    // Trigger load and play of intro sound
    soundManager.createSound({
      id: 'intro',
      url: AUDIO_FILES.intro,
      autoLoad: true,
      onload: function() {
        loopSound(this.id);
      }
    });
  };

  var soundManagerOnReady = function() {
    if (!config.quiet) {
      initIntroAudio();
    }
  };

  var init = function() {
    soundManager.setup({
      url: '/components/soundmanager/swf/soundmanager2.swf',
      onready: soundManagerOnReady,
      debugMode: config.debug
    });
  };

  return {
    init: init
  };
});