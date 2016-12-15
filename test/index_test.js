import index from '../src/index'

describe('index', () => {
  it('has activation functions', () => {
    expect(index)
      .to.have.property('ACTIVATION')
      .which.is.an('object')
  })

  it('has data', () => {
    expect(index)
      .to.have.property('DATA')
      .which.is.an('object')
  })

  it('has error functions', () => {
    expect(index)
      .to.have.property('ERROR')
      .which.is.an('object')
  })

  it('has initializer helpers', () => {
    expect(index)
      .to.have.property('INITIALIZE')
      .which.is.an('object')
  })

  it('has a Neuron constructor', () => {
    expect(index)
      .to.have.property('Neuron')
      .which.is.a('function')
  })

  it('has a Layer constructor', () => {
    expect(index)
      .to.have.property('Layer')
      .which.is.a('function')
  })

  it('has a Network constructor', () => {
    expect(index)
      .to.have.property('Network')
      .which.is.a('function')
  })

  it('has utils', () => {
    expect(index)
      .to.have.property('util')
      .which.is.an('object')
  })

  it('has validation', () => {
    expect(index)
      .to.have.property('validate')
      .which.is.an('object')
  })
})
