angular.module('App', [
  'anny',

  'App.vis',
  'App.toolbar'
]);

angular.module('anny', []);

angular.module('App.vis', []);

angular.module('App.toolbar', []);

function AnnyFactory($rootScope) {
  var factory = {};

  factory.init = function() {
    factory.newNetwork([2, 2, 1]);
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.getRandomLayers = function() {
    var inputs = 2;
    var outputs = 1;
    var numHiddenLayers = _.random(1, 4);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(3, 8));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.train = function(trainingSet, callback, frequency) {
    factory.network.train(trainingSet, callback, frequency);

    var results = ['Predictions after training:'];

    _.each(trainingSet, function(sample) {
      var input = sample.input;
      var output = factory.network.activate(input);
      results.push(
        '[' + input.toString() + '] == ' + (output >= 0.5) + ' ' + output
      );
    });

    console.log(results.join('\n'));

    factory.emitChange();
  };

  factory.newNetwork = function(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers());
    factory.emitChange();
  };

  factory.emitChange = function() {
    $rootScope.$broadcast('anny:changed');
    window.network = factory.network;
  };

  factory.init();

  return factory;
}
AnnyFactory.$inject = ["$rootScope"];

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);

function visNetworkOptions() {
  var options = {};

  // Nodes
  options.nodes = {
    borderWidth: 0.1,
    borderWidthSelected: 0.1,
    shape: 'dot',
    scaling: {
      min: 5,
      max: 15
    },
    font: {
      color: '#777',
      size: 12,
      face: 'Lato'
    },
    labelHighlightBold: true,
    mass: 1
  };

  // Groups
  options.groups = {
    normal: {
      color: {
        border: 'hsl(210, 20%, 25%)',
        background: 'hsl(210, 80%, 80%)',
        hover: {
          border: 'hsl(210, 35%, 45%)',
          background: 'hsl(210, 80%, 80%)'
        },
        highlight: {
          border: 'hsl(210, 60%, 70%)',
          background: 'hsl(210, 80%, 80%)'
        }
      }
    },
    bias: {
      borderWidth: 2,
      borderWidthSelected: 2,
      color: {
        border: 'hsl(0, 0%, 40%)',
        background: 'transparent',
        hover: {
          border: 'hsl(0, 0%, 60%)',
          background: 'transparent'
        },
        highlight: {
          border: 'hsl(0, 0%, 80%)',
          background: 'transparent'
        }
      }
    }
  };

  // Edges
  options.edges = {
    smooth: {
      enabled: false, // faster rendering
      type: 'dynamic',
      roundness: 0.5
    },
    scaling: {
      min: 0.5,
      max: 8
    },
    hoverWidth: 1,
    selectionWidth: 1.5
  };

  // Layout
  options.layout = {
    hierarchical: {
      direction: 'LR'
    }
  };

  // Interaction
  options.interaction = {
    hover: true,
    tooltipDelay: 150
  };

  // Physics
  options.physics = {
    enabled: true,
    hierarchicalRepulsion: {
      centralGravity: 0,
      springLength: 50,
      springConstant: 0.002,
      nodeDistance: 80,
      damping: 0.4
    },
    maxVelocity: 50,
    minVelocity: 0.1,
    stabilization: {
      enabled: true,
      iterations: 0,
      updateInterval: 0,
      onlyDynamicEdges: false,
      fit: true
    },
    timestep: 0.5
  };

  return options;
}

angular.module('App.vis')
  .factory('visNetworkOptions', visNetworkOptions);

function visNetwork(visNetworkOptions, AnnyFactory, $rootScope) {
  return {
    replace: true,
    scope: {},
    template: '<div class="vis-network"></div>',
    link: function(scope, elm) {
      scope.getData = function() {
        var nodes = [];
        var edges = [];

        // layers
        _.each(AnnyFactory.network.allLayers, function(layer, layerIndex) {
          // neurons
          _.each(layer.neurons, function(neuron) {
            var id = neuron.id;
            var input = neuron.input.toFixed(3);
            var output = neuron.output.toFixed(3);
            var delta = neuron.delta.toFixed(6);
            var error = neuron.error.toFixed(3);

            nodes.push({
              id: id,
              title: [
                '<b>id:</b> ', id, '<br/>',
                '<b>delta:</b> ', delta, '<br/>'
              ].join(''),
              level: layerIndex,
              label: (neuron.isInput() ? [
                  '\no:', output
                ] : neuron.isOutput() ? [
                  '\ni:', input,
                  '\no:', output,
                  '\ne:', error
                ] : neuron.isBias ? [
                  '\no:', output
                ] : /* hidden layer */ [
                  '\ni:', input,
                  '\no:', output
                ]
              ).join(' '),
              value: Math.abs(output),
              group: neuron.isBias ? 'bias' : 'normal'
            });

            // connections
            _.each(neuron.outgoing, function(connection) {
              var weight = connection.weight.toFixed(3);

              edges.push({
                from: connection.source.id,
                to: connection.target.id,
                value: Math.abs(weight),
                title: 'weight: ' + weight,
                // matches border colors in network options factory
                color: {
                  color: weight >= 0 ? 'hsl(210, 20%, 25%)' :
                    'hsl(30, 15%, 25%)',
                  hover: weight >= 0 ? 'hsl(210, 35%, 45%)' :
                    'hsl(30, 40%, 40%)',
                  highlight: weight >= 0 ? 'hsl(210, 60%, 70%)' :
                    'hsl(30, 60%, 60%)'
                }
              });
            });
          });
        });

        return {
          nodes: new vis.DataSet(nodes),
          edges: new vis.DataSet(edges)
        };
      };

      // causes a refresh of the network graph
      scope.setData = function() {
        scope.network.setData(scope.getData());
      };

      $rootScope.$on('anny:changed', function() {
        scope.setData();
      });

      // create network
      scope.network =
        new vis.Network(elm[0], scope.getData(), visNetworkOptions);
    }
  };
}
visNetwork.$inject = ["visNetworkOptions", "AnnyFactory", "$rootScope"];

angular.module('App.vis')
  .directive('visNetwork', visNetwork);

angular.module('App.toolbar')

  .directive('toolbar', ["AnnyFactory", function(AnnyFactory) {
    return {
      replace: true,
      scope: {},
      templateUrl: 'app/dist/components/toolbar/toolbar.html',
      link: function(scope) {
        scope.resetNet = function() {
          AnnyFactory.init();
        };

        scope.randomNet = function() {
          AnnyFactory.newNetwork();
        };

        scope.activateRandom = function() {
          var inputs = [];

          _.times(AnnyFactory.network.inputLayer.neurons.length, function() {
            inputs.push(_.random(-1, 1, true));
          });

          AnnyFactory.activate(inputs);
        };

        scope.trainORGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [1]}
          ]);
        };

        scope.trainXORGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [0]}
          ]);
        };

        scope.trainANDGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [0]},
            {input: [1, 0], output: [0]},
            {input: [1, 1], output: [1]}
          ]);
        };

        scope.trainNANDGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [1]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [0]}
          ]);
        };
      }
    };
  }]);
