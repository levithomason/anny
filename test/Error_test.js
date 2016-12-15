import _ from 'lodash'
import ERROR from '../src/Error'

describe('ERROR', () => {
  it('contains only function properties', () => {
    _.forEach(ERROR, (fn) => {
      fn.should.be.a('function')
    })
  })

  it('has no anonymous functions', () => {
    _.forEach(ERROR, (fn, name) => {
      fn.name.should.equal(name)
    })
  })

  it('has methods that return numbers', () => {
    _.forEach(ERROR, (fn) => {
      fn([1, 2, 3], [2, 3, 4]).should.be.a('number')
    })
  })

  describe('rootMeanSquared', () => {
    it('returns the square root of meanSquared', () => {
      const expected = [1, 2, 3]
      const actual = [2, 3, 4]
      const meanSquare = ERROR.meanSquared(expected, actual)
      const SQRT_MSE = Math.sqrt(meanSquare)
      const RMS = ERROR.rootMeanSquared(expected, actual)

      RMS.should.equal(SQRT_MSE)
    })
  })
})
