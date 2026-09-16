import _ from 'lodash'

import { actionsProfile, actionsFunctionsProfile } from './profile'
import { actionsApplication, actionsFunctionsApplication } from './application'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('App/actions')

const actions = {
  profile: actionsProfile,
  application: actionsApplication,
}

const actionsFunctions = {
  profile: actionsFunctionsProfile,
  application: actionsFunctionsApplication,
}

const aa = _.merge(actions, actionsFunctions)
console.debug('AApplication', aa)

export default aa
