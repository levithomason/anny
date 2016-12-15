import _ from 'lodash'
import vis from 'vis'
import visNetworkOptions, { getNeuronColor, getWeightColor } from './vis-network-options'

let visNetwork

export const getData = (annyNetwork) => {
  const nodes = []
  const edges = []

  // layers
  _.forEach(annyNetwork.allLayers, (layer, layerIndex) => {
    // neurons
    _.forEach(layer.neurons, (neuron) => {
      const id = neuron.id
      const input = neuron.input.toFixed(2)
      const output = neuron.output.toFixed(2)
      const delta = neuron.delta.toFixed(6)

      // all nodes
      let node = {
        id,
        title: [
          '<b>id:</b> ', id, '<br/>',
          '<b>input:</b> ', input, '<br/>',
          '<b>output:</b> ', output, '<br/>',
          '<b>delta:</b> ', delta, '<br/>',
        ].join(''),
        level: layerIndex,
        value: Math.abs(output),
      }

      if (neuron.isInput()) {
        node = {
          ...node,
          group: 'input',
          label: `${output} →`,
          icon: {
            size: _.clamp(Math.abs(output) * 25, 20, 35),
            color: output >= 0 ? 'hsl(210, 60%, 70%)' : 'hsl(30, 60%, 60%)',
          },
        }
      } else if (neuron.isOutput()) {
        node = {
          ...node,
          group: 'output',
          label: `→ ${input}\n${output} →`,
          icon: {
            size: _.clamp(Math.abs(output) * 25, 20, 35),
            color: output >= 0 ? 'hsl(210, 60%, 70%)' : 'hsl(30, 60%, 60%)',
          },
        }
      } else if (neuron.isBias) {
        node = {
          ...node,
          group: 'bias',
          label: `${output} →`,
        }
      } else /* is hidden */ {
        node = {
          ...node,
          color: getNeuronColor(output),
          group: 'hidden',
          label: `→ ${input}\n${output} →`,
        }
      }

      nodes.push(node)

      // connections
      _.forEach(neuron.outgoing, (connection) => {
        const weight = connection.weight.toFixed(3)

        edges.push({
          from: connection.source.id,
          to: connection.target.id,
          value: Math.abs(weight),
          title: `weight: ${weight}`,
          // matches border colors in network options factory
          color: getWeightColor(weight),
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
