type Action =
  | 'create'
  | 'read'
  | 'update'
  | 'destroy'
  | 'accept_eula'
  | 'read_tubes'
type Subject = 'User' | 'Calculation' | 'Setting'

interface TKPermissions {
  Calculation: { [key: string]: string }
  User: { [key: string]: string }
  Setting: { [key: string]: string }
}

interface TKUserPermission {
  base_behavior: boolean
  actions: Action[]
  subjects: Subject[]
  conditions: { [key: string]: string | number }
}
