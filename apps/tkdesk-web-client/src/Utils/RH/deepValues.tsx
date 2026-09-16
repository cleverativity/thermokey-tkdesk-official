import * as R from 'ramda'

/**
 * This functions retrive all the values in a objects three structure
 * It's like the R.values, besides the fact that if a value is an object
 * is called recursevely.
 * @sign Object -> [a]
 */
const deepValues = (obj: any) => {
  const results: any = []
  const inputs = [obj]

  while (!R.isEmpty(inputs)) {
    const val = inputs.pop()

    if (R.is(Object, val)) {
      inputs.push(...R.values(val))
    } else {
      // val is a leaf
      results.push(val)
    }
  }

  return R.reverse(results)
}

export default deepValues
