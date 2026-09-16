import _ from 'lodash'
import { Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useFormikContext } from 'formik'

import {
  FieldMinMax,
  FieldSelectFanType,
  FieldSelectFrequency,
  FieldSelectPhaseType,
  FieldTrueFalse,
} from 'Components/Field'
import { SpanIntl } from 'Components/Span'
import { StyledButton, StyledRow } from 'Components/Styled'

import * as F from 'Modules/Calculations/Manage/steps/InputParameter/OperatingCondition/functions'

import { TYPE } from '../../InputParameters/constants'

const FanFiltersColumn = ({ values, params, onUpdateParams }: any) => {
  const currentCalculations = values

  const formikValues: any = useFormikContext()

  const handleOverrideOnChange = (name: string, value: any, type: string) => {
    F.getFanModels(currentCalculations, onUpdateParams, params, type, {
      name,
      value,
    })
  }

  const handleRangesChange = () => {
    const newRanges = _.get(formikValues, 'values.params.ranges')

    F.getFanModels(
      currentCalculations,
      onUpdateParams,
      params,
      TYPE.RANGE,
      newRanges,
    )
  }

  return (
    <Col span={7}>
      <SpanIntl
        style={{ fontWeight: 'bold' }}
        value='data.fan_models.modal.filters'
      />

      <StyledRow style={{ marginTop: '10px' }}>
        <FieldMinMax
          name='params.ranges.fan_diameter'
          label='data.fan_models.fan_diameter'
          scale={0}
          isRange
        />
      </StyledRow>

      <StyledRow>
        <FieldMinMax
          name='params.ranges.voltage'
          label='data.fan_models.voltage'
          scale={0}
          isRange
        />
      </StyledRow>

      <StyledButton
        id='button.search.ranges'
        icon={<SearchOutlined />}
        label='ui.generic.search'
        type='primary'
        onClick={handleRangesChange}
        style={{ marginBottom: '24px' }}
      />

      <FieldSelectFanType
        name='params.filters.fan_type'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('fan_type', value, TYPE.FILTER)
        }
      />
      <FieldSelectPhaseType
        name='params.filters.phase_type'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('phase_type', value, TYPE.FILTER)
        }
      />
      <FieldSelectFrequency
        name='params.filters.frequency'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('frequency', value, TYPE.FILTER)
        }
      />
      <FieldTrueFalse
        name='params.filters.erp'
        label='data.fan_models.erp'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('erp', value, TYPE.FILTER)
        }
      />
      <FieldTrueFalse
        name='params.filters.special'
        label='data.fan_models.special'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('special', value, TYPE.FILTER)
        }
      />
      <FieldTrueFalse
        name='params.filters.silenced'
        label='data.fan_models.silenced'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('silenced', value, TYPE.FILTER)
        }
      />
      <FieldTrueFalse
        name='params.filters.ul'
        label='data.fan_models.ul'
        overrideOnChange={(value: any) =>
          handleOverrideOnChange('ul', value, TYPE.FILTER)
        }
      />
    </Col>
  )
}

export default FanFiltersColumn
