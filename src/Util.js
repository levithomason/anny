import _ from 'lodash'

/**
 * Normalizes an `array` of numbers to a range from -1 to 1. Optionally
 * specifying the `dataMin` and/or `dataMax` is useful when normalizing
 * multiple arrays that do not each contain the global min value or global
 * max value.
 * @param {number[]} array - The array to normalize.
 * @param {number} [min] - The number to use at the min value in the
 *   `array`. Defaults to the actual min `array` value.
 * @param {number} [max] - The number to use at the max value in the
 *   `array`. Defaults to the actual max `array` value.
 */
export function normalize(array, min = _.min(array), max = _.max(array)) {
  const offset = 0 - min
  const range = max - min

  return _.map(array, (n) => {
    if (n > max || n < min) {
      throw new Error(`${n} is beyond the scale range: ${min} to ${max}`)
    }
    return (n + offset) / (range / 2) - 1
  })
}

/**
 * Thin helper for use getting object type.
 * @param {*} arg The value whose type should be returned.
 */
export function type(arg) {
  return Object.prototype.toString.call(arg)
}
