import _ from 'lodash'
import * as factory from './factory'
import * as graph from './graph'
import * as $console from './console'

export const train = (trainingSet) => {
  $console.clear()

  factory.trainer.train(factory.network, trainingSet, {
    frequency: 1,
    onProgress(error, epoch) {
      $console.log(`epoch ${_.pad(epoch, 3)} error ${error.toFixed(6)}`)
    },

    onSuccess(error, epoch) {
      const results = []

      _.forEach(trainingSet, (sample) => {
        const input = sample.input
        const output = factory.network.activate(input)
        results.push(`[${input.toString()}] => ${_.pad(_.round(output, 2), 5)} == ${_.pad(output >= 0.5, 5)}`)
      })

      $console.log([ // eslint-disable-line
        '',
        'SUCCESS!',
        '',
        'Activation Results:',
        ...results,
      ].join('\n'))

      graph.update(factory.network)
    },

    onFail(error, epoch) {
      $console.log([ // eslint-disable-line
        '',
        'FAIL!',
      ].join('\n'))

      graph.update(factory.network)
    },
  })
}

export const newLogicNetwork = () => {
  factory.newNetwork([2, 5, 3, 1])
  graph.update(factory.network)
}

export const addLayer = () => {
  factory.addLayer()
  graph.update(factory.network)
}

export const addNeuron = () => {
  factory.addNeuron()
  graph.update(factory.network)
}

export const newRandomNetwork = () => {
  factory.newNetwork()
  graph.update(factory.network)
}
export const newIrisNetwork = () => {
  factory.newNetwork([4, 20, 10, 7, 3])
  graph.update(factory.network)
}

export const trainORGate = () => {
  train(factory.data.ORGate)
}

export const trainXORGate = () => {
  train(factory.data.XORGate)
}

export const trainANDGate = () => {
  train(factory.data.ANDGate)
}

export const trainNANDGate = () => {
  train(factory.data.NANDGate)
}

export const trainIrisFlower = () => {
  train(factory.data.irisFlower)
}
