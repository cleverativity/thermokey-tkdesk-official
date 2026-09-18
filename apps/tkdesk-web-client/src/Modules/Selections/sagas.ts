import _ from 'lodash'
import { message } from 'antd'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { ConsoleLogger } from 'aws-amplify/utils'

import * as Selections from 'Api/Selections'
import * as Store from 'Api/S3'
import * as APIProfile from 'Api/Profile/endpoints'

import { getParams } from './selectors'
import actions from './actions'

import { navigate } from 'Generic/navigation'

import { getLang } from 'Modules/App/selectors'
import * as Thermal from 'Api/Thermal'
import { dispatchAction } from 'Utils/functions'

const log = new ConsoleLogger('Selections/Saga')

const sagas: any = []

sagas.push(takeEvery(actions.generic.ROUTE, routeToSelectionEdit))
function* routeToSelectionEdit({ payload }: any) {
  const { id } = payload
  yield call(navigate, `/selections/${id}`)
}

sagas.push(takeEvery(actions.generic.PRELOAD, genericPreload))
function* genericPreload() {
  try {
    const { id } = yield call(Selections.getOrCreateSaga)

    yield put(actions.generic.preloadSuccess({ id }))

    yield put(actions.generic.route({ id }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.generic.preloadFail({ error }))
  }
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

// SEARCH
sagas.push(takeEvery(actions.search.LOAD, searchLoad))
function* searchLoad() {
  const params: SearchParameters = yield select(getParams)

  try {
    const { datas: selections, pagination } = yield call(
      Selections.searchSaga,
      params,
    )
    log.info('searchLoad.search', { selections, pagination })
    yield put(actions.search.loadSuccess({ selections, pagination }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.search.loadFail({ error }))
  }
}

// MANAGE
sagas.push(takeEvery(actions.manage.LOAD, manageLoad))
function* manageLoad({ payload }: any) {
  const { id } = payload

  try {
    const selection: SelectionBack = yield call(Selections.getSelectionSaga, id)
    log.info('manageLoad.data', { selection })

    const machine_id = _.get(selection, 'detail_data.machine_id.value', null)

    let steps = yield call(Thermal.getCurrentStepSaga, id)

    if (steps?.macro_serie === 'Remote condensers') {
      let steps = yield call(Thermal.getCurrentStepSaga, id)
      log.info('manageLoad.steps', { steps })

      const condensersType = yield call(Thermal.getCondenserTypeSaga)
      const condensersModel = yield call(Thermal.getCondenserModelSaga)
      const fanConnection = yield call(Thermal.getFanConSaga)
      const refType = yield call(Thermal.getRefTypeSaga)

      const { condenser } = yield call(
        Thermal.getCondenserAndAccessoriesSaga,
        id,
        steps.status,
      )

      log.info('ThermalDataLoad.data', { steps, id })

      yield put(
        actions.manage.loadSuccess({
          selection: steps,
          condensersType,
          condensersModel,
          fanConnection,
          refType,
          condenser,
        }),
      )
    } else {
      const seriesCompatibility =
        status === 'use_case_selected'
          ? yield call(Selections.getSeriesAndSubseriesRelationsSaga)
          : undefined

      if (machine_id) {
        const diameters = yield call(Selections.getDiametersSaga)
        const accessories = yield call(
          Selections.getAccessoriesSaga,
          id,
          machine_id,
        )
        log.info('manageLoad.data', {
          diameters,
          accessories,
          seriesCompatibility,
        })

        yield put(
          actions.manage.loadSuccess({
            selection,
            diameters,
            accessories,
            seriesCompatibility,
          }),
        )
      } else {
        yield put(
          actions.manage.loadSuccess({ selection, seriesCompatibility }),
        )
      }
    }
  } catch (error: any) {
    yield put(actions.manage.loadFail({ error }))
    log.info('manageLoad.error', { error })
  }
}

sagas.push(takeEvery(actions.manage.RESET_STATUS, resetStatusEdit))
function* resetStatusEdit({ payload }: any) {
  const { id, status } = payload

  try {
    //const steps = yield call(Thermal.getCurrentStepSaga, id)

    const { macro_serie, thermal_id } = payload.selection
    log.info('resetStatusEdit.payload', {
      payload,
      thermal_id,
    })

    if (macro_serie === 'Remote condensers') {
      if (thermal_id != null) {
        yield call(Thermal.deleteSolveSaga, thermal_id)
      } else {
        log.info('resetStatusEdit.skipDelete', { id, thermal_id })
      }

      const steps: SelectionBack = yield call(Thermal.getCurrentStepSaga, id)
      if (!steps) {
        throw new Error('Current step not found after reset')
      }

      const condensersType = yield call(Thermal.getCondenserTypeSaga)
      const condensersModel = yield call(Thermal.getCondenserModelSaga)
      const fanConnection = yield call(Thermal.getFanConSaga)
      const refType = yield call(Thermal.getRefTypeSaga)
      const { condenser } = yield call(
        Thermal.getCondenserAndAccessoriesSaga,
        id,
        status,
      )
      yield put(
        actions.manage.resetStatusSuccess({
          selection: steps,
          condensersType,
          condensersModel,
          fanConnection,
          refType,
          condenser,
        }),
      )
      log.info('resetStatusEdit.data', {
        payload,
        steps,
        condensersType,
        condensersModel,
        fanConnection,
        refType,
        condenser,
      })
    } else {
      const seriesCompatibility =
        status === 'use_case_selected'
          ? yield call(Selections.getSeriesAndSubseriesRelationsSaga)
          : undefined

      const selection: SelectionBack = yield call(
        Selections.resetStatusSaga,
        id,
        status,
      )

      log.info('resetStatusEdit.data', { selection, seriesCompatibility })

      yield put(
        actions.manage.resetStatusSuccess({
          selection,
          seriesCompatibility,
        }),
      )
    }
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.resetStatusFail({ error }))
  }
}

// STEPS
sagas.push(takeEvery(actions.manage.SET_USE_CASE, setUseCase))
function* setUseCase({ payload }: any) {
  log.info('setUseCase.payload', { payload })
  const { id, macro_serie } = payload

  try {
    if (macro_serie === 'Remote condensers') {
      //Create steps
      yield call(Thermal.createSetUseCaseSaga, id, payload)

      const steps: SelectionBack = yield call(Thermal.getCurrentStepSaga, id)
      const condensersType = yield call(Thermal.getCondenserTypeSaga)
      const condensersModel = yield call(Thermal.getCondenserModelSaga)
      const fanConnection = yield call(Thermal.getFanConSaga)
      const refType = yield call(Thermal.getRefTypeSaga)
      const { condenser } = yield call(
        Thermal.getCondenserAndAccessoriesSaga,
        id,
        steps.status,
      )

      //const condenserAndAccessories = yield call(Thermal.getCondenserAndAccessoriesSaga, id, steps.status)

      yield put(
        actions.manage.setUseCaseSuccess({
          selection: steps,
          condensersType,
          condensersModel,
          fanConnection,
          refType,
          condenser,
        }),
      )

      log.info('ThermalData.setUseCase.payload', {
        condensersType,
        condensersModel,
        fanConnection,
        refType,
        selection: steps,
        condenser,
        payload,
      })
    } else {
      const selection: SelectionBack = yield call(
        Selections.setUseCaseSaga,
        id,
        macro_serie,
      )
      const seriesCompatibility = yield call(
        Selections.getSeriesAndSubseriesRelationsSaga,
      )
      log.info('setUseCase.response', { selection, seriesCompatibility })

      yield put(
        actions.manage.setUseCaseSuccess({ selection, seriesCompatibility }),
      )
    }
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.setUseCaseFail({ error }))
  }
}

sagas.push(takeEvery(actions.manage.SOLVE, solveEdit))
function* solveEdit({ payload }: any) {
  const { id, selection, macro_serie, user_id } = payload
  log.info('solveEdit.saga', { payload, id, selection, macro_serie })

  try {
    if (macro_serie === 'Remote condensers') {
      yield call(Thermal.createSolveSaga, id, {
        ...selection,
        user_id,
        macro_serie,
      })
      const steps: SelectionBack = yield call(Thermal.getCurrentStepSaga, id)
      const { condenser } = yield call(
        Thermal.getCondenserAndAccessoriesSaga,
        id,
        steps.status,
      )
      yield put(
        actions.manage.solveSuccess({
          selection: steps,
          condenser,
        }),
      )

      log.info('ThermalData.solveEdit.payload', {
        selection: steps,
        condenser,
        payload,
      })
    } else {
      const new_selection: SelectionBack = yield call(
        Selections.solveSaga,
        id,
        selection,
      )
      yield put(actions.manage.solveSuccess({ selection: new_selection }))
    }
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.solveFail({ error }))
  }
}

