import { SoundOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

function NoiseData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_noise_data'
      icon={<SoundOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.noise_data.sound_power',
          value: selectedMachine ? 84 : null,
          unit: 'dB(A)',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.noise_data.sound_pressure',
          value: selectedMachine ? 52 : null,
          unit: 'dB(A)',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.noise_data.distance',
          value: selectedMachine ? 10 : null,
          unit: 'm',
          scale: 0,
        },
      ]}
    />
  )
}

export default NoiseData
