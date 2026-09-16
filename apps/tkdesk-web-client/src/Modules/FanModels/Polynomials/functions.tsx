import _ from 'lodash'
import { evaluate } from 'mathjs'
import * as R from 'ramda'

export const createPolynomialFunction = (
  polynomials: Polynomials[],
): string => {
  return _.map(polynomials, (polynomial: any) => {
    const { poly_config = {} } = polynomial
    const { coefficients = [], variables = [] } = poly_config

    const polynomialTerms = _.map(coefficients, ({ value = 0, exp = [] }) => {
      return `(${value} * ${_.join(
        _.map(variables, (v, idx) => `${v.name}^${_.get(exp, idx, 0)}`),
        ' * ',
      )})`
    })

    return _.join(polynomialTerms, ' + ')
  }).join(' + ')
}

export const calculateMinMaxValues = (
  polynomials: Polynomials[],
  nValue?: number,
  xValues?: number[], // depends on interpolation, must match min and max of polynomial
) => {
  let func = createPolynomialFunction(polynomials)
  let polynomialsUpdate = polynomials
  let valueRanges = {}

  if (nValue) {
    func = R.replace(/n/g, String(nValue), func)

    polynomialsUpdate = _.map(polynomials, (poly) => {
      const variablesFiltered = _.filter(
        _.get(poly, 'poly_config.variables'),
        (variable) => {
          return _.get(variable, 'name') !== 'n'
        },
      )
      return {
        ...poly,
        poly_config: {
          ...poly.poly_config,
          variables: variablesFiltered,
        },
      }
    })
  }

  const variables = _.flatMap(polynomialsUpdate, (polynomial) =>
    _.get(polynomial, 'poly_config.variables', []),
  )

  const variableNames = _.map(variables, 'name')

  const firstVar: any = variableNames[0]

  if (!xValues || _.isEmpty(xValues)) {
    const minMaxByVariable = _.mapValues(
      _.groupBy(variables, 'name'),
      (vars) => {
        const varData = vars[0] || {}
        return {
          min: _.get(varData, 'min', 0),
          max: _.get(varData, 'max', 0),
        }
      },
    )

    const filteredValueRanges = _.mapValues(
      minMaxByVariable,
      ({ min, max }) => {
        const middle = (min + max) / 2
        return [min, middle, max]
      },
    )

    const steps = 25
    const fullRanges = _.mapValues(minMaxByVariable, ({ min, max }) => {
      const step = _.ceil((max - min) / steps)

      return _.range(min, max + step, step)
    })

    if (!firstVar) return null
    valueRanges = {
      ..._.pick(fullRanges, [firstVar]),
      ..._.omit(filteredValueRanges, [firstVar]),
    }
  } else {
    valueRanges = { [firstVar]: xValues }
  }

  const dataPoints = _.map(cartesianProduct(valueRanges), (v) => ({
    ...v,
    y: evaluate(func, v),
  }))

  return { variableNames, valueRanges, dataPoints }
}

function cartesianProduct(obj: Record<string, number[]>) {
  const keys = Object.keys(obj)
  const allCombos = _.reduce(
    keys,
    (acc, key) =>
      _.flatMap(acc, (partial) =>
        obj[key].map((value) => ({ ...partial, [key]: value })),
      ),
    [{}],
  )
  return allCombos
}
