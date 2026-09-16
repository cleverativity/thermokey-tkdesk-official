import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { ConsoleLogger } from 'aws-amplify/utils'
import actions from 'Modules/Calculations/actions'
import orderActions from 'Modules/Orders/actions'
import _ from 'lodash'
import * as Calculations from 'Api/Calculations'
import * as Settings from 'Api/Settings'
import * as Orders from 'Api/Orders'
import * as Store from 'Api/S3'
import * as FanModels from 'Api/FanModels'

import * as MC from 'Model/Calculations/marshal'
import * as UF from './Manage/steps/InputParameter/functions'

import { getParams, getParamsManage } from './selectors'
import { message } from 'antd'

import { navigate } from 'Generic/navigation'
import { getLang } from 'Modules/App/selectors'

// import { isNotNullOrEmpty } from 'Utils/functions'

const log = new ConsoleLogger('Coils/Saga')

const sagas: any = []

// ROUTES
sagas.push(takeEvery(actions.generic.ROUTE, routeToCalculationEdit))
function* routeToCalculationEdit({ payload }: any) {
  const { id } = payload
  yield call(navigate, `/calculations/${id}`)
}

sagas.push(takeEvery(actions.search.ROUTE, routeToCalculationSearch))
function* routeToCalculationSearch() {
  yield call(navigate, '/calculations')
}

// UPDATE QUERY PARAMETERS
sagas.push(
  takeEvery(
    actions.search.UPDATE_QUERY_PARAMETERS,
    searchUpdateQueryParameters,
  ),
)
function* searchUpdateQueryParameters() {
  yield put(actions.search.load())
}

// GENERIC
sagas.push(takeEvery(actions.generic.PRELOAD, editPreload))
function* editPreload({ payload }: any) {
  try {
    const { id: calculation_id, status } = yield call(
      Calculations.getOrCreateSaga,
    )

    yield put(actions.generic.preloadSuccess({ id: calculation_id }))

    yield put(actions.generic.route({ id: calculation_id }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.generic.preloadFail({ error }))
  }
}

// SEARCH
sagas.push(takeEvery(actions.search.LOAD, searchLoad))
function* searchLoad() {
  const params: SearchParameters = yield select(getParams)

  try {
    const { datas: calculations, pagination } = yield call(
      Calculations.searchSaga,
      params,
    )
    log.info('searchLoad.search', { calculations, pagination })
    yield put(actions.search.loadSuccess({ calculations, pagination }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.search.loadFail({ error }))
  }
}

// EXPORT
sagas.push(takeEvery(actions.search.EXPORT, exportDownload))
function* exportDownload({ payload }: any) {
  log.debug('exportDownload.payload', { payload })

  const { filters } = payload

  const language: string = yield select(getLang)

  if (language === 'it') {
    message.info('Il download inizierà a breve')
  } else {
    message.info('The download will begin shortly')
  }

  try {
    const response: { file_path: string } = yield call(
      Calculations.exportSaga,
      filters,
    )

    yield call(Store.download, response.file_path, language)

    yield put(actions.search.exportSuccess({}))
  } catch (error: any) {
    log.error(error)
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
    yield put(actions.search.exportFail({ error }))
  }
}

// EXPORT SOLVE REPORT
sagas.push(takeEvery(actions.search.EXPORT_SOLVE_REPORT, exportSolve))
function* exportSolve({ payload }: any) {
  log.debug('exportSolve.payload', { payload })

  const language: string = yield select(getLang)

  try {
    const response: { file_path: string } = yield call(
      Calculations.exportSolveReportSaga,
      payload,
    )

    yield call(Store.download, response.file_path, language)

    yield put(actions.search.exportSolveReportSuccess({}))
  } catch (error: any) {
    log.error(error)
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
    yield put(actions.search.exportSolveReportFail({ error }))
  }
}

// CREATE LOAD
sagas.push(takeEvery(actions.manage.LOAD, manageLoad))
function* manageLoad({ payload }: any) {
  const { id } = payload
  try {
    const steps_config: StepsConfig = yield call(Settings.getStepsConfigSaga)

    const geometric_constants: GeometricConstants = yield call(
      Settings.getGeometricConstantsSaga,
    )

    const calculation: CalculationFront = yield call(
      Calculations.getCalculationSaga,
      id,
    )

    const refrigerants: SettingBack = yield call(Settings.getRefrigerantsSaga)

    const params: SearchParameters = yield select(getParamsManage)
    const { datas } = yield call(FanModels.searchSaga, params)
    const fan_models = MC.marshalFanModelsFrom(datas)

    log.info('manageLoad.data', {
      steps_config,
      geometric_constants,
      calculation,
      refrigerants,
      fan_models,
    })

    const { status, input_data = null, use_case } = calculation

    let available_n_of_tubes_values: AvailableTubesConfig | {} = {}

    // if (status === 'use_case_selected' && isNotNullOrEmpty(input_data)) {
    if (
      status === 'use_case_selected' &&
      (!_.isUndefined(input_data) || !_.isNull(input_data))
    ) {
      log.info('manageLoad.input_data', { input_data })

      if (use_case) {
        const geomTypesForSelectedUseCase =
          UF.getGeometryTypesStringForUseCase(use_case)

        available_n_of_tubes_values = yield call(
          Settings.getAvailableNTubesValuesSaga,
          {
            use_case: use_case as string,
            geom_types: geomTypesForSelectedUseCase,
          },
        )
      }

      yield put(
        actions.manage.loadSuccess({
          steps_config,
          available_n_of_tubes_values,
          geometric_constants,
          calculation,
          refrigerants,
          fan_models,
        }),
      )
    } else {
      yield put(
        actions.manage.loadSuccess({
          steps_config,
          available_n_of_tubes_values,
          geometric_constants,
          calculation,
          refrigerants,
          fan_models,
        }),
      )
    }
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.loadFail({ error }))
  }
}

sagas.push(
  takeEvery(
    actions.manage.UPDATE_QUERY_PARAMETERS,
    manageUpdateQueryParameters,
  ),
)
function* manageUpdateQueryParameters({ payload }: any) {
  const { params, currentCalculations } = payload

  try {
    const { datas: fan_models } = yield call(FanModels.searchSaga, params)
    log.info('searchFanModelsLoad.search', { fan_models, payload })

    const { calculated_data = {} } = currentCalculations

    const marshaledFanModels = MC.marshalFanModelsFrom(fan_models)

    yield put(
      actions.manage.updateQueryParametersSuccess({
        fan_models: marshaledFanModels,
        params,
        currentCalculations,
        calculated_data,
      }),
    )
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.updateQueryParametersFail({ error }))
  }
}

