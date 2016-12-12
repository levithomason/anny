function AnnyFactory($rootScope) {
  var factory = {}

  factory.init = function init() {
    factory.newNetwork([new anny.Layer(2), new anny.Layer(1)])
    factory.trainer = new anny.Trainer()
  }

  factory.activate = function(inputs) {
    factory.network.activate(inputs)
    factory.emitChange()
  }

  factory.data = anny.DATA

  factory.getRandomLayers = function getRandomLayers() {
    var layers = [new anny.Layer(2)]

    _.times(_.random(1, 3), function createHiddenLayer() {
      layers.push(new anny.Layer(_.random(3, 5)))
    })

    layers.push(new anny.Layer(1))

    return layers
  }

  factory.train = function(trainingSet) {
    var results = ['Predictions after training:']
    factory.trainer.train(factory.network, trainingSet)

    _.each(trainingSet, function(sample) {
      var input = sample.input
      var output = factory.network.activate(input)
      results.push(
        '[' + input.toString() + '] == ' + (output >= 0.5) + ' ' + output
      )
    })

    /* eslint-disable no-console */
    console.log(results.join('\n'))
    /* eslint-enable no-console */

    factory.emitChange()
  }

  factory.newNetwork = function newNetwork(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers())
    factory.emitChange()
  }

  factory.emitChange = function emitChange() {
    $rootScope.$broadcast('anny:changed')
    window.network = factory.network
  }

  factory.init()

  return factory
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory)
