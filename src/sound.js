/**
 * BrevisJS
 * @id sound.js
 *     sound Web Audio API class
 * @author Zendrael
 * @date 19/07/2017
 */

/* Example
som = new Sound("snd/sfx_woop");
som.play();
*/
try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  window.audioContext = new window.AudioContext();
  isWebAudioAPIEnabled = true;
} catch (e) {
  isWebAudioAPIEnabled = false;
  console.log("No Web Audio API support");
}

/*
 * WebAudioAPISoundManager Constructor
 */
var WebAudioAPISoundManager = function(context) {
  this.context = context;
  this.bufferList = {};
  this.playingSounds = {};
};

/*
 * WebAudioAPISoundManager Prototype
 */
WebAudioAPISoundManager.prototype = {
  addSound: function(url) {
    if (isWebAudioAPIEnabled) {
      // Load buffer asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      var self = this;

      request.onload = function() {
        //console.log('loaded!');
        // Asynchronously decode the audio file data in request.response
        self.context.decodeAudioData(request.response,
          function(buffer) {
            if (!buffer) {
              console.error('Error decoding file data: ' + url);
              return;
            }
            self.bufferList[url] = buffer;
            //loaded!
            $.assetLoaded();
          },
          function(e) {
            console.error('Error with decoding audio data: ' + e.err);
          });
      };

      request.onerror = function() {
        alert('BufferLoader: XHR error');
      };

      request.send();
    } else {
      //traditional audio
      var audio = new Audio();
      //check which type is supported
      //For firefox and others who do not support .mp3
      if (audio.canPlayType('audio/ogg') === true) {
        audioType = 'ogg';
      } else {
        audioType = 'mp3';
      }

      audio.setAttribute('type', 'audio/' + audioType);
      audio.setAttribute('src', url.replace('.mp3', '.' + audioType)); // + "." + audioType);

      audio.addEventListener('canplaythrough', function() {
        console.log('loaded ' + url);
        //loaded!
        Config.assetLoaded();
      }, false);

      //console.log(this.assets.sounds[i] + "." + audioType);
      //this.soundAssets.push(audio);
      //index by sound name WITHOUT extension
      //this.soundAssets[ this.assets.sounds[i] ] = audio;
      this.bufferList[url.split('/').pop()] = audio;
    }
  },
  stopSoundWithUrl: function(url) {
    if (this.playingSounds.hasOwnProperty(url)) {
      for (var i in this.playingSounds[url]) {
        if (this.playingSounds[url].hasOwnProperty(i))
          this.playingSounds[url][i].noteOff(0);
      }
    }
  }
};

/*
 * Sound Constructor
 */
var Sound = function(url, options) {
  this.settings = {
    loop: false
  };

  for (var i in options) {
    if (options.hasOwnProperty(i))
      this.settings[i] = options[i];
  }

  //if (isWebAudioAPIEnabled) {
  this.url = url + '.wav';

  window.webAudioAPISoundManager = window.webAudioAPISoundManager || new WebAudioAPISoundManager(window.audioContext);

  this.manager = window.webAudioAPISoundManager;
  this.manager.addSound(this.url);
  //} else {
  //
  //console.log('Web Audio not supported!');
  //}
};

/*
 * Sound Prototype
 */
Sound.prototype = {
  play: function() {
    if (isWebAudioAPIEnabled) {
      var buffer = this.manager.bufferList[this.url];
      //Only play if it's loaded yet
      if (typeof buffer !== "undefined") {
        var source = this.makeSource(buffer);
        source.loop = this.settings.loop;
        //source.noteOn(0);
        source.start(0);

        if (!this.manager.playingSounds.hasOwnProperty(this.url))
          this.manager.playingSounds[this.url] = [];
        this.manager.playingSounds[this.url].push(source);
      }
    } else {
      console.log('URL : ' + this.url);
      console.log('BUFF: ' + this.url.split('/').pop());
      this.manager.bufferList[this.url.split('/').pop()].play();
    }
  },

  stop: function() {
    if (isWebAudioAPIEnabled) {
      this.manager.stopSoundWithUrl(this.url);
    } else {
      this.manager.bufferList[this.url.split('/').pop()].stop();
    }
  },

  getVolume: function() {
    return this.translateVolume(this.volume, true);
  },

  //Expect to receive in range 0-100
  setVolume: function(volume) {
    this.volume = this.translateVolume(volume);
  },

  translateVolume: function(volume, inverse) {
    return inverse ? volume * 100 : volume / 100;
  },

  makeSource: function(buffer) {
    var source = this.manager.context.createBufferSource();
    //var gainNode = this.manager.context.createGainNode();
    var gainNode = this.manager.context.createGain();
    //gainNode.gain.value = this.volume;
    gainNode.gain.value = 1.0; //this.volume ? this.volume : 0.5;
    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(this.manager.context.destination);
    return source;
  }
};
//eof
