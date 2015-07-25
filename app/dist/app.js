angular.module('App', [
  'anny',

  'App.vis',
  'App.toolbar',
]);

angular.module('anny', []);

angular.module('App.toolbar', []);

angular.module('App.vis', []);

function AnnyFactory($rootScope) {
  var factory = {};

  factory.init = function() {
    factory.network = new anny.Network(factory.getRandomLayers());
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.getRandomLayers = function() {
    var inputs = _.random(2, 6);
    var outputs = _.random(1, 2);
    var numHiddenLayers = _.random(0, 2);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(3, 5));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.newNetwork = function(layers) {
    layers = layers || factory.getRandomLayers();

    factory.network = new anny.Network(layers);

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
          background: 'hsl(210, 80%, 80%)',
        },
        highlight: {
          border: 'hsl(210, 60%, 70%)',
          background: 'hsl(210, 80%, 80%)',
        },
      }
    },
    gate: {
      color: {
        border: 'hsl(30, 15%, 25%)',
        background: 'hsl(30, 100%, 70%)',
        hover: {
          border: 'hsl(30, 40%, 40%)',
          background: 'hsl(30, 100%, 70%)',
        },
        highlight: {
          border: 'hsl(30, 60%, 60%)',
          background: 'hsl(30, 100%, 70%)',
        },
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
      max: 4,
    },
    hoverWidth: 1,
    selectionWidth: 1.5,
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
      link: function(scope, elm, attrs) {
        scope.randomNet = function() {
          AnnyFactory.newNetwork();
        };

        scope.activateRandom = function() {
          var inputs = [];

          for (var i = 0; i < AnnyFactory.network.input.neurons.length; i += 1) {
            inputs.push(_.random(true));
          }

          AnnyFactory.activate(inputs);
        };
      }
    }
  }]);

function visNetwork(visNetworkOptions, AnnyFactory, $rootScope) {
  return {
    replace: true,
    scope: {},
    template: '<div class="vis-network"></div>',
    link: function(scope, elm, attrs) {
      scope.getData = function() {
        var nodes = [];
        var edges = [];

        // layers
        _.each(AnnyFactory.network.layers, function(layer, layerIndex) {

          // neurons
          _.each(layer.neurons, function(neuron) {
            var bias = neuron.bias.toFixed(3);
            var id = neuron.id;
            var input = neuron.input.toFixed(3);
            var output = neuron.output.toFixed(3);

            nodes.push({
              id: id,
              title: [
                '<b>id:</b> ', id, '<br/>',
                '<b>in:</b> ', input, '<br/>',
                '<b>out:</b> ', output, '<br/>',
                '<b>bias:</b> ' + bias
              ].join(''),
              level: layerIndex,
              label: output,
              value: Math.abs(bias),
              group: bias > 0 ? 'gate' : 'normal',
            });

            // connections
            _.each(neuron.outgoing, function(connection) {
              var weight = connection.weight.toFixed(3);

              edges.push({
                from: connection.source.id,
                to: connection.target.id,
                value: Math.abs(weight),
                title: 'weight: ' + weight,
                // matches border colors in netowrk options factory
                color: {
                  color: weight >= 0 ? 'hsl(210, 20%, 25%)' : 'hsl(30, 15%, 25%)',
                  hover: weight >= 0 ? 'hsl(210, 35%, 45%)' : 'hsl(30, 40%, 40%)',
                  highlight: weight >= 0 ? 'hsl(210, 60%, 70%)' : 'hsl(30, 60%, 60%)',
                }
              })
            })
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
      scope.network = new vis.Network(elm[0], scope.getData(), visNetworkOptions);
    }
  }
}
visNetwork.$inject = ["visNetworkOptions", "AnnyFactory", "$rootScope"];

angular.module('App.vis')
  .directive('visNetwork', visNetwork);