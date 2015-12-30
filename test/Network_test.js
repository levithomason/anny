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

  describe('backprop', () => {
    it('calls backprop on the output layer', () => {
      network.outputLayer.backprop = sandbox.spy()
      network.outputLayer.backprop.called.should.equal(false)
      network.backprop()
      network.outputLayer.backprop.called.should.equal(true)
    })

    it('calls backprop on each hidden layer', () => {
      network = new Network([2, 2, 1])
      _.each(network.hiddenLayers, l => l.backprop = sandbox.spy())
      _.each(network.hiddenLayers, l => l.backprop.called.should.equal(false))
      network.backprop()
      _.each(network.hiddenLayers, l => l.backprop.called.should.equal(true))
    })

    it('calls backprop on the input layer', () => {
      network.inputLayer.backprop = sandbox.spy()
      network.inputLayer.backprop.called.should.equal(false)
      network.backprop()
      network.inputLayer.backprop.called.should.equal(true)
    })
  })
})
