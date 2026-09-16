/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV?: string
  readonly VITE_AWS_LOGGER_LEVEL?: string
  readonly VITE_FORCE_ACTIVE_SENTRY?: string
  readonly VITE_ENABLE_DEVELOPMENT_FEATURES?: string
  readonly VITE_ENABLE_FORMIK_STATE_INSPECTOR?: string
  readonly VITE_FAKE_RBAC_PERMISSIONS?: string
  readonly VITE_CUSTOMER_REGISTRATION_DISABLE_TABS_LOCKING?: string
  readonly VITE_INTERNAL_REGISTRATION_DISABLE_TABS_LOCKING?: string
  readonly VITE_COLLABORATOR_REGISTRATION_DISABLE_TABS_LOCKING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface EndPoint {
  name: string
  gateway_url: string
  port: string
  region: string
}
interface CommonObject {
  error?: boolean | string
  [index: string]:
    | string
    | number
    | boolean
    | { result: any; request: any }
    | any
}

interface ObjNumber {
  [index: string]: number | number[][] | number[]
}

interface CommonState {
  params?: undefined | any
  data?: any
  loading?: boolean
  error?: boolean | string
  updating?: boolean | string
  [key: string]: any
}

interface AppState {
  general: GlobalState
  calculation: GlobalState
  profile: GlobalState
  user: GlobalState
  selection: GlobalState
  fan_model: GlobalState
  router: any
  settings: GlobalState
  order: GlobalState
}

interface GlobalState {
  useCase?: CommonState
  inputParameter?: CommonState
  modelsList?: CommonState
  modelDetail?: CommonState
  search?: CommonState
  create?: CommonState
  detail?: CommonState
  edit?: CommonState
  manage?: CommonState
  launch?: CommonState
  profile?: CommonState
  application?: CommonState
  corrective_factors?: CommonState
  refrigerants?: CommonState
  generic?: CommonState
  polynomials?: GlobalState
  thermal?: CommonState
}

type PropsWithChildren<P> = P & { children?: React.ReactNode }

interface MenuVoice {
  key: string
  label: string
  icon?: React.ForwardRefExoticComponent
  permission: string
  children?: MenuVoice[]
  external?: boolean
  preload?: boolean
}

interface SearchParameters {
  query?: string
  filters?: any[]
  orders?: string[]
  pagination?: {
    pageSize: number
    current: number
    total: number
  }
  ranges?: any[]
}
