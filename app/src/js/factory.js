import anny from 'anny'
import _ from 'lodash'

export const data = anny.DATA
export const trainer = new anny.Trainer()
export let network = new anny.Network([2, 5, 3, 1])

export const getRandomLayers = () => {
  const layers = [2]

  _.times(_.random(1, 3), () => layers.push(_.random(3, 5)))

  layers.push(1)

  return layers
}

export const newNetwork = (layers) => {
  network = new anny.Network(layers || getRandomLayers())
}

export const activate = (inputs) => {
  network.activate(inputs || _.times(network.inputLayer.neurons.length, Math.random))
}
