var util = {
  /**
   * Times all activation functions logging the results.
   * @returns {any|T|*}
   */
  findFastestActivation: function() {
    var cycles = '10,000,000';
    var fastest;
    var results = [];
    var start;
    var ms;
    var x = Math.random() - 0.5;

    console.log('cycles:', cycles);
    console.log('value:', x);
    console.log('----------------');

    for (var fn in activation) {
      start = new Date();
      _.times(cycles.replace(/,/g, ''), function() {
        activation[fn](x);
      });
      ms = new Date() - start;
      results.push({fn: fn, ms: ms});
      console.log(fn, ms + 'ms');
    }

    fastest = _.min(results, 'ms');
    console.log('----------------');
    console.debug(fastest.fn, ' @ ', fastest.ms + 'ms');
    return fastest;
  }
};
