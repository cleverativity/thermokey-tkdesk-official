import _ from 'lodash'

import { all, take } from 'redux-saga/effects'

import * as E from 'Utils/errors'

import profile from './profile'
import application from './application'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('App/saga')

function* watchForErrorsAndLog() {
  while (true) {
    const action: { [key: string]: any } = yield take('*')
    const { type, payload } = action
    const { error } = payload

    if (!_.isNil(error)) {
      log.error(`Error, action: ${type} error: `, E.refineError(error))
    }
  }
}

const sagass = [profile, application]

export default function* rootSaga() {
  yield all([..._.flatten(sagass), watchForErrorsAndLog])
}
