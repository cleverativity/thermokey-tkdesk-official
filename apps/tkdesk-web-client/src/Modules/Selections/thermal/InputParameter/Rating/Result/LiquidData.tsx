import { FieldsetCard } from 'Components/Styled'
import { formatRatingUnit, ResultDataProps } from './types'

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
  const { calculation } = props
  const data = calculation?.refrigerantData

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_liquid_data'
      icon={<DropletIcon />}
      items={[
        {
          labelId: 'data.thermal.rating.liquid_data.refrigerant_type',
          value: data?.refrigerantType ?? null,
        },
        {
          labelId: 'data.thermal.rating.liquid_data.condensing',
          value: data?.condensing ?? null,
          unit: formatRatingUnit(data?.condensingUnit),
        },
        {
          labelId: 'data.thermal.rating.liquid_data.subcooling',
          value: data?.subCooling ?? null,
          unit: formatRatingUnit(data?.subCoolingUnit),
        },
        {
          labelId: 'data.thermal.rating.liquid_data.liquid_leaving',
          value: data?.liquidLeaving ?? null,
          unit: formatRatingUnit(data?.liquidLeavingUnit),
        },
        {
          labelId: 'data.thermal.rating.liquid_data.pressure_drop',
          value: data?.pressureDrop ?? null,
          unit: formatRatingUnit(data?.pressureDropUnit),
        },
      ]}
    />
  )
}

export default LiquidData
