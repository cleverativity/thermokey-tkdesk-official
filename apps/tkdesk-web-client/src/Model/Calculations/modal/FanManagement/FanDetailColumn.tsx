import _ from 'lodash'
import { Col } from 'antd'

import {
  StyledAlert,
  StyledCover,
  StyledCoverText,
  StyledRow,
  StyledSpinner,
} from 'Components/Styled'
import { FieldDecimalNumber } from 'Components/Field'
import { DetailNumber } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'

import NominalDataTable from '../../InputParameters/table/NominalDataTable'

const FanDetailColumn = ({
  fan_type,
  fan_model_detail,
  interpolation,
  isLoadingDetail,
  isLoadingInterpolation,
  isFanModelsIncompatibleWithGeometry,
  setFieldValue,
}: any) => {
  const airflow_rate = _.get(interpolation, 'volume', {})
  const pressure_drops = _.get(interpolation, 'pressure_drop', {})
  const rpm = _.get(interpolation, 'rpm', null)

  const isInterpolationNotDefined = !interpolation || isLoadingInterpolation

  return (
    <Col span={10} style={{ paddingRight: 0 }}>
      <div style={{ position: 'relative' }}>
        {(!fan_model_detail || isLoadingDetail) && <StyledCover />}
        {isLoadingDetail && (
          <StyledCoverText>
            <StyledSpinner />
          </StyledCoverText>
        )}

        <SpanIntl
          style={{ fontWeight: 'bold' }}
          value='data.fan_models.modal.nominal_data'
        />
        <NominalDataTable detailData={fan_model_detail} />
      </div>

      <StyledRow style={{ marginTop: '20px' }}>
        <FieldDecimalNumber
          name='n_fans'
          label='data.fan_models.modal.fan_number'
          scale={0}
          span={12}
          disabled={!fan_model_detail}
          overrideOnChange={(value: any) => {
            setFieldValue('n_fans', value, false)
          }}
        />
        <FieldDecimalNumber
          name='n_coils'
          label='data.fan_models.modal.battery_number'
          scale={0}
          span={12}
          disabled={!fan_model_detail}
          overrideOnChange={(value: any) => {
            setFieldValue('n_coils', value, false)
          }}
        />
      </StyledRow>

      <StyledRow>
        <FieldDecimalNumber
          name='esp'
          label='data.fan_models.modal.esp'
          scale={0}
          span={12}
          disabled={!fan_model_detail}
          overrideOnChange={(value: any) => {
            setFieldValue('esp', value, false)
          }}
        />
        {fan_type === 'ec' && (
          <FieldDecimalNumber
            name='rpm_percentage'
            label='data.fan_models.modal.rpm_percentage'
            scale={0}
            span={12}
            disabled={!fan_model_detail}
            max={100}
            overrideOnChange={(value: any) => {
              setFieldValue('rpm_percentage', value, false)
            }}
          />
        )}
      </StyledRow>

      <div style={{ position: 'relative' }}>
        {isFanModelsIncompatibleWithGeometry && !isInterpolationNotDefined && (
          <StyledAlert
            showIcon
            type='warning'
            description='data.calculations.input_parameters.entry_conditions.warning.banner'
          />
        )}

        {isInterpolationNotDefined && <StyledCover />}
        {isLoadingInterpolation && (
          <StyledCoverText>
            <StyledSpinner />
          </StyledCoverText>
        )}

        <StyledRow>
          <DetailNumber
            hideLabel={false}
            span={8}
            label='data.calculations.input_parameters.entry_conditions.flow_rate_air'
          >
            {airflow_rate}
          </DetailNumber>
          <DetailNumber
            hideLabel={false}
            span={8}
            label='data.fan_models.modal.pressure_drop'
          >
            {pressure_drops}
          </DetailNumber>
          {rpm && (
            <DetailNumber
              hideLabel={false}
              span={8}
              label='data.fan_models.modal.rpm'
            >
              {rpm}
            </DetailNumber>
          )}
        </StyledRow>
      </div>
    </Col>
  )
}

export default FanDetailColumn
