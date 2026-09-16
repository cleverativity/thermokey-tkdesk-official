import _ from 'lodash'
import { Field } from 'formik'
import _Detail from './Detail'
import _DetailIntl from './DetailIntl'
import _DetailNumber from './DetailNumber'
import _DetailIntlDate from './DetailIntlDate'
import _DetailText from './DetailText'
import _DetailList from './DetailList'
import _DetailPercentage from './DetailPercentage'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Detail/index')

interface DetailConnectProps {
  name?: string
  children?: any
  [key: string]: any
}

const DetailConnect = (Detail: any) => (props: DetailConnectProps) => {
  const { name, children, validate = {}, ...other } = props

  if (!_.isNil(name) && _.isNil(children)) {
    return (
      <Field name={name} validate={validate}>
        {({ field, meta }: { field: any; meta?: any }) => {
          return (
            <Detail name={name} {...other} meta={meta}>
              {field.value}
            </Detail>
          )
        }}
      </Field>
    )
  } else {
    return (
      <Detail name={name} {...other}>
        {children}
      </Detail>
    )
  }
}

export const Detail = DetailConnect(_Detail)
export const DetailIntl = DetailConnect(_DetailIntl)
export const DetailDate = DetailConnect(_DetailIntlDate)
export const DetailNumber = DetailConnect(_DetailNumber)
export const DetailText = DetailConnect(_DetailText)
export const DetailList = DetailConnect(_DetailList)
export const DetailPercentage = DetailConnect(_DetailPercentage)
