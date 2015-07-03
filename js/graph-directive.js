angular.module('App')
  .directive('visGraph', function() {
    return {
      replace: true,
      scope: {
        nodes: '=',
        edges: '='
      },
      template: '<div></div>',
      link: function(scope, elm, attrs) {
        elm.css({
          height: '480',
          border: '1px solid lightgray'
        });

        var nodes = [];
        var edges = [];
        _.each(scope.nodes, function(node, i) {
          nodes.push({id: node.id, label: 'n' + node.id});

          _.each(node.outgoing, function(connection) {
            edges.push({from: node.id, to: connection.target.id})
          });
        });

        var nodeSet = new vis.DataSet(nodes);
        var edgeSet = new vis.DataSet(edges);

        // create a network
        var data = {
          nodes: nodeSet,
          edges: edgeSet
        };

        var options = {};
        var network = new vis.Network(elm[0], data, options);
      }
    }
  });
