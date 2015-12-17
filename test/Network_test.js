import _ from 'lodash'
import Network from '../src/Network'
import Layer from '../src/Layer'
import DATA from '../src/Data'
let network

describe('Network', () => {
  beforeEach(() => {
    network = new Network([1, 1])
  })

  it('throws if "layerSizes" param is not an array', () => {
    const nonArrays = [null, undefined, 'hi', _.random(999), {}, !0, !1, NaN]
    const misuse = item => new Network(item)
    _.each(nonArrays, item => expect(_.partial(misuse, item)).to.throw())
  })

  it('throws if "layerSizes" param is empty', () => {
    const empties = [{}, []]
    const misuse = item => new Network(item)
    _.each(empties, item => expect(_.partial(misuse, item)).to.throw())
  })

  it('throws if any "layerSizes" item is not a number', () => {
    const nonNumbers = [null, undefined, 'hi', [], {}, !0, !1, NaN]
    const misuse = item => new Network(item)
    _.each(nonNumbers, item => expect(_.partial(misuse, item)).to.throw())
  })

  it('initializes with a "null" error', () => {
    expect(network.error).to.equal(null)
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

  describe('train', () => {
    it('is a function', () => {
      network.train.should.be.a('function')
    })

    it('learns an OR gate', () => {
      network = new Network([2, 1])
      network.train(DATA.ORGate, _.noop)
      expect(network.error).to.be.below(network.errorThreshold)
    })

    it('learns a XOR gate', () => {
      // TODO: this should be possible with 2, 3, 1 but is intermittent.
      network = new Network([2, 5, 3, 1])
      network.train(DATA.XORGate, _.noop)
      expect(network.error).to.be.below(network.errorThreshold)
    })

    it('learns an AND gate', () => {
      network = new Network([2, 3, 1])
      network.train(DATA.ANDGate, _.noop)
      expect(network.error).to.be.below(network.errorThreshold)
    })

    it('learns a NAND gate', () => {
      network = new Network([2, 3, 1])
      network.train(DATA.NANDGate, _.noop)
      expect(network.error).to.be.below(network.errorThreshold)
    })
  })
})
