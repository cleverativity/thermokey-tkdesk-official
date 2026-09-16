import { Select } from 'antd'
import { SpanIntl } from 'Components/Span'
import _ from 'lodash'
import styled from 'styled-components'
import { FormikField } from '../Formik'

const SelectOption = Select.Option

const StyledFormikField = styled(FormikField)`
  .ant-select {
    width: 100%;
  }
`
interface FieldRangeSelectProps {
  options: any[]
  [key: string]: any
}

const FieldRangeSelect = (props: FieldRangeSelectProps) => {
  const {
    options,
    optionProps = _.identity,
    optionRender = null,
    optionMessagePath = ['key'],
    optionKeyPath = ['key'],
    prefix = '',
    enabled = null,
    seq = null,
    unlocalizeMessage = false,
    isLanguage,
    ...other
  } = props

  const selectOptions = _.chain(options)
    .map((opt: { [key: string]: any }, idx: number) => {
      const key = _.get(opt, optionKeyPath)
      const message: unknown = _.get(opt, optionMessagePath)

      const optProps = _.omit(optionProps(opt), 'key')

      // if the enabeld array is present, it filters the
      // the list of options
      if (!_.isNil(enabled) && !_.includes(enabled, key)) {
        return null
      }
      return (
        <SelectOption
          value={key}
          disabled={_.isNil(opt.enabled) ? false : !opt.enabled}
          data-cy={`cy.${key}`}
          key={key}
          {...optProps}
        >
          <span
            id={`${props.name}.${key}`}
            data-seq={`${seq || props.name}.${idx}`}
          >
            {!_.isNil(optionRender) ? (
              optionRender({ ...opt, ...optProps, prefix })
            ) : unlocalizeMessage ? (
              message
            ) : (
              <SpanIntl prefix={prefix} value={String(message)} />
            )}
          </span>
        </SelectOption>
      )
    })
    .reject(_.isNil)
    .value()

  return (
    <StyledFormikField {...other} component={Select}>
      {selectOptions}
    </StyledFormikField>
  )
}

export default FieldRangeSelect
