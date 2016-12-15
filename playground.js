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

const datasetName = 'ORGate'
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
  new Layer(2, ACTIVATION.tanh, learningRate),
  new Layer(10, ACTIVATION.tanh, learningRate),
  new Layer(5, ACTIVATION.tanh, learningRate),
  new Layer(1, ACTIVATION.tanh, learningRate),
]

const network = new Network(layers, ERROR.meanSquared)

// ----------------------------------------
// Multiple Train
// ----------------------------------------

const epochs = []
let successes = 0
let fails = 0

const layerReadout = _.map(layers, l => `${l.size()}`).join(', ')

console.log(`
  data set     : ${datasetName}
  batch        : ${batch}
  maxEpochs    : ${maxEpochs}
  frequency    : ${frequency}
  layers       : ${layerReadout}
  learningRate : ${learningRate}
`)

_.times(trainings, (training) => {
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

      _.forEach(dataset, (sample) => {
        console.log('')
        console.log(`  target: ${sample.output}`)
        console.log(`  actual: ${_.map(network.activate(sample.input), n => n.toFixed(9))}`)
      })
    },
    onFail: (error, epoch) => {
      fails++
      console.log(`\nFail: error ${error} @ ${epoch} epochs`)
    },
    onProgress: (error, epoch) => {
      const fixedError = error.toFixed(6)
      const sign = fixedError === lastError && '-' || (fixedError < lastError ? '↓' : '↑')
      const lowest = fixedError < lowestError ? '★' : ' '
      const percent = `${_.padStart(100 - Math.round((lastError / fixedError) * 100), 4)}%`
      lowestError = Math.min(fixedError, lowestError)
      console.log(`${_.pad(epoch, 5)} ${lowest} ${sign} ${percent} ${fixedError}`)
      lastError = fixedError
    },
  })

  trainer.train(network, data)
})

// ----------------------------------------
// Log results
// ----------------------------------------

console.log(`
  data set     : ${datasetName}
  layerSizes   : ${layerReadout}
  learningRate : ${learningRate}
  batch        : ${batch}
  maxEpochs    : ${maxEpochs}
--------------------------
  epochs avg:  : ${_.round(_.sumBy(epochs, n => n / epochs.length))}
  epoch range: : ${_.min(epochs)}-${_.max(epochs)}

  ratio        : ${successes}/${fails}
`)