sagas.push(takeEvery(actions.manage.accessories, accessories))
function* accessories({ payload }: any) {
  try {
    const accessories = yield call(Thermal.getAccessoriesSaga, payload)
    yield put(actions.manage.accessoriesSuccess({ accessories }))

    log.info('accessoriesSaga', { accessories, payload, pagination: null })
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.accessoriesFail({ error }))
  }
}

sagas.push(takeEvery(actions.manage.SET_DETAIL, setDetailEdit))
function* setDetailEdit({ payload }: any) {
  const { id, machine_id, macro_serie, thermal } = payload

  try {
    log.info('ThermalDetail.payload', {
      payload,
    })

    if (macro_serie === 'Remote condensers') {
      log.info('ThermalDetail.payload', id, thermal)
      yield call(Thermal.createDetailedSaga, id, thermal)
      const steps = yield call(Thermal.getCurrentStepSaga, id)
      const { condenser } = yield call(
        Thermal.getCondenserAndAccessoriesSaga,
        id,
        steps.status,
      ) //, accessories
      yield put(
        actions.manage.setUseCaseSuccess({
          selection: steps,
          condenser,
        }),
      )
    } else {
      const new_selection: SelectionBack = yield call(
        Selections.setDetailSaga,
        id,
        machine_id,
      )
      const diameters = yield call(Selections.getDiametersSaga)
      const accessories = yield call(
        Selections.getAccessoriesSaga,
        id,
        machine_id,
      )

      yield put(
        actions.manage.setDetailSuccess({
          selection: {
            ...new_selection,
            accessories,
          },
          diameters,
        }),
      )
    }
  } catch (error: any) {
    log.error(error)
    yield put(actions.manage.setDetailFail({ error }))
  }
}

