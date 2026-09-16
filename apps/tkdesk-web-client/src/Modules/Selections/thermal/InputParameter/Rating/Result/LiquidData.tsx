import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

const DropletIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 16 16'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M8 2.2C8 2.2 4 7.2 4 10a4 4 0 108 0c0-2.8-4-7.8-4-7.8z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinejoin='round'
    />
  </svg>
)

function LiquidData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_liquid_data'
      icon={<DropletIcon />}
      items={[
        {
          labelId: 'data.thermal.rating.liquid_data.refrigerant_type',
          value: selectedMachine ? 'R-404A' : null,
        },
        {
          labelId: 'data.thermal.rating.liquid_data.condensing',
          value: selectedMachine ? 40.0 : null,
          unit: '°C',
        },
        {
          labelId: 'data.thermal.rating.liquid_data.subcooling',
          value: selectedMachine ? 3.0 : null,
          unit: 'K',
        },
        {
          labelId: 'data.thermal.rating.liquid_data.liquid_leaving',
          value: selectedMachine ? 37.0 : null,
          unit: '°C',
        },
        {
          labelId: 'data.thermal.rating.liquid_data.pressure_drop',
          value: selectedMachine ? 58 : null,
          unit: 'kPa',
          scale: 0,
        },
      ]}
    />
  )
}

export default LiquidData
