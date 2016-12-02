/* eslint-disable no-console */
import _ from 'lodash'
import {
  ACTIVATION,
  DATA,
  ERROR,
  Layer,
  Network,
  Trainer,
} from './src'

// ----------------------------------------
// Dataset
// ----------------------------------------

const datasetName = 'irisFlower'
const dataset = DATA[datasetName]

// shuffle
const data = _.shuffle(dataset)

// shuffle & normalize
// const data = _.shuffle(_.map(dataset, (sample) => {
//   const maxInput = _.max(_.flatten(_.pluck(dataset, 'input')))
//   sample.input = _.map(sample.input, input => input / maxInput)
//   return sample
// }))

// ----------------------------------------
// Settings
// ----------------------------------------


// Trainer
const batch = true
const maxEpochs = 20000
const frequency = 100
const trainings = 1
const errorThreshold = 0.001

// Network
const learningRate = 0.0015
const layers = [
  new Layer(4, ACTIVATION.tanh, learningRate),
  new Layer(20, ACTIVATION.tanh, learningRate),
  new Layer(15, ACTIVATION.tanh, learningRate),
  new Layer(10, ACTIVATION.tanh, learningRate),
  new Layer(3, ACTIVATION.tanh, learningRate),
]

const network = new Network(layers, ERROR.meanSquared)

// ----------------------------------------
// Multiple Train
// ----------------------------------------

const epochs = []
let successes = 0
let fails = 0

const layerReadout = layers.map(l => `${l.size()}`).join(', ')

console.log(`
  data set     : ${datasetName}
  batch        : ${batch}
  maxEpochs    : ${maxEpochs}
  frequency    : ${frequency}
  layers       : ${layerReadout}
  learningRate : ${learningRate}
`)

_.times(trainings, training => {
  let lastError = 0
  let lowestError = Infinity
  console.log(`${_.repeat('-', 60)}`)
  console.log(`training ${training + 1}`)

  const trainer = new Trainer({
    batch,
    maxEpochs,
    errorThreshold,
    frequency,
    onSuccess: (error, epoch) => {
      successes++
      epochs.push(epoch)
      console.log(`\nSuccess: error ${error} @ ${epoch} epochs`)

      dataset.forEach(sample => {
        console.log('')
        console.log(`  target: ${sample.output}`)
        console.log(`  actual: ${network.activate(sample.input).map(n => n.toFixed(9))}`)
      })
    },
    onFail: (error, epoch) => {
      fails++
      console.log(`\nFail: error ${error} @ ${epoch} epochs`)
    },
    onProgress: (error, epoch) => {
      const sign = error === lastError && '-' || (error < lastError ? '↓' : '↑')
      const lowest = error < lowestError ? '★' : ' '
      const percent =
        `${_.padLeft(100 - Math.round((lastError / error) * 100), 4)}%`
      lowestError = Math.min(error, lowestError)
      console.log(`${_.pad(epoch, 5)} ${lowest} ${sign} ${percent} ${error}`)
      lastError = error
    },
  })

  trainer.train(network, data)
})

// ----------------------------------------
// Log results
// ----------------------------------------

console.log(``)
console.log(`// ${_.repeat('-', 60)}`)
console.log(`// Results`)
console.log(`// ${_.repeat('-', 60)}`)

console.log(`
  data set     : ${datasetName}
  layerSizes   : ${layerReadout}
  learningRate : ${learningRate}
  batch        : ${batch}
  maxEpochs    : ${maxEpochs}
--------------------------
  epochs avg:  : ${_.round(_.sum(epochs, n => n / epochs.length))}
  epoch range: : ${_.min(epochs)}-${_.max(epochs)}

  ratio        : ${successes}/${fails}
`)
