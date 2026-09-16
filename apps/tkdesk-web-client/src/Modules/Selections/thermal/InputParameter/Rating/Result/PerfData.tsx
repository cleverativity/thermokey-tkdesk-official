import { LineChartOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

function PerfData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_performance_data'
      icon={<LineChartOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.performance_data.capacity',
          value: selectedMachine ? 157.3 : null,
          unit: 'kW',
        },
        {
          labelId: 'data.thermal.rating.performance_data.mode',
          value: selectedMachine ? 'FluidCooling' : null,
        },
        {
          labelId: 'data.thermal.rating.performance_data.condition',
          value: selectedMachine ? 'Dry' : null,
        },
      ]}
    />
  )
}

export default PerfData
