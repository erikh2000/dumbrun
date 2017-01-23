import GrammarRules from './../grammarRules';

class MainHandler {
  constructor() {
    this.grammarRules = new GrammarRules([
      ['commands',  this._onCommands.bind(this),  ['come', 'come in', 'command', 'commit', 'man', 'man\'s', 'men\'s'] ],
      ['distance',  this._onDistance.bind(this),  ['just','missed','mr.','this','vista'] ],
      ['off',       this._onOff.bind(this),       [] ],
      ['pace',      this._onPace.bind(this),      ['ace','bass','face','hey','pay','pays','pet','text'] ],
      ['split',     this._onSplit.bind(this),     ['sweat','what'] ],
      ['start',     this._onStart.bind(this),     ['star','stir'] ],
      ['stop',      this._onStop.bind(this),      ['stuff','stuffed'] ],
      ['time',      this._onTime.bind(this),      ['thai'] ],
    ]);
  }

  findMatch(against) {
    return this.grammarRules.findMatch(against);
  }

  _onCommands() {
    console.log('Available commands: start, stop, time, distance, pace, split, off, and commands.');
  }

  _onDistance() {
    console.log('Distance travelled: X miles');
  }

  _onOff() {
    console.log('Speech recognition off. Use app interface to turn back on.');
  }

  _onPace() {
    console.log('Current pace is X minutes Y seconds per mile.');
  }

  _onSplit() {
    console.log('Overall split pace is X minutes Y seconds per mile.');
  }

  _onStart() {
    console.log('Timer started. Say \"stop\" when you wish to pause or complete your run.');
  }

  _onStop() {
    console.log('Timer stopped. Say \"start\" to resume or \"complete\" to end your run.');
  }

  _onTime() {
    console.log('X minutes Y seconds since started. Current time is X:YY AM.');
  }
}

export default MainHandler;
