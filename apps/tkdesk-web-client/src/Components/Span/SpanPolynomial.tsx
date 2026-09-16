import _ from 'lodash'
import { sanitizeHtml } from 'Utils/sanitizeHtml'

interface PolynomialSpanProps {
  value: any
}

const SpanPolynomial = (props: PolynomialSpanProps) => {
  const { value } = props

  const parsePolynomial = (polynomial: any) => {
    const { coefficients = [], variables = [] } = polynomial

    const terms = _.map(coefficients, ({ value = 0, exp = [] }) => {
      return `(${value} * ${_.join(
        _.map(variables, (v, idx) => `${v.name}^${_.get(exp, idx, 0)}`),
        ' * ',
      )})`
    })

    const parsedTerms = _.map(terms, (term) => {
      let modifiedItem = term.replace(/x\^0/g, '').replace(/Ts\^0/g, '')

      modifiedItem = modifiedItem.replace(/[()]/g, '')

      modifiedItem = modifiedItem.replace(/(\^)(\d+)/g, '<sup>$2</sup>')

      modifiedItem = modifiedItem.replace(/\s?\*\s?/g, '').trim()

      return _.isEmpty(modifiedItem) ? null : modifiedItem
    })

    return _.join(parsedTerms, ' + ')
  }

  const polynomialHtml = parsePolynomial(value)
  const sanitizedPolynomialHtml = sanitizeHtml(polynomialHtml)

  return <span dangerouslySetInnerHTML={{ __html: sanitizedPolynomialHtml }} />
}

export default SpanPolynomial
