import anny from 'anny'
import _ from 'lodash'

export const data = anny.DATA
export const trainer = new anny.Trainer()
export let network = new anny.Network([
  new anny.Layer(2),
  new anny.Layer(5),
  new anny.Layer(3),
  new anny.Layer(1),
])

export const getRandomLayers = () => {
  const layers = [new anny.Layer(2)]

  _.times(_.random(1, 3), () => {
    layers.push(new anny.Layer(_.random(3, 5)))
  })

  layers.push(new anny.Layer(1))

  return layers
}

export const newNetwork = (layerSizes) => {
  const layers = layerSizes
    ? layerSizes.map(x => new anny.Layer(x))
    : getRandomLayers()

  network = new anny.Network(layers)
}

export const activate = (inputs) => {
  network.activate(inputs || _.times(network.inputLayer.neurons.length, Math.random))
}
