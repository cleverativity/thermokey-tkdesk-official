import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

const CoilIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 16 16'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M3 4h10M3 6.5h10M3 9h10M3 11.5h10'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
    />
  </svg>
)

function CoilData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_coil_data'
      icon={<CoilIcon />}
      items={[
        {
          labelId: 'data.thermal.rating.coil_data.coil_code',
          value: selectedMachine ? '3P W6 90 01 01620 002 0202 S T' : null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.fin_material',
          value: selectedMachine ? 'Aluminium' : null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.tube_material',
          value: selectedMachine ? 'Aluminium' : null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.n_coils',
          value: selectedMachine ? 4 : null,
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.coil_data.inner_volume',
          value: selectedMachine ? 9.3 : null,
          unit: 'dm³',
        },
        {
          labelId: 'data.thermal.rating.coil_data.exchange_area',
          value: selectedMachine ? 84.8 : null,
          unit: 'm²',
        },
        {
          labelId: 'data.thermal.rating.coil_data.inlet_header',
          value: selectedMachine ? '1 x 54 - Tondo' : null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.outlet_header',
          value: selectedMachine ? '1 x 54 - Tondo' : null,
        },
      ]}
    />
  )
}

export default CoilData