// SET USE CASE
sagas.push(takeEvery(actions.manage.SET_USE_CASE, setUseCaseEdit))
function* setUseCaseEdit({ payload }: any) {
  const { id, use_case } = payload
  try {
    const calculation: CalculationFront = yield call(
      Calculations.setUseCaseSaga,
      id,
      use_case,
    )

    let flow_rate_air: FlowRateAirValues | {} = {}
    let core_height: CoreHeightValues | {} = {}

    const geomTypesForSelectedUseCase =
      UF.getGeometryTypesStringForUseCase(use_case)

    const available_n_of_tubes_values: AvailableTubesConfig = yield call(
      Settings.getAvailableNTubesValuesSaga,
      {
        use_case: use_case as string,
        geom_types: geomTypesForSelectedUseCase,
      },
    )

    const refrigerants: SettingBack = yield call(Settings.getRefrigerantsSaga)

    const params: SearchParameters = yield select(getParamsManage)
    const { datas } = yield call(FanModels.searchSaga, params)
    const fan_models = MC.marshalFanModelsFrom(datas)

    yield put(
      actions.manage.setUseCaseSuccess({
        calculation: calculation,
        calculated_data: { flow_rate_air, core_height },
        available_n_of_tubes_values,
        refrigerants,
        fan_models,
      }),
    )
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.setUseCaseFail({ error }))
  }
}

// SOLVE
sagas.push(takeEvery(actions.manage.SOLVE, solveEdit))
function* solveEdit({ payload }: any) {
  const { id, calculation } = payload
  try {
    const new_calculation: CalculationFront = yield call(
      Calculations.solveSaga,
      id,
      calculation,
    )
    yield put(actions.manage.solveSuccess({ calculation: new_calculation }))
  } catch (error: any) {
    log.error(error)

    const new_data: CalculationBack = yield call(
      Calculations.getCalculationSaga,
      id,
    )

    const error_info: any = _.get(new_data, 'error_info')

    if (_.isNil(error_info)) {
      yield put(actions.manage.solveFail({ error }))
    } else {
      const { input_data, circuit } = MC.marshalCalculationFrom(error_info)

      yield put(actions.manage.solveFail({ error, input_data, circuit }))
    }
  }
}

