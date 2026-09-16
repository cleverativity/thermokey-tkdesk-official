import * as R from 'ramda'

/**
 * This functions flattens all the objects inside the main object contatenating
 * all the keys in an unique key.
 *
 * @param {Object} obj - the object to flatten
 * @param {Object} [options={}] - config params
 * @param {String} [options.keysSeparator='.'] - the string to use to separate each key
 */
const flattenObjectKeys = (obj: any, { keysSeparator = '.' }: any = {}) => {
  const go: any = (obj_: any) =>
    R.chain<any, any>((props: any) => {
      const [k, v] = props
      if (R.type(v) === 'Object' || R.type(v) === 'Array') {
        return R.map<any, any>(
          ([k_, v_]) => [R.isEmpty(k_) ? k : `${k}${keysSeparator}${k_}`, v_],
          go(v),
        )
      } else {
        return [[k, v]] as any
      }
    }, R.toPairs(obj_))

  return R.fromPairs(go(obj))
}

export default flattenObjectKeys
