import _ from 'lodash'

import { profileReducer } from './profile'
import { applicationReducer } from './application'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/App/reducer/index')

const appInitState = {
  profile: undefined,
  application: undefined,
}

export default function reducer(preState = appInitState, history: any) {
  const application = applicationReducer(
    _.get(preState, 'application'),
    history,
  )
  const profile = profileReducer(_.get(preState, 'profile'), history)

  const state: any = { profile, application }

  return state
}
