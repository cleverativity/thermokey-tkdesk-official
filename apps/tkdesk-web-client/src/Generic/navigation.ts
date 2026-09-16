import type { NavigateOptions, To } from 'react-router-dom'

type AppRouter = {
  navigate(to: number): Promise<void>
  navigate(to: To | null, options?: NavigateOptions): Promise<void>
}

let appRouter: AppRouter | null = null

export const setAppRouter = (router: AppRouter) => {
  appRouter = router
}

export function navigate(to: number): Promise<void>
export function navigate(
  to: To | null,
  options?: NavigateOptions,
): Promise<void>
export function navigate(to: To | number | null, options?: NavigateOptions) {
  if (!appRouter) {
    return Promise.reject(new Error('Router has not been initialized'))
  }

  return appRouter.navigate(to as never, options)
}
