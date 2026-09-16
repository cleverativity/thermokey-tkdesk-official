import { CloudOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

function AirData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_air_data'
      icon={<CloudOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.air_data.inlet_temperature',
          value: selectedMachine ? 25.0 : null,
          unit: '°C',
        },
        {
          labelId: 'data.thermal.rating.air_data.inlet_relative_humidity',
          value: selectedMachine ? 50 : null,
          unit: '%',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.air_data.altitude',
          value: selectedMachine ? 0 : null,
          unit: 'm',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.air_data.outlet_temperature',
          value: selectedMachine ? 36.3 : null,
          unit: '°C',
        },
        {
          labelId: 'data.thermal.rating.air_data.flowrate',
          value: selectedMachine ? '41,461' : null,
          unit: 'm³/h',
        },
        {
          labelId: 'data.thermal.rating.air_data.pressure_drop',
          value: selectedMachine ? 70 : null,
          unit: 'Pa',
          scale: 0,
        },
      ]}
    />
  )
}

export default AirData
