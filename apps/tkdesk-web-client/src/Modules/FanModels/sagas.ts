import _ from 'lodash'
import { Modal } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { navigate } from 'Generic/navigation'
import { dispatchAction } from 'Utils/functions'

import actions from 'Modules/FanModels/actions'

import * as Store from 'Api/S3'
import * as APIProfile from 'Api/Profile/endpoints'
import * as FanModels from 'Api/FanModels'

import { getParams, getPolynomialsParams } from './selectors'
import { getLang } from 'Modules/App/selectors'

const log = new ConsoleLogger('FanModels/Saga')

const sagas: any = []

// ROUTES
sagas.push(takeEvery(actions.search.ROUTE, routeToFanModelSearch))
function* routeToFanModelSearch() {
  yield call(navigate, '/fan-models')
}

sagas.push(takeEvery(actions.create.ROUTE, routeToFanModelCreation))
function* routeToFanModelCreation() {
  yield call(navigate, '/fan-models/new')
}

sagas.push(takeEvery(actions.edit.ROUTE, routeToFanModelEdit))
function* routeToFanModelEdit({ payload }: any) {
  const { id } = payload
  yield call(navigate, `/fan-models/${id}/edit`)
}

sagas.push(takeEvery(actions.detail.ROUTE, routeToFanModelDetail))
function* routeToFanModelDetail({ payload }: any) {
  const { id } = payload
  yield call(navigate, `/fan-models/${id}/detail`)
}

sagas.push(takeEvery(actions.polynomials.search.ROUTE, routeToPolynomialSearch))
function* routeToPolynomialSearch({ payload }: any) {
  yield call(navigate, `/fan-models/${payload}/polynomials`)
}

// SEARCH
sagas.push(
  takeEvery(
    actions.search.UPDATE_QUERY_PARAMETERS,
    searchUpdateQueryParameters,
  ),
)
function* searchUpdateQueryParameters() {
  yield put(actions.search.load())
}

sagas.push(takeEvery(actions.search.LOAD, searchLoad))
function* searchLoad() {
  const params: SearchParameters = yield select(getParams)

  try {
    const { datas: fanModels, pagination } = yield call(
      FanModels.searchSaga,
      params,
    )
    log.info('searchLoad.search', { fanModels, pagination })

    yield put(actions.search.loadSuccess({ fanModels, pagination }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.search.loadFail({ error }))
  }
}

// CREATE
sagas.push(takeEvery(actions.create.LOAD, createLoad))
function* createLoad() {
  try {
    log.info('createLoad')
    yield put(actions.create.loadSuccess({}))
  } catch (error: any) {
    log.error('createLoad', { error })
    yield put(actions.create.loadFail({ error }))
  }
}

// CREATION COMPLETE
sagas.push(takeEvery(actions.create.COMPLETE, creationComplete))
function* creationComplete({ payload }: any) {
  const { fan_model } = payload
  log.info('creationComplete.fan_models', fan_model)
  try {
    const createdFanModels: FanModels = yield call(
      FanModels.createSaga,
      fan_model,
    )
    const id = _.get(createdFanModels, 'id', null)
    yield put(actions.create.completeSuccess({ fan_model: createdFanModels }))
    yield put(actions.detail.route({ id }))
  } catch (error: any) {
    yield put(actions.create.completeFail({ error }))
  }
}

// IMPORT FANS
sagas.push(takeEvery(actions.create.IMPORT_FANS, importFans))
function* importFans({ payload }: any) {
  const { documents } = payload
  log.info('importFans', { documents })

  const language: string = yield select(getLang)

  try {
    const files = _.get(documents, 'files', [])
    const name = _.get(files, '[0].name', '')
    const uuid = crypto.randomUUID()

    const filePath = `DOCUMENTS/FAN_MODELS`
    const result: { path: string } = yield call(
      Store.put,
      _.get(files, [0]),
      filePath,
      `Import-${uuid}-${name}`,
    )
    log.info(`importFans: ${name} uploadFile`, result)

    const storage_url = result.path

    const code = yield call(FanModels.importSaga, storage_url)

    const apiCall: any = APIProfile.onCreateRealTimeCallbackSubscription(code)
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

        const notificationMessage = _.get(notificationData, 'message', null)

        if (notificationMessage === 'Fan models imported successfully') {
          subscription.unsubscribe()
          log.info('onCreateRealTimeCallback.unsubscribed', {
            notificationMessage,
          })

          Modal.success({
            title: language === 'it' ? 'Import completato' : 'Import completed',
            content:
              language === 'it'
                ? 'Ventilatori importati con successo'
                : 'Fan models imported successfully',
          })

          dispatchAction(actions.create.importFansSuccess())
          dispatchAction(actions.search.load())
        } else {
          subscription.unsubscribe()
          log.error('onCreateRealTimeCallback.error', { error: data })
          dispatchAction(actions.create.importFansFail({ error: data }))
        }
      },
      error: (error: any) => {
        subscription.unsubscribe()
        log.error('onCreateRealTimeCallback.error', { error })
        dispatchAction(actions.create.importFansFail({ error }))
      },
    })
  } catch (error: any) {
    log.error('importFans', { error })
    yield put(actions.create.importFansFail({ error }))
  }
}

