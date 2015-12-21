import _ from 'lodash'
import Network from '../src/Network'
import Layer from '../src/Layer'
import DATA from '../src/Data'
let network
let data
let sandbox

describe('Network', () => {
  beforeEach(() => {
    network = new Network([2, 1])
    data = DATA.ORGate
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('validation', () => {
    const newNetwork = item => new Network(item)

    it('throws if "layerSizes" param is not an array', () => {
      const nonArrays = [null, undefined, 'a', _.random(99), _.noop, {}, !0, !1]
      _.each(nonArrays, item => expect(_.partial(newNetwork, item)).to.throw())
    })

    it('throws if "layerSizes" param is empty', () => {
      const empties = [{}, []]
      _.each(empties, item => expect(_.partial(newNetwork, item)).to.throw())
    })

    it('throws if any "layerSizes" item is not a number', () => {
      const nonNumbers = [null, undefined, 'a', _.noop, [], {}, !0, !1, NaN]
      _.each(nonNumbers, item => expect(_.partial(newNetwork, item)).to.throw())
    })
  })

  describe('constructor', () => {
    it('initializes with a "null" error', () => {
      expect(network.error).to.equal(null)
    })

    it('has all layers in a single array', () => {
      network = new Network([1, 1, 1])
      network.allLayers.should.have.a.lengthOf(3)
      _.each(network.allLayers, layer => layer.should.be.an.instanceOf(Layer))
    })

    it('has an input layer', () => {
      network.inputLayer.should.be.an.instanceOf(Layer)
    })

    it('has an output layer', () => {
      network.outputLayer.should.be.an.instanceOf(Layer)
    })

    it('has hidden layers', () => {
      _.each(network.hiddenLayers, (layer) => {
        layer.should.be.an.instanceOf(Layer)
      })
    })
  })

  describe('activate', () => {
    it('calls activate on the input layer', () => {
      network.inputLayer.activate = sandbox.spy()
      network.inputLayer.activate.called.should.equal(false)
      network.activate()
      network.inputLayer.activate.called.should.equal(true)
    })

    it('calls activate on the input layer', () => {
      network = new Network([2, 2, 1])
      _.each(network.hiddenLayers, l => l.activate = sandbox.spy())
      _.each(network.hiddenLayers, l => l.activate.called.should.equal(false))
      network.activate()
      _.each(network.hiddenLayers, l => l.activate.called.should.equal(true))
    })

    it('calls activate on the output layer', () => {
      network.outputLayer.activate = sandbox.spy()
      network.outputLayer.activate.called.should.equal(false)
      network.activate()
      network.outputLayer.activate.called.should.equal(true)
    })
  })

  describe('correct', () => {
    it('calls train on the input layer', () => {
      network.inputLayer.train = sandbox.spy()
      network.inputLayer.train.called.should.equal(false)
      network.correct()
      network.inputLayer.train.called.should.equal(true)
    })

    it('calls train on the input layer', () => {
      network = new Network([2, 2, 1])
      _.each(network.hiddenLayers, l => l.train = sandbox.spy())
      _.each(network.hiddenLayers, l => l.train.called.should.equal(false))
      network.correct()
      _.each(network.hiddenLayers, l => l.train.called.should.equal(true))
    })

    it('calls train on the output layer', () => {
      network.outputLayer.train = sandbox.spy()
      network.outputLayer.train.called.should.equal(false)
      network.correct()
      network.outputLayer.train.called.should.equal(true)
    })
  })

  describe('train', () => {
    it('is a function', () => {
      network.train.should.be.a('function')
    })

    describe('options', () => {
      const misuse = badOptions => network.train(data, badOptions)

      describe('validation', () => {
        it('throws if "errorThreshold" is not a number', () => {
          expect(_.partial(misuse, {errorThreshold: ''})).to.throw()
        })

        it('throws if "frequency" is not a number', () => {
          expect(_.partial(misuse, {frequency: ''})).to.throw()
        })

        it('throws if "maxEpochs" is not a number', () => {
          expect(_.partial(misuse, {maxEpochs: ''})).to.throw()
        })

        it('throws if "onFail" is not a function', () => {
          expect(_.partial(misuse, {onFail: ''})).to.throw()
        })

        it('throws if "onProgress" is not a function', () => {
          expect(_.partial(misuse, {onProgress: ''})).to.throw()
        })

        it('throws if "onSuccess" is not a function', () => {
          expect(_.partial(misuse, {onSuccess: ''})).to.throw()
        })
      })

      describe('errorThreshold', () => {
        it('controls how low the "error" must become before succeeding', () => {
          // Infinity means we'll always have instant training success
          network.train(data, {
            errorThreshold: Infinity,
            onSuccess: (error, epoch) => epoch.should.equal(1),
          })
        })
      })

      describe('frequency', () => {
        it('controls how often "onProgress" is called', () => {
          const frequency = _.random(1, 10)
          let counter = 1
          network.train(data, {
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
          network = new Network([2, 1]).train(data, {
            maxEpochs,
            onFail: (error, epoch) => epoch.should.equal(maxEpochs),
          })
        })
      })

      describe('onFail', () => {
        it('is called when max epochs is reached', () => {
          network.train(data, {
            maxEpochs: 1,
            onFail: (error, epoch) => epoch.should.equal(1),
          })
        })

        it('is called with "error" and "epoch" values', () => {
          network.train(data, {
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
          network.train(data, {
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
          network.train(DATA.XORGate, {
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
          network.train(data, {
            errorThreshold: Infinity,
            onSuccess: (error, epoch) => epoch.should.equal(1),
          })
        })

        it('is called with "error" and "epoch" values', () => {
          network.train(data, {
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
