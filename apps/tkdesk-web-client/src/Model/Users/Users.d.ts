interface User {
  id?: number
  user_permissions?: any
  code?: string
  user_type?: number
  username?: string
  status?: number
  eula?: boolean
  activation_date?: string
  expiration_date?: string
  registry?: Registry
  global_settings?: any
}

interface Registry {
  id?: number
  name?: string
  surname?: string
  company_email?: string
  company_name?: string
  company_telephone?: string
  company_role?: number
  jde_id?: string
}
