import actions from './actions'
import { createReducer } from '@reduxjs/toolkit'

import * as R from 'ramda'

import * as REDParams from 'Generic/SearchParams/reducer'

const initState: GlobalState = {
  search: {
    params: {
      orders: {},
      filters: {},
      query: '',
      pagination: {},
      ranges: {},
    },
    data: [],
    loading: true,
    error: false,
  },
  create: {
    params: { isUploading: false },
    data: [],
    loading: true,
    updating: false,
    error: false,
  },
  edit: { params: undefined, data: {}, loading: true, error: false },
  detail: { params: undefined, data: {}, loading: true, error: false },
  polynomials: {
    search: {
      params: {
        orders: {},
        filters: {},
        query: '',
        pagination: {},
        fan_model_id: '',
      },
    },
    detail: { params: undefined, data: {}, loading: true, error: false },
    edit: { params: undefined, data: {}, loading: true, error: false },
    create: {
      params: undefined,
      data: [],
      loading: true,
      error: false,
    },
  },
}

// SEARCH
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
      const { fanModels, pagination } = action.payload

      return {
        ...s,
        data: fanModels,
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
        action,
      )
    })
})

// CREATE
const creationReducer = createReducer(initState.create, (builder) => {
  builder

    // ROUTE
    .addCase(actions.create.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.create.load, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.create.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.create.loadSuccess, (s, action) => {
      return {
        ...s,
        loading: false,
        error: false,
      }
    })

    // CREATION COMPLETE
    .addCase(actions.create.complete, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.create.completeFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.create.completeSuccess, (s, action) => {
      const { fan_model } = action.payload
      return {
        ...s,
        data: fan_model,
        loading: false,
        error: false,
      }
    })

    // IMPORT
    .addCase(actions.create.importFans, (s, action) => {
      return {
        ...s,
        params: { ...s.params, isUploading: true },
        loading: false,
        updating: true,
        error: false,
      }
    })
    .addCase(actions.create.importFansFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        params: { ...s.params, isUploading: false },
        loading: false,
        updating: false,
        error,
      }
    })
    .addCase(actions.create.importFansSuccess, (s, action) => {
      return {
        ...s,
        params: { ...s.params, isUploading: false },
        loading: false,
        updating: false,
        error: false,
      }
    })
})

// EDIT
const editReducer = createReducer(initState.edit, (builder) => {
  builder

    // ROUTE
    .addCase(actions.edit.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.edit.load, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.edit.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.edit.loadSuccess, (s, action) => {
      const { fan_model } = action.payload
      return {
        ...s,
        data: fan_model,
        loading: false,
        error: false,
      }
    })

    // EDIT COMPLETE
    .addCase(actions.edit.complete, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.edit.completeFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.edit.completeSuccess, (s, action) => {
      const { fan_model } = action.payload
      return {
        ...s,
        data: fan_model,
        loading: false,
        error: false,
      }
    })
})

// DETAIL
const detailReducer = createReducer(initState.detail, (builder) => {
  builder

    // ROUTE
    .addCase(actions.detail.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.detail.load, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.detail.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.loadSuccess, (s, action) => {
      const { fan_model } = action.payload
      return {
        ...s,
        data: fan_model,
        loading: false,
        error: false,
      }
    })

    // DELETE
    .addCase(actions.detail.delete, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.detail.deleteFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.deleteSuccess, (s, action) => {
      return {
        ...s,
        loading: false,
        error: false,
      }
    })
})

// SEARCH POLYNOMIAL
const searchPolynomialReducer = createReducer(
  initState.polynomials?.search,
  (builder) => {
    builder

      // ROUTE
      .addCase(actions.polynomials.search.route, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      // LOAD
      .addCase(actions.polynomials.search.load, (s, action) => {
        return { ...s, loading: true, error: false }
      })
      .addCase(actions.polynomials.search.loadFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })
      .addCase(actions.polynomials.search.loadSuccess, (s, action) => {
        const { polynomials, pagination, id } = action.payload

        return {
          ...s,
          data: polynomials,
          loading: false,
          error: false,
          params: {
            ...s?.params,
            fan_model_id: id,
            pagination: {
              ...s?.params.pagination,
              ...pagination,
            },
          },
        }
      })

      .addCase(actions.polynomials.search.delete, (s, action) => {
        return {
          ...s,
          loading: true,
          error: false,
          errorModal: false,
        }
      })
      .addCase(actions.polynomials.search.deleteFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error: false, errorModal: error }
      })
      .addCase(actions.polynomials.search.deleteSuccess, (s, action) => {
        return {
          ...s,
          loading: true,
          error: false,
          errorModal: false,
        }
      })
  },
)

// CREATE POLYNOMIAL
const creationPolynomialReducer = createReducer(
  initState.polynomials?.create,
  (builder) => {
    builder

      .addCase(actions.polynomials.create.complete, (s, action) => {
        return {
          ...s,
          loading: true,
          error: false,
        }
      })
      .addCase(actions.polynomials.create.completeFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })
      .addCase(actions.polynomials.create.completeSuccess, (s, action) => {
        const { polynomial } = action.payload
        return {
          ...s,
          data: polynomial,
          loading: false,
          error: false,
        }
      })
  },
)

export default function reducer(preState = initState, history: any) {
  const state: any = R.pipe(
    R.over<any, any>(R.lensProp('search'), (s) => searchReducer(s, history)),
    R.over<any, any>(R.lensProp('create'), (s) => creationReducer(s, history)),
    R.over<any, any>(R.lensProp('edit'), (s) => editReducer(s, history)),
    R.over<any, any>(R.lensProp('detail'), (s) => detailReducer(s, history)),
    R.over<any, any>(R.lensPath(['polynomials', 'search']), (s) =>
      searchPolynomialReducer(s, history),
    ),
    R.over<any, any>(R.lensPath(['polynomials', 'create']), (s) =>
      creationPolynomialReducer(s, history),
    ),
  )(preState)

  return state
}
