/* eslint-disable no-console */
import _ from 'lodash'
import DATA from './src/Data'
import Network from './src/Network'
import Trainer from './src/Trainer'

// ----------------------------------------
// Settings
// ----------------------------------------

const dataSetName = 'ORGate'

const hiddenLayers = [8]
const learningRate = 0.001
const batch = false

const maxEpochs = 20000
const frequency = 1000
const trainings = 1

// ----------------------------------------
// Shuffle & normalize data
// ----------------------------------------

const dataSet = DATA[dataSetName]
const data = _.shuffle(_.map(dataSet, (sample) => {
  const maxInput = _.max(_.flatten(_.pluck(dataSet, 'input')))
  sample.input = _.map(sample.input, input => input / maxInput)
  return sample
}))

// ----------------------------------------
// Multiple Train
// ----------------------------------------

const epochs = []
let successes = 0
let fails = 0

const layerSizes = _.flatten([
  data[0].input.length,
  hiddenLayers,
  data[0].output.length,
])

console.log(`
  data set     : ${dataSetName}
  batch        : ${batch}
  maxEpochs    : ${maxEpochs}
  frequency    : ${frequency}
  layerSizes   : ${layerSizes.join(', ')}
  learningRate : ${learningRate}
`)

_.times(trainings, training => {
  let lastError = 0
  let lowestError = Infinity
  console.log(`${_.repeat('-', 60)}`)
  console.log(`training ${training + 1}`)

  // ----------------------------------------
  // Network
  // ----------------------------------------

  const network = new Network(layerSizes)

  // ----------------------------------------
  // Trainer
  // ----------------------------------------

  const trainer = new Trainer({
    batch,
    maxEpochs,
    frequency,
    onSuccess: (error, epoch) => {
      successes++
      epochs.push(epoch)
      console.log(`\nSuccess: error ${error} @ ${epoch} epochs`)
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
  data set     : ${dataSetName}
  layerSizes   : ${layerSizes.join(', ')}
  learningRate : ${learningRate}
  batch        : ${batch}
  maxEpochs    : ${maxEpochs}
--------------------------
  epochs avg:  : ${_.round(_.sum(epochs, n => n / epochs.length))}
  epoch range: : ${_.min(epochs)}-${_.max(epochs)}

  ratio        : ${successes}/${fails}
`)
