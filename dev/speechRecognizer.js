import GrammarRules from './grammarRules';

class SpeechRecognizer {

    constructor(grammarRules) {
      this.grammarRules = grammarRules;
      this.isRestarting = false;
      this.recognizing = false;

      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      //Event handlers
      this.recognition.onaudiostart = this._logEvent;
      this.recognition.onsoundstart = this._logEvent;
      this.recognition.onspeechstart = this._logEvent;
      this.recognition.onsoundend = this._logEvent;
      this.recognition.onaudioend = this._logEvent;
      this.recognition.onnomatch = this._logEvent;
      this.recognition.onerror = this._logEvent;
      this.recognition.onstart = this._logEvent;
      this.recognition.onend = this._onEnd.bind(this);
      this.recognition.onresult = this._onResult.bind(this);
    }

    setGrammarRules(newGrammarRules) {
        this.grammarRules = newGrammarRules;
    }

    start() {
        this.recognition.start();
        this.recognizing = true;
    }

    stop() {
      this.recognition.stop();
      this.recognizing = false;
    }

    _onEnd(event) {
      this._logEvent(event);
      this.recognizing = false;
      if (this.isRestarting) {
        this.start();
      }
    }

    _onResult(event) {
      this._logEvent(event);
      if (!this.startRecognitionTime) this.startRecognitionTime = performance.now();
      for (let result of event.results) {
        for (let alternative of result) {
          let transcript = alternative.transcript.trim(), onMatch = this.grammarRules.findMatch(transcript);
          if (onMatch) {
            this._restartRecognition();
            onMatch();
            return;
          } else {
            console.log('         rejected \"' + transcript + '\"');
          }
        }
      }
    }

    _restartRecognition() {
      this.isRestarting = true;
      this.recognizing = false;
      this.recognition.abort();
    }

    _logEvent(event) {
      console.log('***EVENT ' + event.type + '***');
    }
}

export default SpeechRecognizer;
