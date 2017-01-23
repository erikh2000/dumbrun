const BUF_SIZE = 1024;

class MicBuffer {

    constructor() {
      this.analyzerNode = null;
      this.audioContext = new AudioContext();
      this.gainNode = null;
      this.isInitialized = false;
      this.microphoneStream = null;
      this.scriptProcessorNode = null;
      this.scriptProcessorFftNode = null;

      if (!navigator.getUserMedia) {
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      }
      if (!navigator.getUserMedia) {
          console.error('Browser doesn\'t implement getUserMedia.');
          return;
      }

      this.isInitialized = true;
    }

    start() {
        if (!this.isInitialized) {
            return;
        }

        var that = this;
        navigator.getUserMedia({
            audio: true
        }, function(stream) {
            that.startMicrophone(stream);
        }, function(e) {
            alert('Error capturing audio.');
        });
    }

    processMicrophoneBuffer(event) {
        var microphoneOutputBuffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now
        var rms = this.calcRmsForBuffer(microphoneOutputBuffer);
        console.log(' rms=' + rms);
    }

    calcRmsForBuffer(channelData) {
      if (channelData.length === 0) {
        return 0;
      }
      console.log('l=' + channelData.length);
      var rmsTotal = channelData.reduce(function(total, sample) {
        if (sample > 0) { console.log('s=' + sample); }
        return total + (sample * sample) + 1;
      }, 0);
      return Math.sqrt(rmsTotal / channelData.length);
    }

    startMicrophone(stream) {

      this.gainNode = this.audioContext.createGain();

      // Create an AudioNode from the stream.
      this.microphoneStream = this.audioContext.createMediaStreamSource(stream);
      this.microphoneStream.connect(this.gainNode);

      this.scriptProcessorNode = this.audioContext.createScriptProcessor(BUF_SIZE, 1, 1);
      this.scriptProcessorNode.onaudioprocess = this.processMicrophoneBuffer.bind(this);
      this.scriptProcessorNode.connect(this.gainNode);

      var zeroGain = this.audioContext.createGain();
      zeroGain.gain.value = 0.0;
      this.gainNode.connect( zeroGain );
      zeroGain.connect(this.audioContext.destination );
    }
}

export default MicBuffer;
