import _ from 'lodash'
import { FormattedMessage, useIntl } from 'react-intl'
import { Span, SpanNumber } from 'Components/Span'
import { StyledTable } from 'Components/Styled'

const NominalDataTable = (props: any) => {
  const { detailData } = props

  const intl = useIntl()

  const measuresTable = [
    {
      letter: 'A',
      value: _.get(detailData, 'voltage', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.voltage',
      }),
    },
    {
      letter: 'B',
      value: _.get(detailData, 'frequency', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.frequency',
      }),
    },
    {
      letter: 'C',
      value: _.get(detailData, 'rpm', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.nominal_rpm',
      }),
    },

    {
      letter: 'D',
      value: _.get(detailData, 'power_consumption', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.power_consumption',
      }),
    },
    {
      letter: 'E',
      value: _.get(detailData, 'current_consumption', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.current_consumption',
      }),
    },

    {
      letter: 'F',
      value: _.get(detailData, 'ref_density', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.ref_density',
      }),
    },
    {
      letter: 'G',
      value: _.get(detailData, 'noise', ''),
      key: intl.formatMessage({
        id: 'data.fan_models.noise',
      }),
    },
  ]

  const commonColumns = [
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.field' />
      ),
      dataIndex: 'key',
      render: (key: string) => <Span value={key} />,
    },
    {
      title: (
        <FormattedMessage id='ui.coils.microchannel.model_detail.geometric_details.value' />
      ),
      dataIndex: 'value',
      render: (value: any, record: any) => (
        <SpanNumber
          scale={_.includes(['A'], record.letter) ? 0 : 2}
          value={value}
        />
      ),
    },
  ]

  return (
    <StyledTable
      loading={false}
      pagination={false}
      rowKey='letter'
      size='small'
      bordered
      dataSource={measuresTable}
      columns={commonColumns}
    />
  )
}

export default NominalDataTable