// EDIT CUSTOM DATA
sagas.push(takeEvery(actions.manage.EDIT_CUSTOM_DATA, editCustomData))
function* editCustomData({ payload }: any) {
  const { id, values } = payload

  try {
    const detail_data = yield call(Selections.editCustomDataSaga, id, values)

    yield put(actions.manage.editCustomDataSuccess({ detail_data }))
  } catch (error: any) {
    log.error('editCustomData', { error })
    yield put(actions.manage.editCustomDataFail({ error }))
  }
}

// GENERATE PDF
sagas.push(takeEvery(actions.manage.GENERATE_PDF, generatePdf))
function* generatePdf({ payload }: any) {
  log.debug('generatePdf.payload', payload)

  const { id, template, selections, session_id } = payload

  const language: string = yield select(getLang)

  if (language === 'it') {
    message.info('Il download inizierà a breve')
  } else {
    message.info('The download will begin shortly')
  }

  try {
    yield call(Selections.editCustomDataSaga, id, selections)

    const response: { data: string } = yield call(
      Selections.generatePdfSaga,
      id,
      template,
      selections,
      session_id,
    )

    log.info('generatePdf.response', { response })

    const apiCall: any = APIProfile.onCreateRealTimeCallbackSubscription(
      session_id + String(id),
    )
    // subscribe
    const subscription = apiCall.subscribe({
      next: (data: any) => {
        const notificationData = JSON.parse(
          _.get(data, ['data', 'onCreateRealTimeCallbackByCode', 'data'], {}),
        )
        log.info('onCreateRealTimeCallback.notificationData', {
          data,
          notificationData,
        })

        const storage_url = _.get(notificationData, 'storage_url', null)

        if (storage_url) {
          subscription.unsubscribe()
          log.info('onCreateRealTimeCallback.unsubscribed', { session_id, id })

          dispatchAction(
            actions.manage.downloadPdf({
              storage_url,
            }),
          )
        }
      },
      error: (error: any) => {
        subscription.unsubscribe()
        log.error('onCreateRealTimeCallback.error', { error })
        dispatchAction(
          actions.manage.generatePdfFail({
            error,
          }),
        )
      },
    })
  } catch (error: any) {
    log.error('generatePdf', { error })
    yield put(actions.manage.generatePdfFail({ error }))
  }
}

// DOWNLOAD PDF
sagas.push(takeEvery(actions.manage.DOWNLOAD_PDF, downloadPdf))
function* downloadPdf({ payload }: any) {
  log.debug('downloadPdf.payload', payload)

  const { storage_url } = payload

  const language: string = yield select(getLang)

  if (_.isNil(storage_url)) {
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
    yield put(
      actions.manage.downloadPdfFail({
        error:
          'Error while downloading the document, storage_url null or undefined',
      }),
    )
  } else {
    try {
      yield call(Store.download, storage_url, language)

      yield put(actions.manage.downloadPdfSuccess())
    } catch (error: any) {
      log.error(error)
      yield put(actions.manage.downloadPdfFail({ error }))
    }
  }
}

sagas.push(takeEvery(actions.manage.THERMAL_PDF_DOWNLOAD, thermalpdfDownload))
function* thermalpdfDownload({ payload }: any) {
  try {
    const { report } = payload

    switch (report) {
      case 'analysis_report':
        yield call(Thermal.pdfEAnalysisSaga, payload)
        break
      case 'condenser_report':
        yield call(Thermal.pdfCondenserSaga, payload)
        break
    }

    yield put(actions.manage.thermalPdfDownloadSuccess())
    log.info('pdfDownload.payload', { payload, report })
  } catch (error: any) {
    log.info('pdfDownload.error', error)
    yield put(actions.manage.thermalPdfDownloadFail({ error }))
  }
}

export default function* rootSaga() {
  yield all(sagas)
}
