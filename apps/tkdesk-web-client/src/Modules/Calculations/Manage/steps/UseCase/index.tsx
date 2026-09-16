import _ from 'lodash'
import { Col } from 'antd'

import { FieldSelectUseCase } from 'Components/Field'
import { StyledRow, StyledCard } from 'Components/Styled'
import { SpanIntl } from 'Components/Span'
import { FormikDependent } from 'Components/Formik'

import Description from './Description'

const UseCase = ({ enabledUseCases }: { enabledUseCases: string[] }) => {
  return (
    <StyledCard>
      <StyledRow>
        <Col span={12} offset={6} style={{ textAlign: 'center' }}>
          <SpanIntl
            style={{ fontWeight: 'bold' }}
            value='ui.coils.microchannel.use_case'
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col span={12} offset={6}>
          <FieldSelectUseCase
            enabledOptions={enabledUseCases}
            required
            hideRequired
            name='use_case'
          />
        </Col>
      </StyledRow>
      <FormikDependent
        propsFunction={({ formik }) => {
          const use_case = _.get(formik.values, 'use_case', null)
          return { use_case }
        }}
        render={({ use_case }) => {
          if (
            use_case === 'air_cooled_condenser' ||
            use_case === 'water_cooler' ||
            use_case === 'water_heater' ||
            _.startsWith(use_case, 'double_flow')
          ) {
            return <Description use_case={use_case} />
          } else {
            return null
          }
        }}
      />
    </StyledCard>
  )
}

export default UseCase
