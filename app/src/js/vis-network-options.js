const POSITIVE_HUE = 210
const NEGATIVE_HUE = 30

const positiveWeightColor = {
  color: `hsl(${POSITIVE_HUE}, 20%, 25%)`,
  hover: `hsl(${POSITIVE_HUE}, 35%, 45%)`,
  highlight: `hsl(${POSITIVE_HUE}, 60%, 70%)`,
}

const negativeWeightColor = {
  color: `hsl(${NEGATIVE_HUE}, 15%, 25%)`,
  hover: `hsl(${NEGATIVE_HUE}, 40%, 40%)`,
  highlight: `hsl(${NEGATIVE_HUE}, 60%, 60%)`,
}

const positiveNeuronColor = {
  background: `hsl(${POSITIVE_HUE}, 20%, 60%)`,
  hover: { background: `hsl(${POSITIVE_HUE}, 35%, 70%)` },
  highlight: { background: `hsl(${POSITIVE_HUE}, 60%, 80%)` },
}
const negativeNeuronColor = {
  background: `hsl(${NEGATIVE_HUE}, 20%, 60%)`,
  hover: { background: `hsl(${NEGATIVE_HUE}, 35%, 70%)` },
  highlight: { background: `hsl(${NEGATIVE_HUE}, 60%, 80%)` },
}

export const getWeightColor = weight => weight >= 0 ? positiveWeightColor : negativeWeightColor
export const getNeuronColor = output => output >= 0 ? positiveNeuronColor : negativeNeuronColor

const visNetworkOptions = {}

// Nodes
visNetworkOptions.nodes = {
  borderWidth: 0.1,
  borderWidthSelected: 0.1,
  shape: 'dot',
  scaling: {
    min: 5,
    max: 15,
  },
  font: {
    color: '#777',
    size: 12,
    face: 'Lato',
  },
  labelHighlightBold: true,
  mass: 1,
  color: 'transparent',
}

// Groups
visNetworkOptions.groups = {
  input: {
    shape: 'icon',
    icon: {
      face: 'Ionicons',
      code: '\uf29e',
      size: 25,
    },
    borderWidth: 0,
    borderWidthSelected: 0,
  },
  output: {
    shape: 'icon',
    icon: {
      face: 'Ionicons',
      code: '\uf29f',
      size: 25,
    },
    borderWidth: 0,
    borderWidthSelected: 0,
  },
  hidden: {
    // ...
  },
  bias: {
    borderWidth: 2,
    borderWidthSelected: 2,
    color: {
      border: 'hsl(0, 0%, 40%)',
      background: 'transparent',
      hover: {
        border: 'hsl(0, 0%, 60%)',
        background: 'transparent',
      },
      highlight: {
        border: 'hsl(0, 0%, 80%)',
        background: 'transparent',
      },
    },
  },
}

// Edges
visNetworkOptions.edges = {
  smooth: {
    enabled: false, // faster rendering
    type: 'dynamic',
    roundness: 0.5,
  },
  scaling: {
    min: 0.5,
    max: 8,
  },
  hoverWidth: 1,
  selectionWidth: 1.5,
}

// Layout
visNetworkOptions.layout = {
  hierarchical: {
    direction: 'LR',
  },
}

// Interaction
visNetworkOptions.interaction = {
  hover: true,
  tooltipDelay: 150,
}

// Physics
visNetworkOptions.physics = {
  enabled: true,
  hierarchicalRepulsion: {
    centralGravity: 0,
    springLength: 50,
    springConstant: 0.002,
    nodeDistance: 80,
    damping: 0.4,
  },
  maxVelocity: 50,
  minVelocity: 0.1,
  stabilization: {
    enabled: true,
    iterations: 0,
    updateInterval: 0,
    onlyDynamicEdges: false,
    fit: true,
  },
  timestep: 0.5,
}

export default visNetworkOptions
