import { useIntl } from 'react-intl'
import _ from 'lodash'

import { Detail, DetailIntl, DetailNumber } from 'Components/Detail'
import { SpanIntl, SpanNumber } from 'Components/Span'
import { StyledDescriptions } from 'Components/Styled'

const FanModel = ({ data }: any) => {
  const intl = useIntl()

  const min_op_temp = _.get(data, 'min_op_temp', 0)
  const max_op_temp = _.get(data, 'max_op_temp', 0)
  const rpm_min = _.get(data, 'rpm_min', 0)
  const rpm_max = _.get(data, 'rpm_max', 0)

  const items = [
    {
      label: <SpanIntl value='data.fan_models.fan_type' />,
      children: (
        <DetailIntl prefix='select.fan_models.fan_type.' name='fan_type' />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.phase_type' />,
      children: (
        <DetailIntl prefix='select.fan_models.phase_type.' name='phase_type' />
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.serie_id' />,
      children: <Detail name='serie_id' />,
    },
    {
      label: <SpanIntl value='data.fan_models.fan_diameter' />,
      children: <Detail name='fan_diameter' />,
    },
    {
      label: <SpanIntl value='data.fan_models.erp' />,
      children: (
        <Detail name='erp'>
          {intl.formatMessage({
            id: _.get(data, 'erp') ? 'ui.generic.true' : 'ui.generic.false',
          })}
        </Detail>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.special' />,
      children: (
        <Detail name='special'>
          {intl.formatMessage({
            id: _.get(data, 'special') ? 'ui.generic.yes' : 'ui.generic.no',
          })}
        </Detail>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.silenced' />,
      children: (
        <Detail name='silenced'>
          {intl.formatMessage({
            id: _.get(data, 'silenced') ? 'ui.generic.yes' : 'ui.generic.no',
          })}
        </Detail>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.enabled' />,
      children: (
        <Detail name='enabled'>
          {intl.formatMessage({
            id: _.get(data, 'enabled') ? 'ui.generic.yes' : 'ui.generic.no',
          })}
        </Detail>
      ),
    },
    {
      label: <SpanIntl value='data.fan_models.ul' />,
      children: (
        <Detail name='ul'>
          {intl.formatMessage({
            id: _.get(data, 'ul') ? 'ui.generic.yes' : 'ui.generic.no',
          })}
        </Detail>
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
      label: <SpanIntl value='data.fan_models.link' />,
      children: <DetailIntl prefix='select.fan_models.link.' name='link' />,
    },
    {
      label: <SpanIntl value='data.fan_models.ref_density' />,
      children: <DetailNumber name='ref_density' />,
    },
    {
      label: <SpanIntl value='data.fan_models.voltage' />,
      children: <DetailNumber name='voltage' scale={0} />,
    },
    {
      label: <SpanIntl value='data.fan_models.frequency' />,
      children: <DetailNumber name='frequency' scale={0} />,
    },
    {
      label: <SpanIntl value='data.fan_models.power_consumption' />,
      children: <DetailNumber name='power_consumption' />,
    },
    {
      label: <SpanIntl value='data.fan_models.current_consumption' />,
      children: <DetailNumber name='current_consumption' />,
    },
    {
      label: <SpanIntl value='data.fan_models.nominal_rpm' />,
      children: <DetailNumber name='rpm' />,
    },
    {
      label: <SpanIntl value='data.fan_models.noise' />,
      children: <DetailNumber name='noise' scale={0} />,
    },
  ]

  return <StyledDescriptions items={items} />
}

export default FanModel
