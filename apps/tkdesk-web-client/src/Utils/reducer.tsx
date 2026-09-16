import _ from 'lodash'
/**
 * Creates a reducer unction from an object of reducing functions in which every
 * key is the actions constant that triggers the reducing funtion
 * @param {Object} actionsObject
 * @example
 *
 * const reducerObject = {
 *    ACTION_A: (state, action) => ....
 *    ACTION_B: (state) => ...
 *    ACTION_C: (state, {payload}) => ....
 * }
 *
 * const reducer = createReducer(reducerObject)
 */
export function createReducer(actionsObject: any) {
  return function createdReducer(state: any, action: any) {
    const { type } = action

    const reducer = _.get(actionsObject, type)

    return !_.isNil(reducer) ? reducer(state, action) : state
  }
}
