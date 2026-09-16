import { ConsoleLogger } from 'aws-amplify/utils'
import {
  getRouteLoadActions,
  getRouteLoadActionsFunctions,
} from 'Generic/actions/functions'
import * as R from 'ramda'

const PREFIX = 'DASHBOARD'

const log = new ConsoleLogger('Modules/Dashboard/actions')

const actions: any = {
  generic: {
    ...getRouteLoadActions(`${PREFIX}`),
  },
}

const actionsFunctions: any = {
  generic: {
    ...getRouteLoadActionsFunctions(actions.generic),
  },
}

const aa = R.mergeDeepLeft(actions, actionsFunctions)
log.debug('ADashboard', aa)

export default aa
