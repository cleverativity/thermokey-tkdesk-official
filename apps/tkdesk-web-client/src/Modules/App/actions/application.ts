import { createAction } from '@reduxjs/toolkit'

const PREFIX = 'APPLICATION'

export const actionsApplication: any = {
  // DOWNLOAD_EULA
  DOWNLOAD_EULA: `${PREFIX}_DOWNLOAD_EULA`,
  DOWNLOAD_EULA_SUCCESS: `${PREFIX}_DOWNLOAD_EULA_SUCCESS`,
  DOWNLOAD_EULA_FAIL: `${PREFIX}_DOWNLOAD_EULA_FAIL`,

  // REQUEST_CREDENTIALS
  REQUEST_CREDENTIALS: `${PREFIX}_REQUEST_CREDENTIALS`,
  REQUEST_CREDENTIALS_SUCCESS: `${PREFIX}_REQUEST_CREDENTIALS_SUCCES`,
  REQUEST_CREDENTIALS_FAIL: `${PREFIX}_REQUEST_CREDENTIALS_FAIL`,
}

export const actionsFunctionsApplication: any = {
  // DOWNLOAD_EULA
  downloadEula: createAction(actionsApplication.DOWNLOAD_EULA),
  downloadEulaSuccess: createAction(actionsApplication.DOWNLOAD_EULA_SUCCESS),
  downloadEulaFail: createAction(actionsApplication.DOWNLOAD_EULA_FAIL),

  // REQUEST_CREDENTIALS
  requestCredentials: createAction(actionsApplication.REQUEST_CREDENTIALS),
  requestCredentialsSuccess: createAction(
    actionsApplication.REQUEST_CREDENTIALS_SUCCESS,
  ),
  requestCredentialsFail: createAction(
    actionsApplication.REQUEST_CREDENTIALS_FAIL,
  ),
}
