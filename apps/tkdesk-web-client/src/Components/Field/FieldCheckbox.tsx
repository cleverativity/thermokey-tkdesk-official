import { Checkbox } from 'antd'
import { useIntl } from 'react-intl'
import _ from 'lodash'
import * as R from 'ramda'

import { FormikField } from '../Formik'
import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

interface FieldCheckboxProps {
  name: string
  label?: string
  options: any
  [key: string]: any
}

const FieldCheckbox = (props: FieldCheckboxProps) => {
  const {
    name,
    options,
    children,
    value = false,
    defaultValue,
    unlocalizedLabel,
    hideOptionLabel = false,
    unlocalizedOptionLabel = false,
    requiredSingle,
    onChange = null,
    checked = null,
    vertical = false,
    ...other
  } = props
  const intl = useIntl()

  const newOptions: any = R.map((el: any) => {
    return {
      ...el,
      label: hideOptionLabel
        ? ''
        : unlocalizedOptionLabel
          ? el.label
          : intl.formatMessage({ id: el.label ?? 'empty' }),
    }
  })(options)

  const newDefault = _.isNil(defaultValue) ? [] : defaultValue

  return (
    <FormikField
      {...other}
      name={name}
      component={(p: any) => {
        return R.length(newOptions) > 1 ? (
          <StyledCheckboxGroup
            {...props}
            value={_.defaultTo(p.value, newDefault)}
            options={newOptions}
            data-cy={`cy.${name}`}
            style={vertical ? { display: 'flex', flexDirection: 'column' } : {}}
            onChange={(checkedValue) => {
              if (p.onChange) {
                p.onChange(checkedValue)
              }
            }}
          />
        ) : (
          <StyledCheckbox
            {...props}
            checked={_.isNil(checked) ? _.defaultTo(p.value, false) : checked}
            data-cy={`cy.${name}`}
            onChange={(e) => {
              if (p.onChange) {
                if (!_.isNil(onChange)) {
                  onChange(e.target)
                }
                p.onChange(e.target.checked)
              }
            }}
          >
            {requiredSingle ? (
              <span style={{ color: colors.danger }}>* </span>
            ) : null}
            {newOptions[0].label}
          </StyledCheckbox>
        )
      }}
    />
  )
}

const StyledCheckboxGroup = styled<any>(Checkbox.Group)`
  label.ant-checkbox-wrapper {
    margin-bottom: ${(props) => (props.vertical ? '10px' : 0)};
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-disabled.ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: ${colors.primary_disabled};
      border-color: transparent;
    }

    .ant-checkbox-inner::after {
      border-color: ${colors.white} !important;
    }
  }
`

export default FieldCheckbox
