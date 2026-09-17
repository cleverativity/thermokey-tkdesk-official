import { LineChartOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { formatRatingUnit, ResultDataProps } from './types'

function PerfData(props: ResultDataProps) {
  const { calculation } = props
  const data = calculation?.performanceData

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_performance_data'
      icon={<LineChartOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.performance_data.capacity',
          value: data?.capacity ?? null,
          unit: formatRatingUnit(data?.capacityUnit) ?? 'kW',
        },
        {
          labelId: 'data.thermal.rating.performance_data.mode',
          value: data?.mode ?? null,
        },
        {
          labelId: 'data.thermal.rating.performance_data.condition',
          value: data?.condition ?? null,
        },
      ]}
    />
  )
}

export default PerfData
