angular.module('App.graph')

  .directive('graph', function() {
    return {
      replace: true,
      scope: {},
      template: '<div class="vis-graph-container"></div>',
      link: function(scope, elm) {
        var DELAY = 2000; // delay in ms to add new data points
        var container = elm[0];
        var items = [
        ];
        var dataset = new vis.DataSet(items);
        var options = {
          start: vis.moment().add(-60, 'seconds'), // changed so its faster
          end: vis.moment(),
          dataAxis: {
            left: {
              range: {
                min: -10, max: 10
              }
            }
          },
          drawPoints: {
            style: 'circle' // square, circle
          },
          shaded: {
            orientation: 'bottom' // top, bottom
          }
        };
        var graph2d = new vis.Graph2d(container, dataset, options);
        graph2d.getWindow();

        var i = 0;
        function addDataPoint() {
          // add a new data point to the dataset
          var now = Date.now()+10000;
          console.log(i);
          dataset.add({
            x: now,
            y: i++ / 1000
          });
          setTimeout(addDataPoint, DELAY);
        }
        addDataPoint();
      }
    };
  });
