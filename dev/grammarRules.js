class GrammarRules {
  /* initRules param is like:
    [
      ['pace', 'face', 'bass', 'pays'],
      ['start', 'star'],
      ['time', 'thai'],
      ['go']
    ]
  */
  constructor(initRules) {
    this.grammarLookup = this._buildGrammarLookup(initRules);
  }

  findMatch(against) {
    if (!against) return undefined;
    var key = against.trim().toLowerCase();
    return (this.grammarLookup[key]);
  }

  _buildGrammarLookup(initRules) {
    var ret = {};
    for(let rule of initRules) {
      //First match in rule is the final value to which any aliases (2nd or
      //subsequent match elements) will resolve.
      let finalMatch = rule[0];
      for (let match of rule) {
        if (ret[match] !== undefined) {
          console.warning('Overwriting already-defined match for \"' + match +
              '\" to resolve to \"' + finalMatch + '\".');
        }
        ret[match] = finalMatch;
      }
    }
    return ret;
  }
}

export default GrammarRules;
