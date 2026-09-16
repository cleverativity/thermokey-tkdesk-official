import * as R from 'ramda'
import * as MS from 'Model/Settings/marshal'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Users/Marshal')

export function marshalUserTo(values: any, creationSchema: any) {
  log.debug('marshalUserTo.before', values)
  const { user_permissions } = values

  const newPermissions = MS.marshalSettingsTo(
    user_permissions,
    true,
    creationSchema,
  )

  const { newCorrectiveFactors } = newPermissions

  const newUser = R.dissoc<any, any>('global_settings', {
    ...values,
    user_permissions: newCorrectiveFactors,
  })

  log.debug('marshalUserTo.after', newUser)
  return newUser
}

export function marshalUserFrom(values: any) {
  log.debug('marshalUserFrom.before', values)
  const { user_permissions } = values
  const newPermissions = MS.marshalSettingsFrom({ value: user_permissions }, {})
  log.debug('marshalUserFrom.after', {
    ...values,
    user_permissions: newPermissions,
  })
  return { ...values, user_permissions: newPermissions }
}
