import _ from 'lodash'
import Network from '../src/Network'
import Layer from '../src/Layer'

let network
let sandbox

describe('Network', () => {
  beforeEach(() => {
    network = new Network([new Layer(2), new Layer(1)])
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('validation', () => {
    const newNetwork = item => new Network(item)

    it('throws if "layerSizes" param is not an array', () => {
      const nonArrays = [null, undefined, 'a', _.random(99), _.noop, {}, !0, !1]
      _.forEach(nonArrays, item => expect(_.partial(newNetwork, item)).to.throw())
    })

    it('throws if "layerSizes" param is empty', () => {
      const empties = [{}, []]
      _.forEach(empties, item => expect(_.partial(newNetwork, item)).to.throw())
    })

    it('throws if any "layerSizes" item is not a number', () => {
      const nonNumbers = [null, undefined, 'a', _.noop, [], {}, !0, !1, NaN]
      _.forEach(nonNumbers, item => expect(_.partial(newNetwork, item)).to.throw())
    })
  })

  describe('constructor', () => {
    it('initializes with a "0" error', () => {
      expect(network.error).to.equal(0)
    })

    it('has all layers in a single array', () => {
      network = new Network([new Layer(1), new Layer(1), new Layer(1)])
      network.allLayers.should.have.a.lengthOf(3)
      _.forEach(network.allLayers, layer => layer.should.be.an.instanceOf(Layer))
    })

    it('has an input layer', () => {
      network.inputLayer.should.be.an.instanceOf(Layer)
    })

    it('has an output layer', () => {
      network.outputLayer.should.be.an.instanceOf(Layer)
    })

    it('has hidden layers', () => {
      _.forEach(network.hiddenLayers, (layer) => {
        layer.should.be.an.instanceOf(Layer)
      })
    })
  })

  describe('activate', () => {
    it('calls activate on the input layer', () => {
      network.inputLayer.activate = sandbox.spy()
      network.inputLayer.activate.should.not.have.been.called()
      network.activate()
      network.inputLayer.activate.should.have.been.calledOnce()
    })

    it('calls activate on each hidden layer', () => {
      network = new Network([new Layer(2), new Layer(2), new Layer(1)])
      _.forEach(network.hiddenLayers, l => sandbox.spy(l, 'activate'))

      network.activate()

      _.forEach(network.hiddenLayers, (l) => {
        l.activate.should.have.been.calledOnce()
        l.activate.restore()
      })
    })

    it('calls activate on the output layer', () => {
      network.outputLayer.activate = sandbox.spy()
      network.outputLayer.activate.should.not.have.been.called()
      network.activate()
      network.outputLayer.activate.should.have.been.calledOnce()
    })
  })

  describe('backprop', () => {
    it('calls backprop on the output layer', () => {
      network.outputLayer.backprop = sandbox.spy()
      network.outputLayer.backprop.should.not.have.been.called()
      network.backprop()
      network.outputLayer.backprop.should.have.been.calledOnce()
    })

    it('calls backprop on each hidden layer', () => {
      network = new Network([new Layer(2), new Layer(2), new Layer(1)])
      _.forEach(network.hiddenLayers, l => sandbox.spy(l, 'backprop'))

      network.backprop()

      _.forEach(network.hiddenLayers, (l) => {
        l.backprop.should.have.been.calledOnce()
        l.backprop.restore()
      })
    })

    it('does not call backprop on the input layer', () => {
      network.inputLayer.backprop = sandbox.spy()
      network.backprop()
      network.inputLayer.backprop.should.not.have.been.called()
    })
  })
})
