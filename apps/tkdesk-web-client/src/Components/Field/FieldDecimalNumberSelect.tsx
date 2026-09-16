import _ from 'lodash'
import { InputNumber, Space } from 'antd'
import { useFormikContext } from 'formik'
import styled from 'styled-components'

import { FormikField } from '../Formik'
import * as V from 'Components/Field/ValidateFunctions'
import FieldRangeSelect from './FieldRangeSelect'

import * as F from 'Model/functions'

const StyledAntdUnitField = styled(FormikField)`
  .ant-input {
    &.ant-input-number-group-wrapper {
      padding: 0;
      border: 0;
    }
  }
  .ant-input,
  .ant-input-number-input {
    input {
      text-align: right;
      transition: all ease 0.3s;
    }
  }
  .ant-input-number,
  .ant-input-number-affix-wrapper {
    width: 100%;
    align-items: center;
    .ant-input-number-suffix {
      position: relative !important;
    }
  }

  .has-feedback {
    .ant-input {
      input {
        text-align: right;
        padding-right: 47px !important;
      }
    }
    .ant-form-item-children {
      &:after {
        transform: translate(-30px, -50%);
      }
    }
  }
`

const Style = styled(Space.Compact)`
  height: 32px;
`

const StyledSelect = styled(FieldRangeSelect)`
  .ant-form-item-label {
    padding: 0;
    display: none;
  }
  .ant-select {
    margin-left: -1px;
    .ant-select-selector {
      background-color: #fafafa;
      border: 1px solid #d9d9d9;
    }
  }
`

const CustomComp = (props: any) => {
  const { addSelect } = props
  const { options, name, disabled } = addSelect
  return (
    <Style>
      <InputNumber {...props} />

      <StyledSelect
        optionKeyPath={['key']}
        optionMessagePath={['key']}
        prefix='select.sat_temp_modes.'
        options={options}
        hideLabel
        disabled={disabled}
        name={name}
        allowClear={false}
      />
    </Style>
  )
}

const FieldDecimalNumberSelect = (props: { [key: string]: any }) => {
  const {
    scale = 2,
    controls = false,
    optionsBefore = null,
    prefix = <span />,
    suffix = <span />,
    transformTo = null,
    min = null,
    max = null,
    name,
    dependOn = null,
    nameBefore = null,
    disabledBefore = false,
    ...other
  } = props

  const transformFunction = _.isNil(transformTo) ? null : transformTo

  const { values } = useFormikContext()

  const objFormikValue = _.get(values, name, null)

  const unit_of_measurement = F.unitMapping(
    _.get(objFormikValue, 'unit_of_measurement', ''),
  )
  const validations = _.get(objFormikValue, 'validations', {})

  const minimum = _.isNil(min) ? _.get(validations, 'minimum', 0) : min
  const maximum = _.isNil(max) ? _.get(validations, 'maximum', null) : max

  return (
    <StyledAntdUnitField
      transformTo={transformFunction}
      component={CustomComp}
      addonAfter={unit_of_measurement}
      addSelect={{
        options: optionsBefore,
        name: nameBefore,
        disabled: disabledBefore,
      }}
      precision={scale}
      decimalSeparator=','
      componentClass='ant-input'
      controls={controls}
      localizationErrorValues={() => ({
        min: `${minimum}${unit_of_measurement}`,
        max: `${maximum}${unit_of_measurement}`,
        dependOn: `${dependOn}`,
      })}
      validate={
        _.isNil(maximum) || _.isNil(minimum)
          ? null
          : V.validateNumberBetween(
              Number(minimum),
              Number(maximum),
              dependOn,
              false,
            )
      }
      name={name}
      {...other}
    />
  )
}

export default FieldDecimalNumberSelect
