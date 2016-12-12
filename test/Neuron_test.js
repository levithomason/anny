import _ from 'lodash'
import ACTIVATION from '../src/Activation'
import Neuron from '../src/Neuron'
const inputValues = [-1, 0, 1]
let neuron

describe('Neuron', () => {
  beforeEach(() => {
    neuron = new Neuron()
  })

  describe('constructor', () => {
    it('has a default learning rate', () => {
      neuron.learningRate.should.be.a('number')
    })
    it('accepts a learning rate', () => {
      const rate = _.random(true)
      const n = new Neuron(null, rate)
      n.learningRate.should.equal(rate)
    })
    it('has a default tanh activation', () => {
      neuron.activation.should.deep.equal(ACTIVATION.tanh)
    })
    it('accepts an activation function', () => {
      const activation = { foo: 'bar' }
      const n = new Neuron(activation)
      n.activation.should.deep.equal(activation)
    })
  })

  describe('activate', () => {
    it('always outputs 1 if isBias Neuron', () => {
      neuron.isBias = true
      inputValues.forEach((n) => {
        neuron.activate(n).should.equal(1)
      })
    })
    it('sets the input when specified', () => {
      inputValues.forEach(n => {
        neuron.activate(n)
        neuron.input.should.equal(n)
      })
    })
    it('sums input from output of Neurons connect to it', () => {
      const sourceA = new Neuron()
      const sourceB = new Neuron()
      sourceA.output = 1
      sourceB.output = 1

      sourceA.connect(neuron, 1)
      sourceB.connect(neuron, 1)

      neuron.activate()
      neuron.input.should.equal(2)
    })
  })

  describe('isInput', () => {
    it('is true when it has no incoming connections', () => {
      neuron.isInput().should.be.equal(true)
    })
    it('is false when it has incoming connections', () => {
      const input = new Neuron()
      input.connect(neuron, 1)
      neuron.isInput().should.be.equal(false)
    })
  })

  describe('isOutput', () => {
    it('is true when it has no outgoing connections', () => {
      neuron.isOutput().should.be.equal(true)
    })
    it('is false when it has outgoing connections', () => {
      const output = new Neuron()
      neuron.connect(output, 1)
      neuron.isOutput().should.be.equal(false)
    })
  })
})
