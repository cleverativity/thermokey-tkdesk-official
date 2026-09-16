import _ from 'lodash'

import * as Profile from 'Api/User'
import * as Store from 'Api/S3'
import { put, call, select, takeEvery, delay } from 'redux-saga/effects'
import { message } from 'antd'
import { getLang } from '../selectors'
import { Modal } from 'antd'

import actions from 'Modules/App/actions'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('App/sagas/user')

const sagas: any = []

// DOWNLOAD_EULA
sagas.push(takeEvery(actions.application.DOWNLOAD_EULA, downloadEula))
function* downloadEula(body: {
  type: string
  payload: { storage_url: string; language: string }
}) {
  const { storage_url: storageUrl, language } = body.payload // yield call(RBAC.whoIAmSaga)
  if (_.isNil(storageUrl)) {
    if (language === 'it') {
      message.error('Errore nel download del documento')
    } else {
      message.error('Error while downloading the document')
    }
  } else {
    try {
      yield call(Store.download, storageUrl, language)
      yield put(actions.application.downloadEulaSuccess())
    } catch (error: any) {
      log.error({ error })
      yield put(actions.application.downloadEulaFail({ error }))
    }
  }
}

sagas.push(
  takeEvery(actions.application.REQUEST_CREDENTIALS, requestCredentials)
)
function* requestCredentials(body: { type: string; payload: any }) {
  log.info('requestCredentials.values', body)
  try {
    const { back } = body.payload
    const response: { [key: string]: string } = yield call(
      Profile.requestCredentialsSaga,
      _.omit(body.payload, ['back'])
    )

    log.info('load.subject', response)

    yield delay(1000)
    yield put(actions.application.requestCredentialsSuccess(response))

    const language: string = yield select(getLang)

    Modal.success({
      title:
        language === 'it'
          ? 'Richiesta inviata con successo'
          : 'Request sent successfully',
      content:
        language === 'it'
          ? 'Abbiamo preso in carico la tua richiesta. Verrai ricontattato a utenza creata.'
          : 'We have taken care of your request. You will be contacted when the user is created.',
      afterClose() {
        back(false)
      },
    })
  } catch (error: any) {
    log.error({ error })
    yield put(actions.application.requestCredentialsFail({ error }))
  }
}

export default sagas
