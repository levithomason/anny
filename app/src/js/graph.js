import _ from 'lodash'
import vis from 'vis'
import visNetworkOptions from './vis-network-options'

let visNetwork

export const getData = (annyNetwork) => {
  const nodes = []
  const edges = []

  // layers
  _.each(annyNetwork.allLayers, (layer, layerIndex) => {
    // neurons
    _.each(layer.neurons, function(neuron) {
      const id = neuron.id
      const input = neuron.input.toFixed(3)
      const output = neuron.output.toFixed(3)
      const delta = neuron.delta.toFixed(6)

      nodes.push({
        id: id,
        title: [
          '<b>id:</b> ', id, '<br/>',
          '<b>delta:</b> ', delta, '<br/>',
        ].join(''),
        level: layerIndex,
        label: (neuron.isInput() ? [
          '\no:', output,
        ] : neuron.isOutput() ? [
          '\ni:', input,
          '\no:', output,
        ] : neuron.isBias ? [
          '\no:', output,
        ] : /* hidden layer */ [
          '\ni:', input,
          '\no:', output,
        ]).join(' '),
        value: Math.abs(output),
        group: neuron.isBias ? 'bias' : 'normal',
      })

      // connections
      _.each(neuron.outgoing, function(connection) {
        const weight = connection.weight.toFixed(3)

        edges.push({
          from: connection.source.id,
          to: connection.target.id,
          value: Math.abs(weight),
          title: 'weight: ' + weight,
          // matches border colors in network options factory
          color: {
            color: weight >= 0 ? 'hsl(210, 20%, 25%)' : 'hsl(30, 15%, 25%)',
            hover: weight >= 0 ? 'hsl(210, 35%, 45%)' : 'hsl(30, 40%, 40%)',
            highlight: weight >= 0 ? 'hsl(210, 60%, 70%)' : 'hsl(30, 60%, 60%)',
          },
        })
      })
    })
  })

  return {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  }
}

export const update = (annyNetwork) => {
  visNetwork.setData(getData(annyNetwork))
}

export const init = (annyNetwork, mountNode) => {
  visNetwork = new vis.Network(mountNode, getData(annyNetwork), visNetworkOptions)
  update(annyNetwork)
}
