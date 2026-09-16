import { createReducer } from '@reduxjs/toolkit'
import * as R from 'ramda'
import actions from './actions'
import * as REDParams from 'Generic/SearchParams/reducer'

const initState: any = {
  generic: {
    params: {},
    data: {},
    loading: true,
    error: false,
  },
  search: {
    params: {
      orders: {},
      filters: { status: [] },
      query: '',
      pagination: {},
    },
    data: [],
    loading: true,
    error: false,
  },
  manage: {
    params: {
      isRegenerating: false,
      isEnergyAnalysisPdfLoading: false,
      isLanguageChanged: false,
    },
    data: {},
    loading: true,
    error: false,
  },
  energyAnalysis: {
    request: null as Record<string, unknown> | null,
    footerCalculateTick: 0,
  },
}

const genericReducer = createReducer(initState.generic, (builder) => {
  builder

    // ROUTE
    .addCase(actions.generic.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // PRELOAD
    .addCase(actions.generic.preload, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.generic.preloadSuccess, (s, action) => {
      return {
        ...s,
        data: {},
        loading: true,
        error: false,
      }
    })
    .addCase(actions.generic.preloadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
})

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
      const { selections, pagination } = action.payload

      return {
        ...s,
        data: selections,
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

const manageReducer = createReducer(initState.manage, (builder) => {
  builder
    // ROUTE
    .addCase(actions.manage.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.manage.load, (s, action: any) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.loadSuccess, (s, action: any) => {
      const {
        selection,
        diameters,
        accessories,
        condensersType,
        condensersModel,
        refType,
        fanConnection,
        performance,
        condenser,
        seriesCompatibility,
      } = action.payload

      return {
        ...s,
        data: {
          ...selection,
          fields: { diameters },
          detail_data: {
            ...selection.detail_data,
            ...(accessories && { accessories }),
          },
          condensersType,
          condensersModel,
          refType,
          fanConnection,
          performance,
          condenser,
          seriesCompatibility,
        },
        loading: false,
        error: false,
      }
    })
    .addCase(actions.manage.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })

    // RESET STATUS
    .addCase(actions.manage.resetStatus, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.resetStatusSuccess, (s, action) => {
      const {
        selection,
        condensersType,
        condensersModel,
        refType,
        fanConnection,
        condenser,
        seriesCompatibility,
      } = action.payload

      return {
        ...s,
        data: {
          ...selection,
          condensersType,
          condensersModel,
          refType,
          fanConnection,
          condenser,
          seriesCompatibility,
        },
        loading: false,
        error: false,
      }
    })
    .addCase(actions.manage.resetStatusFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })

    // SET USE CASE
    .addCase(actions.manage.setUseCase, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.setUseCaseSuccess, (s, action) => {
      const {
        selection,
        condensersType,
        condensersModel,
        refType,
        fanConnection,
        condenser,
        seriesCompatibility,
      } = action.payload

      return {
        ...s,
        data: {
          ...selection,
          condensersType,
          condensersModel,
          refType,
          fanConnection,
          condenser,
          seriesCompatibility,
        },
        loading: false,
        error: false,
      }
    })
    .addCase(actions.manage.setUseCaseFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })

    // SOLVE
    .addCase(actions.manage.solve, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.solveFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.solveSuccess, (s, action) => {
      const { selection, condenser } = action.payload

      return {
        ...s,
        data: {
          ...selection,
          condenser,
        },
        loading: false,
        error: false,
      }
    })

    // SET DETAIL
    .addCase(actions.manage.setDetail, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.setDetailFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.setDetailSuccess, (s, action) => {
      const { selection, diameters, steps, condenser, accessories } =
        action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          ...selection,
          fields: { diameters },
          detail_data: {
            ...selection.detail_data,
            ...(accessories && { accessories }),
          },
          steps,
          condenser,
        },
        loading: false,
        error: false,
      }
    })

    // EDIT CUSTOM DATA
    .addCase(actions.manage.editCustomData, (s, action) => {
      return { ...s, loading: false, error: false }
    })
    .addCase(actions.manage.editCustomDataSuccess, (s, action: any) => {
      const { detail_data } = action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          ...(detail_data && {
            detail_data,
            accessories: detail_data.accessories,
          }),
        },
        loading: false,
        error: false,
      }
    })
    .addCase(actions.manage.editCustomDataFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })

    // GENERATE PDF
    .addCase(actions.manage.generatePdf, (s, action) => {
      return { ...s, loading: false, error: false }
    })
    .addCase(actions.manage.generatePdfFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.generatePdfSuccess, (s, action) => {
      return {
        ...s,
        data: {
          ...s?.data,
        },
        loading: false,
        error: false,
      }
    })

    //DISPLAY ACCESSORIES
    .addCase(actions.manage.accessories, (s, action) => {
      return { ...s, /*loading: false,*/ error: false }
    })

    .addCase(actions.manage.accessoriesSuccess, (s, action) => {
      const { accessories } = action.payload

      // //Electrical Accessories
      // const dataEA =
      //   accessories?.filter((item: any) => item.type === 'EA') || []
      // //Mechanical Accessories
      // const dataMA =
      //   accessories?.filter((item: any) => item.type === 'MA') || []
      return {
        ...s,
        data: {
          ...s?.data,
          accessories: accessories,
          //accessories: {
          //   EA: dataEA.map((item) => ({
          //     value: item?.id || null,
          //     label: item?.items || 'N/A',
          //     disabled: item?.isDisabled || false,
          //   })),
          //   MA: dataMA.map((item) => ({
          //     value: item?.id || null,
          //     label: item?.items || 'N/A',
          //     disabled: item?.isDisabled || false,
          //   })),
          // },
        },
        // loading: false,
        error: false,
      }
    })
    .addCase(actions.manage.accessoriesFail, (s, action) => {
      const { error } = action.payload
      return { ...s, /*loading: false,*/ error }
    })

    // DOWNLOAD (thermal PDF — condenser vs energy analysis use separate flags)
    .addCase(actions.manage.thermalPdfDownload, (s, action) => {
      const report = (action.payload as { report?: string })?.report
      const isAnalysisReport = report === 'analysis_report'
      const isCondenserReport = report === 'condenser_report'
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: isCondenserReport,
          isEnergyAnalysisPdfLoading: isAnalysisReport,
        },
        error: false,
      }
    })

    .addCase(actions.manage.thermalPdfDownloadSuccess, (s, action) => {
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: false,
          isEnergyAnalysisPdfLoading: false,
          isLanguageChanged: false,
        },
      }
    })

    .addCase(actions.manage.thermalPdfDownloadFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: false,
          isEnergyAnalysisPdfLoading: false,
        },
        error,
      }
    })
})

export default function reducer(preState = initState, history: any) {
  return R.pipe(
    R.over<any, any>(R.lensProp('search'), (s) => searchReducer(s, history)),
    R.over<any, any>(R.lensProp('generic'), (s) => genericReducer(s, history)),
    R.over<any, any>(R.lensProp('manage'), (s) => manageReducer(s, history)),
  )(preState)
}
