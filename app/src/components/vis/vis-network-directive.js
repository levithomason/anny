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
            var bias = neuron.bias.toFixed(3);
            var id = neuron.id;
            var input = neuron.oldInput.toFixed(3);
            var output = neuron.output.toFixed(3);
            var error = neuron.error.toFixed(3);

            nodes.push({
              id: id,
              title: [
                '<b>id:</b> ', id, '<br/>',
                '<b>bias:</b> ' + bias, '<br/>',
                '<b>in:</b> ', input, '<br/>',
                '<b>out:</b> ', output, '<br/>',
                '<b>err:</b> ', error, '<br/>'
              ].join(''),
              level: layerIndex,
              label: [
                '\n',
                '\ni:', input,
                '\no:', output,
                '\ne:', error
              ].join(' '),
              value: Math.abs(bias),
              group: bias > 0 ? 'gate' : 'normal'
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

angular.module('App.vis')
  .directive('visNetwork', visNetwork);
