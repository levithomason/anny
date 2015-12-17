import _ from 'lodash'
import util from '../src/Util'

describe('util', () => {
  describe('normalize', () => {
    it('scales an array of numbers to -1 and 1', () => {
      const normalized = util.normalize(_.range(-100, 100))
      _.max(normalized).should.equal(1)
      _.min(normalized).should.equal(-1)
    })

    it('works with positive numbers', () => {
      const normalized = util.normalize(_.range(0, 100))
      _.max(normalized).should.equal(1)
      _.min(normalized).should.equal(-1)
    })

    it('works with negative numbers', () => {
      const normalized = util.normalize(_.range(-100, 0))
      _.max(normalized).should.equal(1)
      _.min(normalized).should.equal(-1)
    })

    it('allows arbitrary data min and max scale factors', () => {
      const dataMin = -8
      const dataMax = 8
      const normalized = util.normalize([0, 2, 4, 6, 8], dataMin, dataMax)
      _.max(normalized).should.equal(1)
      _.min(normalized).should.equal(0)
    })

    it('throws if a value falls beyond the scale range', () => {
      expect(() => {
        const dataMin = 0
        const dataMax = 10
        util.normalize([0, 11], dataMin, dataMax)
      })
        .to.throw('11 is beyond the scale range: 0 to 10')
    })
  })

  describe('getApproximateDerivative', () => {
    it('returns a function', () => {
      util.getApproximateDerivative(_.noop).should.be.a('function')
    })
    it('returns a function that returns a number', () => {
      const derivative = util.getApproximateDerivative(Math.sin)
      derivative(_.random()).should.be.a('number')
    })
  })

  describe('validateTrainingData', () => {
    let netInputSize = 1
    let netOutputSize = 1
    let data = [{input: [0], output: [0]}]
    const network = {
      inputLayer: {size: () => netInputSize},
      outputLayer: {size: () => netOutputSize},
    }

    const validate = () => util.validateTrainingData(network, data)

    it('does not throw with valid training data and network', () => {
      expect(validate).not.to.throw()
    })

    it('throws if training data is not array', () => {
      data = 'not array'
      expect(validate).to.throw()
    })

    it('throws if training data is an empty array', () => {
      data = []
      expect(validate).to.throw()
    })

    it('throws if training array elements are not plain objects', () => {
      _.each([undefined, null, 'not a POJO', 1, [], _.noop], type => {
        data = [type]
        expect(validate).to.throw()
      })
    })

    it('throws if training objects do not have an "input" array', () => {
      _.each([undefined, null, 'not an array', 1, {}, _.noop], type => {
        data.input = type
        expect(validate).to.throw()
      })
    })

    it('throws if training objects do not have an "output" array', () => {
      _.each([undefined, null, 'not an array', 1, {}, _.noop], type => {
        data.output = type
        expect(validate).to.throw()
      })
    })

    it('throws if training data "input" is an empty array', () => {
      data.input = []
      expect(validate).to.throw()
    })

    it('throws if training data "output" is an empty array', () => {
      data.output = []
      expect(validate).to.throw()
    })

    it('throws if training data "input" contains a non-number', () => {
      _.each([undefined, null, 'NaN', {}, [], _.noop], type => {
        data.input[0] = type
        expect(validate).to.throw()
      })
    })

    it('throws if training data "input" contains a non-number', () => {
      _.each([undefined, null, 'NaN', {}, [], _.noop], type => {
        data.output[0] = type
        expect(validate).to.throw()
      })
    })

    it('throws if data "input" size !== network input size', () => {
      netInputSize = 1
      data[0].input = [0, 0]
      expect(validate).to.throw()
    })

    it('throws if data "output" size !== network output size', () => {
      netOutputSize = 1
      data[0].output = [0, 0]
      expect(validate).to.throw()
    })
  })
})
