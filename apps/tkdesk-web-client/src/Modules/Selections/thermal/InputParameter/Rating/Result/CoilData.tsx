import { FieldsetCard } from 'Components/Styled'
import { formatRatingUnit, ResultDataProps } from './types'

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
  const { calculation } = props
  const data = calculation?.coilData

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_coil_data'
      icon={<CoilIcon />}
      items={[
        {
          labelId: 'data.thermal.rating.coil_data.coil_code',
          value: data?.coilCode ?? null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.fin_material',
          value: data?.finMaterial ?? null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.tube_material',
          value: data?.tubeMaterial ?? null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.n_coils',
          value: data?.numberOfCoils ?? null,
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.coil_data.inner_volume',
          value: data?.innerVolume ?? null,
          unit: formatRatingUnit(data?.innerVolumeUnit),
        },
        {
          labelId: 'data.thermal.rating.coil_data.exchange_area',
          value: data?.exchangeArea ?? null,
          unit: formatRatingUnit(data?.exchangeAreaUnit),
        },
        {
          labelId: 'data.thermal.rating.coil_data.inlet_header',
          value: data?.inletHeader ?? null,
        },
        {
          labelId: 'data.thermal.rating.coil_data.outlet_header',
          value: data?.outletHeader ?? null,
        },
      ]}
    />
  )
}

export default CoilData
