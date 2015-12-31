import _ from 'lodash'
import validate from './Validate'
import ERROR from './Error'

/**
 * A Trainer teaches a {@link Network} how to correctly classify some `data`.
 *
 * @example
 * const network = new anny.Network([2, 1])
 * const trainer = new Trainer()
 *
 * trainer.train(network, anny.DATA.ORGate)
 *
 * network.activate([0, 0]) // => 0.000836743108
 * network.activate([0, 1]) // => 0.998253857294
 */
class Trainer {
  /**
   * @param {object} [options]
   * @param {boolean|number} [options.batch]
   *   Use batch, online (stochastic), or mini-batch learning modes.
   *
   *   Batch `true`: Connection weights are updated once after iterating
   *   through all the training samples in the training data (an epoch).
   *
   *   Online `false`: Connection weights are updated after every training
   *   sample in the training data.
   *
   *   Mini-batch `<number>`: Connection weights are updated every `<number>`
   *   training samples.
   * @param {object} [options.errorFn]
   *   The cost function.  The function used to calculate the error of the
   *   Network. In other words, to what degree was the Network's output wrong.
   * @param {number} [options.errorThreshold=0.001]
   *   The target `error` value. The goal of the Trainer is to train the
   *   Network until the `error` is below this value.
   * @param {number} [options.frequency=100]
   *   How many iterations through the training data between calling
   *   `options.onProgress`.
   * @param {number} [options.maxEpochs=20000]
   *   The max training iterations. The Trainer will stop training after
   *   iterating through the training data this number of times.  One full loop
   *   through the training data is counted as one epoch.
   * @param {Trainer~onFail} [options.onFail]
   *   Called if the Network `error` does not fall below the `errorThreshold`
   *   after `maxEpochs`.
   * @param {Trainer~onProgress} [options.onProgress]
   *   Called every `frequency` epochs.
   * @param {Trainer~onSuccess} [options.onSuccess]
   *   Called if the Network `error` falls below the `errorThreshold` during
   *   training.
   * @constructor
   * @see Network
   * @see ERROR
   */
  constructor(options = {}) {
    const defaultOptions = {
      batch: false,
      errorFn: ERROR.meanSquared,
      errorThreshold: 0.001,
      frequency: 100,
      maxEpochs: 20000,
    }

    const mergedOptions = _.merge(defaultOptions, options)
    validate.trainingOptions(mergedOptions)
    this.options = mergedOptions
  }

  /**
   * Train the Network to produce the output from the given input.
   * @param {Network} network - The Network to be trained.
   * @param {object[]} data - Array of objects in the form
   * `{input: [], output: []}`.
   * @param {object} [overrides] Overrides are merged into this trainer
   *   instance's options.
   */
  train(network, data, overrides = {}) {
    validate.trainingData(network, data)
    const mergedOptions = _.merge(this.options, overrides)
    validate.trainingOptions(mergedOptions)
    // TODO: normalize data to the range of the activation functions
    const {
      batch,
      errorFn,
      errorThreshold,
      frequency,
      maxEpochs,
      onFail,
      onProgress,
      onSuccess,
      } = mergedOptions

    const isBatch = batch === true
    const isOnline = batch === false

    // use an 'each' loop so we can break out of it on success/fail
    // a 'times' loop cannot be broken
    let counter = 0
    _.each(_.range(maxEpochs), epochIndex => {
      const epoch = epochIndex + 1
      // reset batch flag every epoch (batch)
      let isBatchMatch = isBatch

      // loop over the training data summing the error of all samples
      // http://www.researchgate.net/post
      //   /Neural_networks_and_mean-square_errors#rgw51_55cb2f1399589
      network.error = _.sum(data, sample => {
        const isMiniBatchMatch = _.isNumber(batch) && counter % batch === 0

        // make a prediction
        network.activate(sample.input)

        // backprop deltas
        // https://en.wikipedia.org/wiki/Backpropagation/#Phase_1:_Propagation
        // TODO abstract into ERROR.meanSquared.partial
        const deltas = _.map(network.output, (actVal, i) => {
          return actVal - sample.output[i]
        })

        network.backprop(deltas)

        // update weights
        // https://en.wikipedia.org/wiki/Backpropagation/#Phase_2:_Weight_update
        // TODO abstract into swappable weight update rules
        const weightUpdateRule = (layer, shouldUpdate) => {
          _.each(layer.neurons, (neuron) => {
            _.each(neuron.incoming, connection => {
              const gradient = connection.source.output * neuron.delta
              const delta = gradient * neuron.learningRate
              connection.accumulate(delta)
              if (shouldUpdate) connection.update()
            })
          })
        }

        const shouldUpdate = isOnline || isBatchMatch || isMiniBatchMatch
        weightUpdateRule(network.outputLayer, shouldUpdate)
        _.each(network.hiddenLayers, layer => {
          weightUpdateRule(layer, shouldUpdate)
        })

        // first sample is done, clear batch flag for subsequent samples
        isBatchMatch = false
        counter++

        // get the error
        return errorFn(sample.output, network.output) / data.length
      })

      // success
      if (onSuccess && network.error <= errorThreshold) {
        onSuccess(network.error, epoch)
        return false
      }

      // fail
      if (onFail && epoch === maxEpochs) onFail(network.error, epoch)

      // call onProgress after the first epoch and every `frequency` thereafter
      if (onProgress && epoch % frequency === 0) {
        return onProgress(network.error, epoch)
      }
    })
  }

  /**
   * Called if the Network error falls below the `errorThreshold`.
   * @callback Trainer~onSuccess
   * @param {number} error
   *   The Network error value at the time of success.
   * @param {number} epoch
   *   Indicates on which iteration through the training data the Network
   *   became successful.
   */

  /**
   * Called if the Network error is not below the `errorThreshold` after
   * `maxEpochs` iterations through the training data set.
   * @callback Trainer~onFail
   * @param {number} error
   *   The Network error value at the time of success.
   * @param {number} epoch
   *   Indicates on which iteration through the training data the Network
   *   became successful.
   */

  /**
   * Called if the Network error falls below the `errorThreshold`.
   * @callback Trainer~onProgress
   * @param {number} error
   *   The Network error value at the time of success.
   * @param {number} epoch
   *   Indicates on which iteration through the training data the Network
   *   became successful.
   */
}

export default Trainer
