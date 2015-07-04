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

angular.module('App.toolbar')

  .directive('toolbar', function() {
    return {
      replace: true,
      scope: {},
      templateUrl: 'components/toolbar/toolbar.html',
      link: function(scope, elm, attrs) {

      }
    }
  });

angular.module('App.vis')
  .directive('visNetwork', function() {
    return {
      replace: true,
      scope: {
        network: '=',
        nodes: '=',
        edges: '='
      },
      template: '<div></div>',
      link: function(scope, elm, attrs) {
        elm.css({
          width: '100%',
          height: '100%'
        });

        var nodes = [];
        var edges = [];

        // layers
        _.each(scope.network.layers, function(layer, layerIndex) {

          // neurons
          _.each(layer.neurons, function(neuron) {
            nodes.push({
              id: neuron.id,
              label: neuron.input,
              title: 'id: ' + neuron.id + ', bias: ' + neuron.bias,
              level: layerIndex,
              value: Math.abs(neuron.bias * 10),
              group: neuron.bias > 0 ? 'gate' : 'normal',
            });

            // connections
            _.each(neuron.outgoing, function(connection) {
              edges.push({
                from: connection.source.id,
                to: connection.target.id,
                value: Math.abs(connection.weight * 2),
                title: 'weight: ' + connection.weight,
              })
            })
          });
        });

        var nodeSet = new vis.DataSet(nodes);
        var edgeSet = new vis.DataSet(edges);

        // create a network
        var data = {
          nodes: nodeSet,
          edges: edgeSet
        };

        var options = {
          nodes: {
            borderWidth: 0.1,
            borderWidthSelected: 0.1,
            shape: 'circle',
            scaling: {
              min: 3,
              max: 10
            },
            font: {
              color: '#FFF',
              size: 16,
              face: 'Source Code Pro'
            },
            labelHighlightBold: false,
            mass: 1
          },
          groups: {
            normal: {
              color: {
                border: 'hsl(210, 30%, 30%)',
                background: 'hsl(210, 80%, 80%)',
                hover: {
                  border: 'hsl(210, 50%, 50%)',
                  background: 'hsl(210, 80%, 80%)',
                },
                highlight: {
                  border: 'hsl(210, 70%, 70%)',
                  background: 'hsl(210, 80%, 80%)',
                },
              }
            },
            gate: {
              color: {
                border: 'hsl(30, 20%, 28%)',
                background: 'hsl(30, 100%, 70%)',
                hover: {
                  border: 'hsl(30, 40%, 45%)',
                  background: 'hsl(30, 100%, 70%)',
                },
                highlight: {
                  border: 'hsl(30, 60%, 55%)',
                  background: 'hsl(30, 100%, 70%)',
                },
              }
            }
          },
          edges: {
            color: {
              inherit: 'from',
            },
            smooth: {
              enabled: true,
              type: 'dynamic',
              roundness: 0.5
            },
            scaling: {
              min: 0,
              max: 2,
            },
            hoverWidth: 1,
            selectionWidth: 1.5,
          },
          layout: {
            hierarchical: {
              direction: 'LR'
            }
          },
          interaction: {
            hover: true,
            tooltipDelay: 200
          },
          physics: {
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
          }
        };

        var network = new vis.Network(elm[0], data, options);
      }
    }
  });