// EDIT
sagas.push(takeEvery(actions.edit.LOAD, editLoad))
function* editLoad({ payload }: any) {
  const { id } = payload
  log.info('editLoad')
  try {
    const fan_model: FanModels = yield call(FanModels.getSaga, id)

    yield put(actions.edit.loadSuccess({ fan_model }))
  } catch (error: any) {
    log.error('editLoad', { error })
    yield put(actions.edit.loadFail({ error }))
  }
}

// EDIT COMPLETE
sagas.push(takeEvery(actions.edit.COMPLETE, editComplete))
function* editComplete({ payload }: any) {
  const { fan_model } = payload
  log.info('editComplete.fan_model', fan_model)
  try {
    const editedFanModel: FanModels = yield call(FanModels.editSaga, fan_model)
    const id = _.get(editedFanModel, 'id', null)
    yield put(actions.edit.completeSuccess({ fan_model: editedFanModel }))
    yield put(actions.detail.route({ id }))
  } catch (error: any) {
    yield put(actions.edit.completeFail({ error }))
  }
}

// DETAIL
sagas.push(takeEvery(actions.detail.LOAD, detailLoad))
function* detailLoad({ payload }: any) {
  const { id } = payload
  log.info('detailLoad')
  try {
    const fan_model: FanModels = yield call(FanModels.getSaga, id)

    yield put(actions.detail.loadSuccess({ fan_model }))
  } catch (error: any) {
    log.error('detailLoad', { error })
    yield put(actions.detail.loadFail({ error }))
  }
}

// DELETE
sagas.push(takeEvery(actions.detail.DELETE, deleteFanModel))
function* deleteFanModel({ payload }: any) {
  const { id } = payload
  log.info('deleteFanModel.payload', payload)
  try {
    yield call(FanModels.deleteSaga, id)
    yield put(actions.detail.deleteSuccess())
    yield put(actions.search.route())
  } catch (error: any) {
    yield put(actions.detail.deleteFail({ error }))
  }
}

// SEARCH POLYNOMIAL
sagas.push(takeEvery(actions.polynomials.search.LOAD, searchPolynomialLoad))
function* searchPolynomialLoad({ payload }: any) {
  const { id } = payload
  const params: SearchParameters = yield select(getPolynomialsParams)

  try {
    const { datas: polynomials, pagination } = yield call(
      FanModels.searchPolynomialsSaga,
      params,
      id,
    )
    log.info('searchPolynomialLoad.search', { polynomials, pagination, id })

    yield put(
      actions.polynomials.search.loadSuccess({ polynomials, pagination, id }),
    )
  } catch (error: any) {
    log.error(error)
    yield put(actions.polynomials.search.loadFail({ error }))
  }
}

export default function* rootSaga() {
  yield all(sagas)
}

// DELETE POLYNOMIAL
sagas.push(takeEvery(actions.polynomials.search.DELETE, deletePolynomial))
function* deletePolynomial({ payload }: any) {
  const { fan_model_id, idPoly } = payload
  log.info('deletePolynomial.payload', payload)

  try {
    yield call(FanModels.deletePolynomialsSaga, idPoly)
    yield put(actions.polynomials.search.deleteSuccess())
    yield put(actions.polynomials.search.load({ id: fan_model_id }))
  } catch (error: any) {
    yield put(actions.polynomials.search.deleteFail({ error }))
  }
}

// CREATE POLYNOMIAL
sagas.push(
  takeEvery(actions.polynomials.create.COMPLETE, creationPolynomialComplete),
)
function* creationPolynomialComplete({ payload }: any) {
  log.info('creationPolynomialComplete.payload', payload)

  const { fan_model_id, values } = payload

  try {
    const createdPolynomial: Polynomials = yield call(
      FanModels.createPolynomialsSaga,
      fan_model_id,
      values,
    )
    yield put(
      actions.polynomials.create.completeSuccess({
        polynomial: createdPolynomial,
      }),
    )
    yield put(actions.polynomials.search.load({ id: fan_model_id }))
  } catch (error: any) {
    yield put(actions.polynomials.create.completeFail({ error }))
  }
}

// EDIT POLYNOMIAL
sagas.push(takeEvery(actions.polynomials.edit.COMPLETE, editPolynomialComplete))
function* editPolynomialComplete({ payload }: any) {
  log.info('editPolynomialComplete.payload', payload)

  const { fan_model_id, values } = payload

  try {
    const editedPolynomial: Polynomials = yield call(
      FanModels.editPolynomialSaga,
      values,
    )

    yield put(
      actions.polynomials.edit.completeSuccess({
        polynomial: editedPolynomial,
      }),
    )
    yield put(actions.polynomials.search.load({ id: fan_model_id }))
  } catch (error: any) {
    yield put(actions.polynomials.edit.completeFail({ error }))
  }
}
