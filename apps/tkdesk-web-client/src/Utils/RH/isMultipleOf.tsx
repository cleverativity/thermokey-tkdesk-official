/**
 * This function returns if a number is a multiple of another, and works with floating
 * values within a given decimal precision.
 * @param {Number} value - the value that is a multiple
 * @param {Number} multiplier - the value to be a multiple of
 * @param {Number} [precision=0]  - the precision
 * @returns {Boolean}
 */
function isMultipleOf(value: number, multiplier: number, precision = 0) {
  const precisionPower = 10 ** precision

  // We expect to deal with numbers with a precision of `precision` digits,
  // so to check if the number is a multiple we must multiply both numbers
  // to 10^`precision` and round it
  // eg  with a `precision` = 4
  //     5.23% = 0.0524   0.0524 * 1e4 = 524
  //     1.31% = 0.0131   0.0131 * 1e4 = 131

  const intValue = Math.round(value * precisionPower)
  const intMultiplier = Math.round(multiplier * precisionPower)

  // console.log(`intValue: ${intValue}, intMultiplier: ${intMultiplier}`)
  // console.log(`intMultiplier % intValue ${intMultiplier % intValue}`)

  return intValue >= intMultiplier && intValue % intMultiplier === 0
}

export default isMultipleOf
