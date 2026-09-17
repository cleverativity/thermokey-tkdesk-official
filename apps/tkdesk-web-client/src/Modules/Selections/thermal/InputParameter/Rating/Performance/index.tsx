import React, { useState } from 'react'
import { Col } from 'antd'
import { StyledRow } from 'Components/Styled'
import { useFormikContext } from 'formik'
import _ from 'lodash'
import styled from 'styled-components'
import { useRating } from '../../../hooks/useRating'
import RatingFilterParameter from '../Filter'
import Mode from './Mode'
import Air from './Air'
import Liquid from './Liquid'
import Ventilation from './Ventilation'
import Noise from './Noise'
import RatingResult from '../Result'
import { PefMachine } from '../Result/types'

interface RatingPerfParameterProps {
  data?: any
  preferences: any
}

const RatingLayout = styled.div`
  .rating-fields {
    .ant-form-item {
      margin-bottom: 0;
    }

    .ant-form-item-explain,
    .ant-form-item-extra,
    .ant-form-item-additional {
      display: none;
    }

    p,
    .ant-radio-wrapper,
    .ant-radio-wrapper span {
      margin-bottom: 0;
      font-family: 'Avenir Medium', sans-serif;
      font-size: 15px;
      line-height: 22px;
    }

    .ant-select,
    .ant-select-selector,
    .ant-select-selection-item,
    .ant-select-selection-item span,
    .ant-input-number,
    .ant-input-number-input {
      font-family: 'Avenir Medium', sans-serif;
      font-size: 15px !important;
    }
  }
`

function RatingPerfParameter(props: RatingPerfParameterProps) {
  const { data, preferences } = props
  const unitsType = _.get(preferences, 'um_system', 'si')
  const { values } = useFormikContext<any>()
  const rating = _.get(values, 'rating', {})
  const [selectedMachine, setSelectedMachine] = useState<PefMachine | null>(
    null,
  )

  const { machines, calculation, isLoading, isCalculating, calculate } =
    useRating({
      rating,
      unitsType,
      selectedMachine,
    })

  return (
    <RatingLayout>
      <StyledRow gutter={[24, 16]} align='top'>
        <Col xs={24} lg={8} className='rating-fields'>
          <RatingFilterParameter data={data} preferences={preferences} />
          <Mode />
          <Liquid data={data} unitTypes={unitsType} />
          <Air unitTypes={unitsType} />
          <Ventilation unitTypes={unitsType} />
          <Noise unitTypes={unitsType} />
        </Col>
        <Col xs={24} lg={16}>
          <RatingResult
            machines={machines}
            loading={isLoading}
            calculating={isCalculating}
            calculation={calculation}
            onSelectMachine={setSelectedMachine}
            onCalculate={() => calculate(selectedMachine)}
          />
        </Col>
      </StyledRow>
    </RatingLayout>
  )
}

export default RatingPerfParameter
