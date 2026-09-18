import { Fan } from 'Components/Icons'
import { FieldsetCard } from 'Components/Styled'
import {
  formatRatingPair,
  formatRatingUnit,
  ResultDataProps,
} from './types'

function VentilationData(props: ResultDataProps) {
  const { calculation } = props
  const data = calculation?.ventilationData
  const electricalSupply =
    data?.phases == null && data?.voltage == null && data?.frequency == null
      ? null
      : `${data?.phases ?? '-'}ph / ${data?.voltage ?? '-'}V / ${
          data?.frequency ?? '-'
        }Hz`

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_ventilation_data'
      icon={<Fan width='14px' height='14px' />}
      warningId={
        data
          ? 'data.thermal.rating.ventilation_data.long_delivery_warning'
          : undefined
      }
      items={[
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_name',
          value: data?.fanName ?? null,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_type',
          value: data?.fanType ?? null,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.speed_wp_max',
          value: formatRatingPair(data?.rpmWp, data?.rpmMax),
          unit: 'rpm',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.esp',
          value: data?.esp ?? null,
          unit: formatRatingUnit(data?.espUnit) ?? 'Pa',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.diameter',
          value: data?.diameter ?? null,
          unit: 'mm',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_rows',
          value: data?.fanRows ?? null,
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_per_row',
          value: data?.fansPerRow ?? null,
          scale: 0,
        },
      ]}
      rightItems={[
        {
          labelId: 'data.thermal.rating.ventilation_data.link',
          value: data?.link ?? null,
        },
        {
          labelId:
            'data.thermal.rating.ventilation_data.phases_voltage_frequency',
          value: electricalSupply,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.single_power',
          value: formatRatingPair(data?.singlePowerWp, data?.singlePowerMax),
          unit: 'W',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.total_power',
          value: formatRatingPair(data?.totalPowerWp, data?.totalPowerMax),
          unit: 'W',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.single_current',
          value: formatRatingPair(
            data?.singleCurrentWp,
            data?.singleCurrentMax,
          ),
          unit: 'A',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.total_current',
          value: formatRatingPair(data?.totalCurrentWp, data?.totalCurrentMax),
          unit: 'A',
        },
      ]}
    />
  )
}

export default VentilationData
