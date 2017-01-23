class GrammarRules {
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
      let [key, callback, aliases] = rule;
      if (ret[key] !== undefined) {
        console.warning('Overwriting already-defined match for key \"' + key + '\".');
      }
      ret[key] = callback;
      for (let alias of aliases) {
        if (ret[alias] !== undefined) {
          console.warning('Overwriting already-defined match for alias \"' + alias +
              '\" to use callback from ' + key + '.');
        }
        ret[alias] = callback;
      }
    }
    return ret;
  }
}

export default GrammarRules;
