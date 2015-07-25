var ACTIVATION = require('./Activation');

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

    _.each(ACTIVATION, function(fn) {
      start = new Date();
      _.times(epochs, function() {
        ACTIVATION[fn](x);
      });
      ms = new Date() - start;
      var bar = _.repeat('=', Math.round(ms / (epochs / 250000)));

      results.push({
        bar: ['|' + bar + '>', ms, fn].join(' '),
        ms: ms
      });
    });

    // log results
    console.log('_______________ results in ms _______________');

    _.each(_.sortBy(results, 'ms'), function(result) {
      console.log(result.bar);
    });
  }
};

module.exports = util;
