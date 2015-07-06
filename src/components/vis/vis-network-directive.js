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
        return scope.network.input.neurons[0].input;
      }, function(newVal, oldVal) {
        console.log(newVal, oldVal, !angular.equals(newVal, oldVal));
        if (!angular.equals(newVal, oldVal)) {
          scope.update();
        }
      })
    }
  }
}

angular.module('App.vis')
  .directive('visNetwork', visNetwork);
