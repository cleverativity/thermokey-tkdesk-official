import { useIntl } from 'react-intl'
import { Col } from 'antd'

import { StyledCard, StyledRow } from 'Components/Styled'
import {
  FieldCheckbox,
  FieldDecimalNumber,
  FieldInput,
  FieldSelectFanType,
  FieldSelectLink,
  FieldSelectPhaseType,
  FieldSelectVisibility,
} from 'Components/Field'

const FanModelsCreationForm = ({ mode }: { mode: string }) => {
  const intl = useIntl()

  return (
    <>
      <StyledCard>
        <StyledRow>
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='model_code'
            label='ui.generic.model_code'
            required
          />
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='article_no'
            label='data.fan_models.article_no'
          />
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='print_code'
            label='data.fan_models.print_code'
          />
        </StyledRow>
        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='weight'
            label='data.fan_models.weight'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='price'
            label='data.fan_models.price'
          />

          <FieldSelectVisibility
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='visibility'
          />
        </StyledRow>
      </StyledCard>

      <StyledCard>
        <StyledRow>
          <FieldSelectFanType
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='fan_type'
          />
          <FieldSelectPhaseType
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='phase_type'
          />
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='cst_model_name'
            label='data.fan_models.cst_model_name'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            scale={0}
            label='data.fan_models.serie_id'
            name='serie_id'
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            scale={0}
            label='data.fan_models.fan_diameter'
            name='fan_diameter'
          />
          <FieldCheckbox
            span={{ sm: 6, lg: 12, xl: 5 }}
            name='erp'
            options={[{ label: 'data.fan_models.erp' }]}
          />
          <FieldCheckbox
            span={{ sm: 6, lg: 6, xl: 3 }}
            name='special'
            options={[{ label: 'data.fan_models.special' }]}
          />
          <FieldCheckbox
            span={{ sm: 6, lg: 6, xl: 3 }}
            name='silenced'
            options={[{ label: 'data.fan_models.silenced' }]}
          />
          <FieldCheckbox
            span={{ sm: 6, lg: 6, xl: 3 }}
            name='enabled'
            options={[{ label: 'data.fan_models.enabled' }]}
          />
          <FieldCheckbox
            span={{ sm: 6, lg: 6, xl: 3 }}
            name='ul'
            options={[{ label: 'data.fan_models.ul' }]}
          />
        </StyledRow>

        <StyledRow style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={3}>
            {`${intl.formatMessage({
              id: `data.fan_models.op_temp`,
            })}`}
          </Col>
          <FieldDecimalNumber
            span={3}
            min={-100}
            scale={0}
            name='min_op_temp'
            label='data.fan_models.op_temp.min_op_temp'
          />
          <FieldDecimalNumber
            span={3}
            min={-100}
            scale={0}
            name='max_op_temp'
            label='data.fan_models.op_temp.max_op_temp'
          />

          <Col span={3} />

          <Col span={3}>
            {intl.formatMessage({
              id: `data.fan_models.rpm`,
            })}
          </Col>
          <FieldDecimalNumber
            span={3}
            scale={0}
            name='rpm_min'
            label='data.fan_models.rpm.rpm_min'
          />
          <FieldDecimalNumber
            span={3}
            scale={0}
            name='rpm_max'
            label='data.fan_models.rpm.rpm_max'
          />
        </StyledRow>

        <StyledRow>
          <FieldSelectLink span={{ sm: 24, lg: 12, xl: 6 }} name='link' />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='ref_density'
            label='data.fan_models.ref_density'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            min={-10}
            scale={0}
            label='data.fan_models.voltage'
            name='voltage'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            scale={0}
            label='data.fan_models.frequency'
            name='frequency'
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            label='data.fan_models.power_consumption'
            name='power_consumption'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            label='data.fan_models.current_consumption'
            name='current_consumption'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            scale={0}
            label='data.fan_models.nominal_rpm'
            name='rpm'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 6 }}
            scale={0}
            label='data.fan_models.noise'
            name='noise'
          />
        </StyledRow>
      </StyledCard>
    </>
  )
}

export default FanModelsCreationForm
