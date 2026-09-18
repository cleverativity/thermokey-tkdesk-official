import { EditOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { formatRatingUnit, ResultDataProps } from './types'

function UnitData(props: ResultDataProps) {
  const { calculation } = props
  const data = calculation?.unitData

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_unit_data'
      icon={<EditOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.unit_data.type',
          value: data?.type ?? null,
        },
        {
          labelId: 'data.thermal.rating.unit_data.length',
          value: data?.length ?? null,
          unit: formatRatingUnit(data?.dimensionUnit),
          scale: 3,
        },
        {
          labelId: 'data.thermal.rating.unit_data.width',
          value: data?.width ?? null,
          unit: formatRatingUnit(data?.dimensionUnit),
          scale: 3,
        },
        {
          labelId: 'data.thermal.rating.unit_data.height',
          value: data?.height ?? null,
          unit: formatRatingUnit(data?.dimensionUnit),
          scale: 3,
        },
        {
          labelId: 'data.thermal.rating.unit_data.weight',
          value: data?.weight ?? null,
          unit: formatRatingUnit(data?.weightUnit),
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.unit_data.inner_volume',
          value: data?.innerVolume ?? null,
          unit: formatRatingUnit(data?.innerVolumeUnit),
        },
        {
          labelId: 'data.thermal.rating.unit_data.exchange_area',
          value: data?.exchangeArea ?? null,
          unit: formatRatingUnit(data?.exchangeAreaUnit),
        },
        {
          labelId: 'data.thermal.rating.unit_data.inlet_conn',
          value: data?.inletConnection ?? null,
        },
        {
          labelId: 'data.thermal.rating.unit_data.outlet_conn',
          value: data?.outletConnection ?? null,
        },
      ]}
    />
  )
}

export default UnitData
