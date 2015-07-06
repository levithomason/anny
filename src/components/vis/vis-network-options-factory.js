function visNetworkOptions() {
  var options = {};

  // Nodes
  options.nodes = {
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
  };

  // Groups
  options.groups = {
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
  };

  // Edges
  options.edges = {
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
    tooltipDelay: 200
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
