import * as R from 'ramda'

/**
 * This functions maps a function to every element of the array
 * and then merges toghether all the resulted arrays.
 * Tipically use to calculate combinations of values
 * @sign (a -> [b]) -> [a] -> [b]
 * @example
 *  const letters = ['a', 'b', 'c']
 *  const numbers = [1, 2, 3]
 *
 *  const lettersXnumbers = RH.flatMap(
 *    letter => R.map(number => [number, letter], numbers),
 *    letters
 *  )
 */
const flatMap = R.curry((f, as) => R.pipe(R.map(f), R.unnest)(as))

export default flatMap
