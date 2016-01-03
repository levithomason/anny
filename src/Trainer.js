import _ from 'lodash'
import validate from './Validate'

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
   */
  constructor(options = {}) {
    const defaultOptions = {
      batch: false,
      errorThreshold: 0.001,
      frequency: 100,
      maxEpochs: 20000,
    }

    const mergedOptions = _.merge(defaultOptions, options)
    validate.trainingOptions(mergedOptions)
    this.options = mergedOptions
  }

  /**
   * Train the `network` to classify the `data`.
   * @param {Network} network - The Network to be trained.
   * @param {object[]} data - Array of objects in the form
   * `{input: [], output: []}`.
   * @param {object} [overrides] Overrides are merged into this trainer
   *   instance's options.
   * @see Network
   * @see Data
   */
  train(network, data, overrides = {}) {
    validate.trainingData(network, data)
    const mergedOptions = _.merge(this.options, overrides)
    validate.trainingOptions(mergedOptions)
    // TODO: normalize data to the range of the activation functions
    const {
      batch,
      errorThreshold,
      frequency,
      maxEpochs,
      onFail,
      onProgress,
      onSuccess,
      } = mergedOptions

    const isBatch = batch === true
    const isOnline = batch === false
    const isMiniBatch = _.isNumber(batch)

    // track samples iterated, allows for mini-batches that span epochs
    let sampleCounter = 1
    let epochCount = 1

    for (let i = maxEpochs; i > 0; i -= 1) {
      // sum the average error of all training samples
      const error = _.sum(data, (sample, sampleIndex) => {
        const shouldUpdate = isOnline
          || isMiniBatch && sampleCounter % batch === 0
          || isBatch && sampleIndex === data.length - 1

        // propagation: set inputs & outputs, then error & deltas
        network.activate(sample.input)
        network.backprop(sample.output)

        // weight updates: update weights || accumulate weight gradients
        if (shouldUpdate) network.updateWeights()
        else network.accumulateGradients()

        sampleCounter++
        return network.error / data.length
      })

      // call onProgress after the first epoch and every `frequency` thereafter
      if (onProgress && epochCount % frequency === 0) {
        const stop = onProgress(error, epochCount) === false
        if (stop) break
      }

      // success
      if (onSuccess && error <= errorThreshold) {
        onSuccess(error, epochCount)
        break
      }

      // fail
      if (onFail && epochCount === maxEpochs) onFail(error, epochCount)

      epochCount++
    }
  }

  /**
   * Called if the `network` error falls below the `errorThreshold`.
   * @callback Trainer~onSuccess
   * @param {number} error
   *   The `network` error value at the time of success.
   * @param {number} epoch
   *   Indicates on which iteration through the training data the `network`
   *   became successful.
   */

  /**
   * Called if the `network` error is not below the `errorThreshold` after
   * `maxEpochs` iterations through the training data set.
   * @callback Trainer~onFail
   * @param {number} error
   *   The `network` error value at the time of success.
   * @param {number} epoch
   *   Indicates on which iteration through the training data the `network`
   *   became successful.
   */

  /**
   * Called if the `network` error falls below the `errorThreshold`.
   * @callback Trainer~onProgress
   * @param {number} error
   *   The `network` error value at the time of success.
   * @param {number} epoch
   *   Indicates on which iteration through the training data the `network`
   *   became successful.
   */
}

export default Trainer
