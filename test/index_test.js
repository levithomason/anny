import index from '../src/index'

describe('index', () => {
  it('has activation functions', () => {
    index.ACTIVATION.should.be.a('object')
  })

  it('has data', () => {
    index.DATA.should.be.a('object')
  })

  it('has error functions', () => {
    index.ERROR.should.be.a('object')
  })

  it('has initializer helpers', () => {
    index.INITIALIZE.should.be.a('object')
  })

  it('has a Neuron constructor', () => {
    index.Neuron.should.be.a('function')
  })

  it('has a Layer constructor', () => {
    index.Layer.should.be.a('function')
  })

  it('has a Network constructor', () => {
    index.Network.should.be.a('function')
  })

  it('has utils', () => {
    index.util.should.be.a('object')
  })

  it('has validation', () => {
    index.validate.should.be.a('object')
  })
})
