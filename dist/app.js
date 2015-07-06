var inputs = _.random(2, 8);
var hidden = _.random(4, 8);
var outputs = _.random(1, 3);
var network = new Network(inputs, hidden, outputs);

angular.module('App', [
  'App.vis',
  'App.toolbar',
])
  .controller('Controller', ["$scope", function($scope) {
    $scope.network = network;
  }]);

angular.module('App.toolbar', []);

angular.module('App.vis', []);

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

  .directive('toolbar', function() {
    return {
      replace: true,
      scope: {
        network: '='
      },
      templateUrl: 'components/toolbar/toolbar.html',
      link: function(scope, elm, attrs) {
        scope.activateRandom = function() {
          var inputs = [];

          for (var i = 0; i < scope.network.input.neurons.length; i += 1) {
            inputs.push(_.random(true));
          }

          scope.network.activate(inputs);
        };
      }
    }
  });

function visNetwork(visNetworkOptions) {
  return {
    replace: true,
    scope: {
      network: '=',
      nodes: '=',
      edges: '='
    },
    template: '<div class="vis-network"></div>',
    link: function(scope, elm, attrs) {
      scope.getData = function() {
        var nodes = [];
        var edges = [];

        // layers
        _.each(scope.network.layers, function(layer, layerIndex) {

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
              var weight = connection.weight;

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

      scope.update = function() {
        console.log('update network');
        network.setData(scope.getData());
      };

      var network = new vis.Network(elm[0], scope.getData(), visNetworkOptions);

      scope.$watch(function() {
        // just watch the input of the first neuron
        // watch doesn't like the circular ref in neuron.connection
        return scope.network.input.neurons[0].input;
      }, function(newVal, oldVal) {
        if (!angular.equals(newVal, oldVal)) {
          scope.update();
        }
      })
    }
  }
}
visNetwork.$inject = ["visNetworkOptions"];

angular.module('App.vis')
  .directive('visNetwork', visNetwork);
