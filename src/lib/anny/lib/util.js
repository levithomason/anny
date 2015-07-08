var util = {
  /**
   * A hack that times all activation functions, logging the results.
   */
  findFastestActivation: function() {
    var epochs = 5000000;
    var results = [];
    var start;
    var ms;
    var x = Math.random() - 0.5;

    console.log('epochs:', epochs);
    console.log('value:', x);
    console.log('...this will take a while');

    for (var fn in anny.ACTIVATION) {
      start = new Date();
      _.times(epochs, function() {
        anny.ACTIVATION[fn](x);
      });
      ms = new Date() - start;
      var bar = _.repeat('=', Math.round(ms / (epochs / 250000)));

      results.push({
        bar: ['|' + bar + '>', ms, fn].join(' '),
        ms: ms
      });
    }

    // log results
    console.log('_______________ results in ms _______________');
    var sortedResults = _.sortBy(results, function(result) {
      return result.ms;
    });

    _.map(sortedResults, function(result) {
      return console.log(result.bar)
    });
  }
};

module.exports = util;
