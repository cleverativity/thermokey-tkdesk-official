import { SoundOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { formatRatingUnit, ResultDataProps } from './types'

function NoiseData(props: ResultDataProps) {
  const { calculation } = props
  const data = calculation?.noiseData

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_noise_data'
      icon={<SoundOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.noise_data.sound_power',
          value: data?.soundPower ?? null,
          unit: formatRatingUnit(data?.soundPowerUnit),
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.noise_data.sound_pressure',
          value: data?.soundPressure ?? null,
          unit: formatRatingUnit(data?.soundPressureUnit),
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.noise_data.distance',
          value: data?.distance ?? null,
          unit: formatRatingUnit(data?.distanceUnit),
          scale: 0,
        },
      ]}
    />
  )
}

export default NoiseData
