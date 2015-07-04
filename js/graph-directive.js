angular.module('App')
  .directive('visGraph', function() {
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
              title: 'bias: ' + neuron.bias,
              level: layerIndex,
              value: (neuron.bias + 0.2) * 10,
              group: neuron.bias > 0 ? 'gate' : 'normal'
            });

            // connections
            _.each(neuron.outgoing, function(connection) {
              edges.push({
                from: connection.source.id,
                to: connection.target.id,
                value: (connection.weight + 0.5) * 2,
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
            shape: 'dot',
            scaling: {
              min: 3,
              max: 10
            },
            mass: 0.7
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
                border: 'hsl(30, 30%, 30%)',
                background: 'hsl(30, 100%, 70%)',
                hover: {
                  border: 'hsl(30, 50%, 50%)',
                  background: 'hsl(30, 100%, 70%)',
                },
                highlight: {
                  border: 'hsl(30, 70%, 60%)',
                  background: 'hsl(30, 100%, 70%)',
                },
              }
            }
          },
          edges: {
            smooth: {
              enabled: true,
              type: "dynamic",
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
            tooltipDelay: 100
          }
        };

        var network = new vis.Network(elm[0], data, options);
      }
    }
  });
