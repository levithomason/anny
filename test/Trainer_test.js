import _ from 'lodash'
import Trainer from '../src/Trainer'
import Network from '../src/Network'
import DATA from '../src/Data'
let trainer
let network
let data
let sandbox

describe('Trainer', () => {
  beforeEach(() => {
    trainer = new Trainer()
    network = new Network([2, 1])
    data = DATA.ORGate
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('train', () => {
    it('is a function', () => {
      trainer.train.should.be.a('function')
    })

    describe('options', () => {
      describe('errorThreshold', () => {
        it('controls how low the "error" must become before succeeding', () => {
          // Infinity means we'll always have instant training success
          trainer.train(network, data, {
            errorThreshold: Infinity,
            onSuccess: (error, epoch) => epoch.should.equal(1),
          })
        })
      })

      describe('frequency', () => {
        it('controls how often "onProgress" is called', () => {
          const frequency = _.random(1, 10)
          let counter = 1
          trainer.train(network, data, {
            maxEpochs: 100,
            frequency,
            onProgress: (error, epoch) => {
              epoch.should.equal(frequency * counter)
              counter += 1
            },
          })
        })
      })

      describe('maxEpochs', () => {
        it('controls long the network trains for', () => {
          const maxEpochs = _.random(1, 100)
          // cannot solve XOR, would run forever
          trainer.train(network, DATA.XORGate, {
            maxEpochs,
            onFail: (error, epoch) => epoch.should.equal(maxEpochs),
          })
        })
      })

      describe('onFail', () => {
        it('is called when max epochs is reached', () => {
          trainer.train(network, data, {
            maxEpochs: 1,
            onFail: (error, epoch) => epoch.should.equal(1),
          })
        })

        it('is called with "error" and "epoch" values', () => {
          trainer.train(network, data, {
            maxEpochs: 1,
            onFail: (error, epoch) => {
              epoch.should.be.a('number')
              epoch.should.equal(1)
              error.should.be.a('number')
            },
          })
        })
      })

      describe('onProgress', () => {
        it('is called with "error" and "epoch" values', () => {
          trainer.train(network, data, {
            maxEpochs: 1,
            onProgress: (error, epoch) => {
              epoch.should.be.a('number')
              epoch.should.equal(1)
              error.should.be.a('number')
            },
          })
        })

        it('stops training when false is returned', () => {
          // cannot solve XOR, would run run forever
          network = new Network([2, 1])
          trainer.train(network, DATA.XORGate, {
            // ensure we run a few epochs, calling progress every epoch
            maxEpochs: 5,
            frequency: 1,
            onProgress: (error, epoch) => {
              // we should only hit the first epoch
              epoch.should.equal(1)
              return false
            },
          })
        })
      })

      describe('onSuccess', () => {
        it('is called when "error" falls below "errorThreshold"', () => {
          trainer.train(network, data, {
            errorThreshold: Infinity,
            onSuccess: (error, epoch) => epoch.should.equal(1),
          })
        })

        it('is called with "error" and "epoch" values', () => {
          trainer.train(network, data, {
            maxEpochs: 1,
            onSuccess: (error, epoch) => {
              epoch.should.be.a('number')
              epoch.should.equal(1)
              error.should.be.a('number')
            },
          })
        })
      })
    })
  })
})
