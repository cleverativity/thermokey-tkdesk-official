import { CloudOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { formatRatingUnit, ResultDataProps } from './types'

function AirData(props: ResultDataProps) {
  const { calculation } = props
  const data = calculation?.airData

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_air_data'
      icon={<CloudOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.air_data.inlet_temperature',
          value: data?.inletTemperature ?? null,
          unit: formatRatingUnit(data?.inletTemperatureUnit),
        },
        {
          labelId: 'data.thermal.rating.air_data.inlet_relative_humidity',
          value: data?.inletRelativeHumidity ?? null,
          unit: formatRatingUnit(data?.inletRelativeHumidityUnit),
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.air_data.altitude',
          value: data?.altitude ?? null,
          unit: formatRatingUnit(data?.altitudeUnit),
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.air_data.outlet_temperature',
          value: data?.outletTemperature ?? null,
          unit: formatRatingUnit(data?.outletTemperatureUnit),
        },
        {
          labelId: 'data.thermal.rating.air_data.flowrate',
          value: data?.flowrate ?? null,
          unit: formatRatingUnit(data?.flowrateUnit),
        },
        {
          labelId: 'data.thermal.rating.air_data.pressure_drop',
          value: data?.pressureDrop ?? null,
          unit: formatRatingUnit(data?.pressureDropUnit),
          scale: 0,
        },
      ]}
    />
  )
}

export default AirData
