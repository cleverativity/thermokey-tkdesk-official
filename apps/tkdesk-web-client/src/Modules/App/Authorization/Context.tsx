import React, { useContext } from 'react'
import _ from 'lodash'

const AuthorizationContext = React.createContext([])

export const AuthorizationProvider = ({ children, value }: any) => (
  <AuthorizationContext.Provider value={value}>
    {children}
  </AuthorizationContext.Provider>
)

export function useAuthorization() {
  const { user_permissions, user_type }: any = useContext(AuthorizationContext)

  // set of useful functions for authorization
  const bag = {
    check: check(user_permissions),
    iAmAdmin: iAmAdmin(user_type),
    iAmInternal: iAmInternal(user_type),
    iAmOemPlus: iAmOemPlus(user_type),
    iAmOem: iAmOem(user_type),
  }

  return { ...bag, permissions: user_permissions }
}

const iAmAdmin = (user_type: string) =>
  user_type === 'admin' || user_type === 'superadmin'
const iAmInternal = (user_type: string) => user_type === 'internal'
const iAmOemPlus = (user_type: string) => user_type === 'oem_plus'
const iAmOem = (user_type: string) => user_type === 'oem'

const check = _.curry((userPermissions: TKUserPermission[], perm: string) => {
  const superAdminPerm: TKUserPermission | undefined = _.find(
    userPermissions,
    (rule: TKUserPermission) => {
      return (
        _.includes(rule.actions, 'manage') && _.includes(rule.subjects, 'all')
      )
    },
  )

  if (!_.isNil(superAdminPerm)) {
    return true
  }
  const newUserPermissions: any[] = _.chain(userPermissions)
    .map((rule: TKUserPermission) =>
      _.map(rule.subjects, (subject: string) =>
        _.map(rule.actions, (action: string) => {
          if (rule.base_behavior) {
            if (action === 'manage') {
              return [
                `${subject}.${action}`, // permission for do all action below
                `${subject}.create`, // permission for create objects
                `${subject}.index`, // permission for listing objects
                `${subject}.show`, // permission for get single object
                `${subject}.update`, // permission for update objects
                `${subject}.destroy`, // permission for delete objects
              ]
            } else if (action === 'read') {
              return [`${subject}.index`, `${subject}.show`]
            } else {
              return [`${subject}.${action}`]
            }
          } else {
            return null
          }
        }),
      ),
    )
    .reject(_.isNil)
    .flattenDeep()
    .value()

  if (_.includes(newUserPermissions, perm)) {
    return true
  }

  return false
})
