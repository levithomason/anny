import _ from 'lodash'
import validate from '../src/Validate'

import Network from '../src/Network'

let sample
let data
let network
let sandbox

// helper that returns a function that calls validate with the args passed.
// this is somewhat like _.invoke + _.partial
const invoke = (func, ...args) => {
  return () => func(...args)
}

describe('Validate', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sample = {input: [0], output: [0]}
    data = [sample]
    network = new Network([1, 1])
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('dataIsArray', () => {
    it('throws if training data is not array', () => {
      data = 'not array'
      expect(invoke(validate.dataIsArray, data)).to.throw()
    })

    it('does not throw if training data is array', () => {
      data = ['array']
      expect(invoke(validate.dataIsArray, data)).not.to.throw()
    })
  })

  describe('dataIsNotEmpty', () => {
    it('throws if training data is an empty array', () => {
      data = []
      expect(invoke(validate.dataIsNotEmpty, data)).to.throw()
    })

    it('does not throw if training data array is populated', () => {
      data = ['item']
      expect(invoke(validate.dataIsNotEmpty, data)).not.to.throw()
    })
  })

  describe('sampleIsObject', () => {
    it('throws if training samples are not plain objects', () => {
      _.each([undefined, null, 'not a POJO', 1, [], _.noop], type => {
        sample = type
        expect(invoke(validate.sampleIsObject, sample, 0)).to.throw()
      })
    })

    it('does not throw if training samples are plain objects', () => {
      sample = {}
      expect(invoke(validate.sampleIsObject, sample, 0)).not.to.throw()
    })
  })

  describe('sampleHasInput', () => {
    it('throws if training objects do not have an "input" array', () => {
      _.each([undefined, null, 'not an array', 1, {}, _.noop], type => {
        sample.input = type
        expect(invoke(validate.sampleHasInput, sample, 0)).to.throw()
      })
    })

    it('does not throw if training objects have an "input" array', () => {
      sample.input = []
      expect(invoke(validate.sampleHasInput, sample, 0)).not.to.throw()
    })
  })

  describe('sampleHasOutput', () => {
    it('throws if training objects do not have an "output" array', () => {
      _.each([undefined, null, 'not an array', 1, {}, _.noop], type => {
        sample.output = type
        expect(invoke(validate.sampleHasOutput, sample, 0)).to.throw()
      })
    })

    it('does not throw if training objects have an "output" array', () => {
      sample.output = []
      expect(invoke(validate.sampleHasOutput, sample, 0)).not.to.throw()
    })
  })

  describe('sampleInputIsNotEmpty', () => {
    it('throws if training sample "input" is an empty array', () => {
      sample.input = []
      expect(invoke(validate.sampleInputIsNotEmpty, sample, 0)).to.throw()
    })

    it('does not throw if training sample "input" array is populated', () => {
      sample.input = ['stuff']
      expect(invoke(validate.sampleInputIsNotEmpty, sample, 0)).not.to.throw()
    })
  })

  describe('sampleOutputIsNotEmpty', () => {
    it('throws if training sample "output" is an empty array', () => {
      sample.output = []
      expect(invoke(validate.sampleOutputIsNotEmpty, sample, 0)).to.throw()
    })

    it('does not throw if training sample "output" array is populated', () => {
      sample.output = ['stuff']
      expect(invoke(validate.sampleOutputIsNotEmpty, sample, 0)).not.to.throw()
    })
  })

  describe('sampleInputIsOnlyNumbers', () => {
    it('throws if training sample "input" contains a non-number', () => {
      _.each([undefined, null, 'a', {}, [], _.noop], type => {
        sample.input[0] = type
        expect(invoke(validate.sampleInputIsOnlyNumbers, sample, 0)).to.throw()
      })
    })

    it('does not throw if training sample "input" contains a number', () => {
      sample.input[0] = 1
      expect(invoke(validate.sampleInputIsOnlyNumbers, sample, 0))
        .not.to.throw()
    })
  })

  describe('sampleOutputIsOnlyNumbers', () => {
    it('throws if training sample "output" contains a non-number', () => {
      _.each([undefined, null, 'hi', {}, [], _.noop], type => {
        sample.output[0] = type
        expect(invoke(validate.sampleOutputIsOnlyNumbers, sample, 0)).to.throw()
      })
    })

    it('does not throw if training sample "output" contains a number', () => {
      sample.output[0] = 1
      expect(invoke(validate.sampleOutputIsOnlyNumbers, sample, 0))
        .not.to.throw()
    })
  })

  describe('sampleInputFitsNetwork', () => {
    it('throws if sample "input" size !== network input size', () => {
      network = new Network([1, 1])
      sample.input = [0, 0]
      expect(invoke(validate.sampleInputFitsNetwork, sample, 0, network))
        .to.throw()
    })

    it('does not throw if sample "input" size === network input size', () => {
      network = new Network([2, 1])
      sample.input = [0, 0]
      expect(invoke(validate.sampleInputFitsNetwork, sample, 0, network))
        .not.to.throw()
    })
  })

  describe('sampleOutputFitsNetwork', () => {
    it('throws if sample "output" size !== network output size', () => {
      network = new Network([1, 1])
      sample.output = [0, 0]
      expect(invoke(validate.sampleOutputFitsNetwork, sample, 0, network))
        .to.throw()
    })

    it('does not throw if sample "output" size === network output size', () => {
      network = new Network([1, 2])
      sample.output = [0, 0]
      expect(invoke(validate.sampleOutputFitsNetwork, sample, 0, network))
        .not.to.throw()
    })
  })

  describe('trainingData', () => {
    it(`calls dataIsArray`, () => {
      sandbox.spy(validate, 'dataIsArray')
      validate.trainingData(network, data)
      validate.dataIsArray.called.should.equal(true)
    })

    it(`calls dataIsNotEmpty`, () => {
      sandbox.spy(validate, 'dataIsNotEmpty')
      validate.trainingData(network, data)
      validate.dataIsNotEmpty.called.should.equal(true)
    })

    it(`calls sampleIsObject`, () => {
      sandbox.spy(validate, 'sampleIsObject')
      validate.trainingData(network, data)
      validate.sampleIsObject.called.should.equal(true)
    })

    it(`calls sampleHasInput`, () => {
      sandbox.spy(validate, 'sampleHasInput')
      validate.trainingData(network, data)
      validate.sampleHasInput.called.should.equal(true)
    })

    it(`calls sampleHasOutput`, () => {
      sandbox.spy(validate, 'sampleHasOutput')
      validate.trainingData(network, data)
      validate.sampleHasOutput.called.should.equal(true)
    })

    it(`calls sampleInputIsNotEmpty`, () => {
      sandbox.spy(validate, 'sampleInputIsNotEmpty')
      validate.trainingData(network, data)
      validate.sampleInputIsNotEmpty.called.should.equal(true)
    })

    it(`calls sampleOutputIsNotEmpty`, () => {
      sandbox.spy(validate, 'sampleOutputIsNotEmpty')
      validate.trainingData(network, data)
      validate.sampleOutputIsNotEmpty.called.should.equal(true)
    })

    it(`calls sampleInputIsOnlyNumbers`, () => {
      sandbox.spy(validate, 'sampleInputIsOnlyNumbers')
      validate.trainingData(network, data)
      validate.sampleInputIsOnlyNumbers.called.should.equal(true)
    })

    it(`calls sampleOutputIsOnlyNumbers`, () => {
      sandbox.spy(validate, 'sampleOutputIsOnlyNumbers')
      validate.trainingData(network, data)
      validate.sampleOutputIsOnlyNumbers.called.should.equal(true)
    })

    it(`calls sampleInputFitsNetwork`, () => {
      sandbox.spy(validate, 'sampleInputFitsNetwork')
      validate.trainingData(network, data)
      validate.sampleInputFitsNetwork.called.should.equal(true)
    })

    it(`calls sampleOutputFitsNetwork`, () => {
      sandbox.spy(validate, 'sampleOutputFitsNetwork')
      validate.trainingData(network, data)
      validate.sampleOutputFitsNetwork.called.should.equal(true)
    })
  })
})
