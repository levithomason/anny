import _ from 'lodash'
import * as util from '../src/Util'

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

  describe('type', () => {
    it('returns the same value as Object.prototype.toString.call()', () => {
      const types = [undefined, null, true, 0, '', [], {}, _.noop]
      _.forEach(types, (type) => {
        util.type(type).should.equal(Object.prototype.toString.call(type))
      })
    })
  })
})
