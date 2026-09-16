import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { ConsoleLogger } from 'aws-amplify/utils'

import { navigate } from 'Generic/navigation'

import * as Orders from 'Api/Orders'
import { getParams } from './selectors'
import actions from 'Modules/Orders/actions'

const log = new ConsoleLogger('Orders/Saga')

const sagas: any = []

// ROUTES
sagas.push(takeEvery(actions.search.ROUTE, routeToOrdersSearch))
function* routeToOrdersSearch() {
  yield call(navigate, '/orders')
}

sagas.push(takeEvery(actions.detail.ROUTE, routeToOrderDetail))
function* routeToOrderDetail({ payload }: any) {
  const { id } = payload
  // yield put((`/orders/${id}`))
  yield call(navigate, `/orders/${id}`)
}

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
    const { datas: orders, pagination } = yield call(Orders.searchSaga, params)
    log.info('searchLoad.search', { orders, pagination })
    yield put(actions.search.loadSuccess({ orders, pagination }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.search.loadFail({ error }))
  }
}

// DETAIL
sagas.push(takeEvery(actions.detail.LOAD, detailLoad))
function* detailLoad({ payload }: any) {
  const { id } = payload
  try {
    const { datas: order } = yield call(Orders.getSaga, id)
    log.info('detailLoad.detailLoad', { order })
    yield put(actions.detail.loadSuccess({ order }))
  } catch (error: any) {
    log.error(error)
    yield put(actions.detail.loadFail({ error }))
  }
}

// CHANGE STATUS
sagas.push(takeEvery(actions.search.CHANGE_STATUS, changeStatus))
function* changeStatus({ payload }: any) {
  const { id, status } = payload
  log.info('changeStatus.payload', { payload })
  try {
    const { datas: order } = yield call(Orders.editSaga, id, status)
    log.info('changeStatus.order', { order })
    yield put(actions.search.changeStatusSuccess({ order }))
    yield put(actions.search.load())
  } catch (error: any) {
    log.error(error)
    yield put(actions.search.changeStatusFail({ error }))
  }
}

export default function* rootSaga() {
  yield all(sagas)
}
