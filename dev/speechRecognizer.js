import GrammarRules from './grammarRules';

class SpeechRecognizer {

    constructor(onMatch) {
      this.grammarRules = new GrammarRules([
        ['distance',  'just','missed','mr.','this','vista'],
        ['no',        'nah','not'],
        ['off'],
        ['pace',      'ace','bass','face','hey','pay','pays','pet','text'],
        ['pause',     'bus','boss','buzz','hot','pass','paw','paws','pots','spas'],
        ['split',     'sweat','what'],
        ['start',     'star','stir'],
        ['stop',      'stuff','stuffed'],
        ['time',      'thai'],
        ['where'],
        ['yes']
      ]);
      this.isRestarting = false;
      this.recognizing = false;
      this.startRecognitionTime = null;
      this.onMatch = onMatch;

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
          let transcript = alternative.transcript.trim(), match = this.grammarRules.findMatch(transcript);
          if (match) {
            this.onMatch(match);
            let elapsed = (performance.now() - this.startRecognitionTime);
            if (match !== transcript) {
              console.log(match + ' from \"' + transcript + '\" after ' + elapsed);
            } else {
              console.log(match + ' after ' + elapsed);
            }
            this.startRecognitionTime = null;
            this._restartRecognition();
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
