import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { Detail, DetailIntl, DetailNumber } from 'Components/Detail'
import { useIntl } from 'react-intl'
import _ from 'lodash'
import { SpanIntl, SpanNumber } from 'Components/Span'

const FanModelSide = ({ data }: any) => {
  const intl = useIntl()

  const min_op_temp = _.get(data, 'min_op_temp', 0)
  const max_op_temp = _.get(data, 'max_op_temp', 0)
  const rpm_min = _.get(data, 'rpm_min', 0)
  const rpm_max = _.get(data, 'rpm_max', 0)

  const items = [
    {
      label: <SpanIntl value='data.fan_models.fan_type' />,
      children: (
        <DetailIntl
          prefix='select.fan_models.fan_type.'
          name='detail_data.fan_model_details.fan_type'
        />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.fan_diameter' />,
      children: (
        <DetailNumber name='detail_data.fan_model_details.fan_diameter' />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.erp' />,
      children: (
        <Detail name='erp'>
          {intl.formatMessage({
            id: _.get(data, 'erp') ? 'ui.generic.yes' : 'ui.generic.no',
          })}
        </Detail>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.link' />,
      children: (
        <DetailIntl
          prefix='select.fan_models.link.'
          name='detail_data.fan_model_details.link'
        />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.op_temp' />,
      children: (
        <>
          <SpanNumber value={min_op_temp} scale={0} />
          {' / '}
          <SpanNumber value={max_op_temp} scale={0} />
        </>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.rpm' />,
      children: (
        <>
          <SpanNumber value={rpm_min} scale={0} />
          {' / '}
          <SpanNumber value={rpm_max} scale={0} />
        </>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.voltage' />,
      children: (
        <DetailNumber scale={0} name='detail_data.fan_model_details.voltage' />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.frequency' />,
      children: <DetailNumber name='detail_data.fan_model_details.frequency' />,
    },
    {
      label: <SpanIntl value='data.fan_models.power_consumption' />,
      children: (
        <DetailNumber
          scale={0}
          name='detail_data.fan_model_details.power_consumption'
        />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.current_consumption' />,
      children: (
        <DetailNumber name='detail_data.fan_model_details.current_consumption' />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.nominal_rpm' />,
      children: (
        <DetailNumber scale={0} name='detail_data.fan_model_details.rpm' />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['10']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='10'
        header='ui.coils.microchannel.model_detail.fan_model_side'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default FanModelSide
