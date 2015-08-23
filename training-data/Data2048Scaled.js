var data2048Scaled = _.map(data2048, function(game) {
  return _.map(game.data, function(move) {
    var grid = move.input;
    var direction = move.output;
    return {
      input: move.input,
      output: move.output
    };
  });
});

// shuffle the dataset
data2048Scaled = _.shuffle(data2048Scaled);

var dataBreakPoint = Math.floor(data2048Scaled.length * 0.9);

var data2048ScaledTraining = _.slice(data2048Scaled, 0, dataBreakPoint);
var data2048ScaledTest = _.slice(data2048Scaled, dataBreakPoint, data2048Scaled.length);
