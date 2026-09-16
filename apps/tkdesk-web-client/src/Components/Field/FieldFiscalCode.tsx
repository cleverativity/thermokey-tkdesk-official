import _ from 'lodash'
import { Input } from 'antd'

import { FormikField } from '../Formik'

const validateCF = (cfins: string) => {
  const cf = _.defaultTo(cfins, '').toUpperCase()

  if (_.isNil(cf) || _.isEmpty(cf)) {
    return undefined
  }

  if (cf.length !== 16) {
    return 'comp.field.fiscalCode.errors.invalid_size'
  }

  const cfReg =
    /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/

  /*

    OLD:  
    /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/

    OLD STRONG:  
    /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/

    NEW COMPLETE: 
    /^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i

    NEW: 
    /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/
   */

  if (!cfReg.test(cf)) {
    return 'comp.field.fiscalCode.errors.invalid_format'
  }

  const set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const setpari = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const setdisp = 'BAKPLCQDREVOSFTGUHMINJWZYX'
  let s = 0
  for (let i = 1; i <= 13; i += 2)
    s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))))

  for (let j = 0; j <= 14; j += 2)
    s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(j))))

  if (s % 26 !== cf.charCodeAt(15) - 'A'.charCodeAt(0)) {
    return 'comp.field.fiscalCode.errors.invalid_checksum'
  }

  return undefined
}

const FieldFiscalCode = (props: any) => {
  const { isLegal = false } = props
  const transformFunction = _.partial((el: any) =>
    _.chain(el)
      .defaultTo('')
      .toUpper()
      .replace(/[^A-Z0-9]/g, '')
      .value(),
  )

  return (
    <FormikField
      component={Input}
      disableCustomOnChange
      validate={!isLegal ? validateCF : null}
      localizationErrorValues={(value: any) => ({
        current: value ? value.length : 0,
      })}
      transformTo={transformFunction}
      {...props}
    />
  )
}

export default FieldFiscalCode
