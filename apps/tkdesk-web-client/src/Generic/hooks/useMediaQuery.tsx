import { Grid } from 'antd'

const { useBreakpoint } = Grid
const useMediaQuery = () => {
  const { xs, sm, md, lg, xl, xxl } = useBreakpoint()
  return {
    isXSmallScreen: xs && !(sm || md || lg || xl || xxl),
    isSmallScreen: (sm || xs) && !(md || lg || xl || xxl),
    isMediumScreen: md && !(lg || xl || xxl),
    isLargeScreen: lg && !(xl || xxl),
    isXLargeScreen: xl && !xxl,
    isXXLargeScreen: xxl,
  }
}

export default useMediaQuery
