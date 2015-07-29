angular.module('App', [
  'anny',

  'App.vis',
  'App.toolbar'
]);

var targetOutput = 1;
var cycles = 100;
var a = new anny.Neuron();
var b = new anny.Neuron();
a.connect(b);
a.learningRate = b.learningRate = 0.1;

console.log('app.js: Learning to output', targetOutput);
_.times(cycles, function(n) {
  var aOut = a.activate(1).toFixed(6);
  var bOut = b.activate().toFixed(6);
  b.error = (targetOutput - b.output).toFixed(6);
  if (n % (cycles / 10 ) === 0) {
    console.log(
      '[' + n + '] ' +
      'a(' + aOut +
      ') <-(' + a.outgoing[0].weight.toFixed(6) +
      ')-> b(' + bOut +
      ') = e ' + b.error
    );
  }
  a.correct();
});
