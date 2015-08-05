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

angular.module('anny', []);

angular.module('App.toolbar', []);

angular.module('App.vis', []);

function AnnyFactory($rootScope) {


  var the_network = new anny.Network([2, 2, 1]);
  var trainingSet = [];

  _.times(100, function (n) {
      console.log('asdf');
      var result = the_network.train([
          {input: [1, 2], output: [-3]}
      ]);
  });

  var output = the_network.activate([1, 2]);

  console.log(output);



  var factory = {};

  factory.init = function() {
    //factory.network = new anny.Network(factory.getRandomLayers());
    factory.network = window.network = the_network;
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.getRandomLayers = function() {
    var inputs = 1;
    var outputs = 1;
    var numHiddenLayers = _.random(0, 2);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(2, 4));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.train = function(trainingSet, logFrequency) {
    factory.network.train(trainingSet, logFrequency, function(i, error) {
      console.log('Network training', i, 'error', error);
    });

    factory.emitChange();
  };

  factory.newNetwork = function(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers());
    factory.emitChange();
  };

  factory.emitChange = function() {
    $rootScope.$broadcast('anny:changed');
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
    gate: {
      color: {
        border: 'hsl(30, 15%, 25%)',
        background: 'hsl(30, 100%, 70%)',
        hover: {
          border: 'hsl(30, 40%, 40%)',
          background: 'hsl(30, 100%, 70%)'
        },
        highlight: {
          border: 'hsl(30, 60%, 60%)',
          background: 'hsl(30, 100%, 70%)'
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
      min: 0.2,
      max: 4
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

angular.module('App.toolbar')

  .directive('toolbar', ["AnnyFactory", function(AnnyFactory) {
    return {
      replace: true,
      scope: {},
      templateUrl: 'app/dist/components/toolbar/toolbar.html',
      link: function(scope) {
        scope.randomNet = function() {
          AnnyFactory.newNetwork();
        };

        scope.activateRandom = function() {
          var inputs = [];

          _.times(AnnyFactory.network.inputLayer.neurons.length, function() {
            inputs.push(_.random(true));
          });

          AnnyFactory.activate(inputs);
        };

        scope.train = function() {
          var numSamples = 1000;
          var logFrequency = _.floor(numSamples / 10);

          var trainingSet = _.times(numSamples, function() {
            // learn to add 1
            var n = _.random(-1, 1, true);
            return {input: [n], output: [n + 1]};
          });

          AnnyFactory.train(trainingSet, logFrequency);
        };
      }
    };
  }]);

function visNetwork(visNetworkOptions, AnnyFactory, $rootScope) {
  return {
    replace: true,
    scope: {},
    template: '<div class="vis-network"></div>',
    link: function (scope, elm) {
      scope.getData = function () {
        var nodes = [];
        var edges = [];

        // layers
        _.each(AnnyFactory.network.allLayers, function (layer, layerIndex) {
          // neurons
          _.each(layer.neurons, function (neuron) {
            var id = neuron.id;
            var input = neuron.oldInput.toFixed(3);
            var output = neuron.output.toFixed(3);
            var error = neuron.error.toFixed(3);

            nodes.push({
              id: id,
              title: [
                '<b>id:</b> ', id, '<br/>',
                '<b>in:</b> ', input, '<br/>',
                '<b>out:</b> ', output, '<br/>',
                '<b>err:</b> ', error, '<br/>',
                '<b>bias:</b> ', neuron.isBiasNeuron, '<br/>'
              ].join(''),
              level: layerIndex,
              label: [
                '\n',
                '\ni:', input,
                '\no:', output,
                '\ne:', error
              ].join(' '),
              value: Math.abs(output),
              group: 'normal'
            });

            // connections
            _.each(neuron.outgoing, function (connection) {
              var weight = connection.weight.toFixed(3);

              edges.push({
                from: connection.source.id,
                to: connection.target.id,
                value: Math.abs(weight),
                title: 'weight: ' + weight,
                // matches border colors in netowrk options factory
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
      scope.setData = function () {
        scope.network.setData(scope.getData());
      };

      $rootScope.$on('anny:changed', function () {
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
