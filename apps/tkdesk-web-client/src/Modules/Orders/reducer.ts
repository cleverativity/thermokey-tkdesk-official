import actions from './actions'
import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import * as REDParams from 'Generic/SearchParams/reducer'

const initState: GlobalState = {
  search: {
    params: {
      orders: { order: 'descend', field: 'created_at' },
      filters: { status: [] },
      query: '',
      pagination: {},
    },
    data: [],
    loading: true,
    error: false,
  },
  detail: {
    data: {},
    loading: true,
    error: false,
  },
}

const searchReducer = createReducer(initState.search, (builder) => {
  builder

    // ROUTE
    .addCase(actions.search.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.search.load, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.search.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.search.loadSuccess, (s, action) => {
      const { orders, pagination } = action.payload

      return {
        ...s,
        data: orders,
        loading: false,
        error: false,
        params: {
          ...s?.params,
          pagination: {
            ...s?.params.pagination,
            ...pagination,
          },
        },
      }
    })

    .addCase(actions.search.updateQueryParameters, (s, action) => {
      return REDParams.createUpdateQueryParametersCase(
        initState.search,
        s,
        action
      )
    })

    // CHANGE STATUS
    .addCase(actions.search.changeStatus, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.search.changeStatusFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.search.changeStatusSuccess, (s, action) => {
      const { order } = action.payload
      return {
        ...s,
        data: order,
        loading: false,
        error: false,
      }
    })
})

const detailReducer = createReducer(initState.detail, (builder) => {
  builder

    // ROUTE
    .addCase(actions.detail.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.detail.load, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.detail.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.loadSuccess, (s, action) => {
      const { order } = action.payload
      return {
        ...s,
        data: order,
        loading: false,
        error: false,
      }
    })
})

export default function reducer(preState = initState, history: any) {
  const search = searchReducer(_.get(preState, 'search'), history)
  const detail = detailReducer(_.get(preState, 'detail'), history)
  const state: any = { search, detail }

  return state
}
