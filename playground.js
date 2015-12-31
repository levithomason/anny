/* eslint-disable no-console */
import _ from 'lodash'
import Data from './src/Data'
import Layer from './src/Layer'
import Network from './src/Network'
import Trainer from './src/Trainer'
import {normalize} from './src/Util'

let epochs = []
let successes = 0
let fails = 0

// ----------------------------------------
// Shuffle & normalize data
// ----------------------------------------

const data = _.shuffle(_.map(Data.irisFlower, (sample) => {
  sample.input = _.map(sample.input, n => n / 7.9)
  return sample
}))

// ----------------------------------------
// Multiple Train
// ----------------------------------------

_.times(1, n => {
  let lastError = 0
  let lowestError = Infinity

  // ----------------------------------------
  // Network
  // ----------------------------------------

  const layerSizes = [4, 40, 3]
  const learningRate =
    //0.1
    //0.01
    0.001
  const net = new Network(layerSizes)
  const batch =
    //true
    false
    //4
    //10
    //Math.round(data.length / 3)

  console.log(_.repeat('-', 70))
  console.log(`
    batch:        ${batch}
    layerSizes:   ${layerSizes.join(', ')}
    learningRate: ${learningRate}
  `)

  net.allLayers = _.map(layerSizes, size => (
    new Layer(size, undefined, learningRate)
  ))
  net.inputLayer = _.first(net.allLayers)
  net.hiddenLayers = _.slice(net.allLayers, 1, net.allLayers.length - 1)
  net.outputLayer = _.last(net.allLayers)

  _.each(net.allLayers, (layer, i) => {
    const next = net.allLayers[i + 1]
    if (next) layer.connect(next)
  })

  // ----------------------------------------
  // Trainer
  // ----------------------------------------

  const trainer = new Trainer({
    batch: batch,
    maxEpochs: 50000,
    frequency: 500,
    onSuccess: (error, epoch) => {
      console.log(`Successfully trained to ${error} error after ${epoch} epochs`)
      epochs.push(epoch)
      successes++
    },
    onFail: (error, epoch) => {
      console.log(`Fail to train, error is ${error} after ${epoch} epochs`)
      fails++
    },
    onProgress: (error, epoch) => {
      const sign = error < lastError ? '↓' : '↑'
      const lowest = error < lowestError ? '★' : ' '
      const percent =
        `${_.padLeft(100 - Math.round((lastError / error) * 100), 4)}%`
      lowestError = Math.min(error, lowestError)
      console.log(`${_.pad(epoch, 5)} ${lowest} ${sign} ${percent} ${error}`)
      lastError = error
    },
  })

  trainer.train(net, data)
})

// ----------------------------------------
// Log results
// ----------------------------------------

console.log(`
  Min:     ${_.min(epochs)}
  Max:     ${_.max(epochs)}
  Avg:     ${Math.round(_.sum(epochs, n => n / epochs.length))}
  Ratio:   ${successes}/${fails}
`)
