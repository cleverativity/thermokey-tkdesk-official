import actions from 'Modules/Dashboard/actions'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { navigate } from 'Generic/navigation'

const sagas: any = []

sagas.push(takeEvery(actions.generic.ROUTE, routeToDashboard))
function* routeToDashboard() {
  yield call(navigate, '/dashboard')
}

sagas.push(takeEvery(actions.generic.LOAD, dashboardLoad))
function* dashboardLoad() {
  try {
    yield put(actions.generic.loadSuccess({}))
  } catch (error: any) {
    yield put(actions.generic.loadFail({ error }))
  }
}

export default function* rootSaga() {
  yield all(sagas)
}
