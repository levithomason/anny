angular.module('App.graph')

  .directive('graph', function() {
    return {
      replace: true,
      scope: {},
      template: '<div class="vis-graph-container"></div>',
      link: function(scope, elm) {
        var container = elm[0];
        var dataset = new vis.DataSet();
        var groups = new vis.DataSet();
        groups.add({
          id: 0,
          content: 'error',
          className: 'vis-error-graph-style',
          options: {
            drawPoints: {
              size: 0,
              style: 'circle' // square, circle
            },
            shaded: {
              orientation: 'bottom' // top, bottom
            }
          }
        });

        var options = {
          moveable: false,
          width: '100%',
          height: '100%',
          start: vis.moment(),
          legend: {
            left: {
              visible: true,
              position: 'top-left'
            }
          },
          dataAxis: {
            visible: true,
            showMajorLabels: true,
            showMinorLabels: true,
            width: '0px',
            left: {
              range: {
                min: 0
              }
            },
            right: {
              range: {
                min: 0
              }
            }
          }
        };

        var graph2d = new vis.Graph2d(container, dataset, groups, options);
        var i = 1;
        var startTime = Date.now();

        function addDataPoint() {
          dataset.add({
            x: Date.now(),
            y: i,
            group: 0
          });
          i -= i / 5;
          graph2d.redraw();
          setTimeout(addDataPoint, 1000);
        }

        function zoomWindow() {
          var frequency = 10000;
          graph2d.setWindow(startTime, Date.now() + frequency);
          setTimeout(function() {
            zoomWindow();
          }, frequency);
        }

        (function init() {
          addDataPoint();
          zoomWindow();
        }());
      }
    };
  });
