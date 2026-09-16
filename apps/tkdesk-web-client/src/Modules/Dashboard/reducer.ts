import { createReducer } from '@reduxjs/toolkit'
import * as R from 'ramda'
import actions from './actions'

const initState = {
  generic: {
    params: {},
    data: {},
    loading: true,
    error: false,
  },
}

const genericReducer = createReducer(initState, (builder) => {
  builder
    // ROUTE
    .addCase(actions.generic.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.generic.load, (s, action: any) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.generic.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.generic.loadSuccess, (s, action: any) => {
      const { values } = action.payload

      return {
        ...s,
        data: values,
        loading: false,
        error: false,
      }
    })
})

export default function reducer(preState = initState, action: any) {
  return R.pipe(
    R.over<any, any>(R.lensProp('generic'), (state) =>
      genericReducer(state, action),
    ),
  )(preState)
}
