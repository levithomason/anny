var data2048Scaled = _(data2048)
  .pluck('data')
  .flatten()
  .thru(function(turns) {
    // find largest tile
    var largestTile = _.max(_.flatten(_.pluck(turns, 'input')));

    // scale inputs to (-1, +1) by largest tile
    return turns.map(function(turn) {
      turn.input = anny.util.normalize(turn.input, 0, largestTile);
      return turn;
    });
  })
  .shuffle()
  .value();

// console.log(data2048Scaled);

var dataBreakPoint = Math.floor(data2048Scaled.length * 0.9);
var data2048ScaledTraining = _.slice(data2048Scaled, 0, dataBreakPoint);
var data2048ScaledTest = _.slice(data2048Scaled, dataBreakPoint, data2048Scaled.length);
