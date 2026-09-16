interface Polynomials {
  id?: number
  polynomial_type?: string
  poly_config?: {
    variables?: Array<{
      name?: string
      min?: number
      max?: number
    }>
    coefficients?: Array<{
      exp: [number]
      value: number
    }>
  }
}

interface FunctionPlotProps {
  options?: FunctionPlotOptions
}
