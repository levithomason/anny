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
          nodes.push({id: i, label: 'n' + i});

          // TODO: need node id's for connections
          //_.each(node.outgoing, function(connection) {
          //  edges.push({from: i, to: })
          //});

          console.log(node);
        });

        // create an array with nodes
        var nodeSet = new vis.DataSet(nodes);

        // create an array with edges
        var edgeSet = new vis.DataSet([
          {from: 1, to: 3},
          {from: 1, to: 2},
          {from: 2, to: 4},
          {from: 2, to: 5}
        ]);

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