// SET DETAIL EDIT
sagas.push(takeEvery(actions.manage.SET_DETAIL, setDetailEdit))
function* setDetailEdit({ payload }: any) {
  const { id, model_code: obj_model_code } = payload
  const model_code = _.get(obj_model_code, 'value', null)

  try {
    const new_calculation: CalculationFront = yield call(
      Calculations.setDetailSaga,
      id,
      model_code,
    )
    yield put(actions.manage.solveSuccess({ calculation: new_calculation }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.solveFail({ error }))
  }
}

// COMPLETE EDIT
sagas.push(takeEvery(actions.manage.COMPLETE, completeEdit))
function* completeEdit({ payload }: any) {
  const { id } = payload
  try {
    const new_calculation: CalculationFront = yield call(
      Calculations.completeSaga,
      id,
    )
    yield put(actions.manage.completeSuccess({ calculation: new_calculation }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.completeFail({ error }))
  }
}

// RESET STATUS
sagas.push(takeEvery(actions.manage.RESET_STATUS, resetStatusEdit))
function* resetStatusEdit({ payload }: any) {
  const { id, status } = payload
  try {
    const calculation: CalculationFront = yield call(
      Calculations.resetStatusSaga,
      id,
      status,
    )

    yield put(
      actions.manage.resetStatusSuccess({
        calculation,
      }),
    )
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.resetStatusFail({ error }))
  }
}

// CREATE ORDER
sagas.push(takeEvery(actions.manage.CREATE_ORDER, createOrder))
function* createOrder({ payload }: any) {
  const { id } = payload

  try {
    const order: OrderFront = yield call(Orders.createSaga, id)
    yield put(actions.manage.createOrderSuccess({ order }))
    yield put(orderActions.search.route())
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.createOrderFail({ error }))
  }
}

// CALC CORE HEIGHT
sagas.push(takeEvery(actions.manage.CALC_CORE_HEIGHT, calcCoreHeight))
function* calcCoreHeight({ payload }: any) {
  const { geom_types, n_of_tubes } = payload

  try {
    const { core_height } = yield call(Settings.calcCoreHeightSaga, {
      geom_types,
      n_of_tubes,
    })
    yield put(actions.manage.calcCoreHeightSuccess({ core_height }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.calcCoreHeightFail({ error }))
  }
}

// CALC FLOW RATE AIR
sagas.push(takeEvery(actions.manage.CALC_FLOW_RATE_AIR, calcFlowRateAir))
function* calcFlowRateAir({ payload }: any) {
  const { geom_types, n_of_tubes, battery_active_length, inlet_velocity_air } =
    payload

  try {
    const values: FlowRateAirValues = yield call(Settings.calcFlowRateAirSaga, {
      geom_types,
      n_of_tubes,
      battery_active_length,
      inlet_velocity_air,
    })

    yield put(actions.manage.calcFlowRateAirSuccess({ flow_rate_air: values }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.calcFlowRateAirFail({ error }))
  }
}

sagas.push(takeEvery(actions.manage.DOWNLOAD, downloadDocument))
function* downloadDocument({ payload }: any) {
  log.debug('downloadDocument.payload', payload)

  const { storage_url, language, id } = payload

  if (_.isNil(storage_url)) {
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
    yield put(
      actions.manage.downloadFail({
        error:
          'Error while downloading the document, storage_url null or undefined',
      }),
    )
    yield put(actions.manage.load({ id }))
  } else {
    try {
      yield call(Store.download, storage_url, language)

      yield put(actions.manage.downloadSuccess())
    } catch (error: any) {
      log.error(error)
      yield put(actions.manage.downloadFail({ error }))
      yield put(actions.manage.load({ id }))
    }
  }
}

// REGENERATE
sagas.push(takeEvery(actions.manage.REGENERATE, regenerateDocument))
function* regenerateDocument({ payload }: any) {
  log.debug('regenerateDocument.payload', payload)

  const { id } = payload

  try {
    const response: { data: string } = yield call(
      Calculations.generatePdfSaga,
      id,
    )

    log.info('regenerateDocument.response', { response })

    yield put(actions.manage.regenerateSuccess())
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.regenerateFail({ error }))
    yield put(actions.manage.load({ id }))
  }
}

export default function* rootSaga() {
  yield all(sagas)
}
