import { FieldRangeSelect } from 'Components/Field'
import { SpanIntl, SpanNumber } from 'Components/Span'
import { useFormikContext } from 'formik'
import {
  convertByMeasureUnit,
  useUnitMeasureField,
  type UnitsQuery,
} from 'Modules/Selections/units/shared/variableUnitField'
import { getUnitById } from 'Modules/Selections/units/shared/unitsMeasureTable'
import React from 'react'

type DetailUnitValueProps = {
  value: any
  unitTypes: string
  query: UnitsQuery
  defaultUnitIds: { si: number; ip: number }
  asDelta?: boolean
}

export function DetailUnitValue(props: DetailUnitValueProps) {
  const { value, unitTypes, query, defaultUnitIds, asDelta } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const valueField = `detailUM.${query.variable}`
  const unitField = `detailUM.${query.variable}Type`
  const numericValue = Number(value)
  const sourceUnitId =
    unitTypes === 'imp' ? defaultUnitIds.ip : defaultUnitIds.si

  const field = useUnitMeasureField({
    query,
    values,
    setFieldValue,
    unitTypes,
    valueField,
    unitField,
    defaultValue: Number.isFinite(numericValue) ? numericValue : undefined,
    defaultValueUnit: getUnitById(sourceUnitId)?.name,
    defaultUnitIds,
    asDelta,
  })

  const displayedValue = convertByMeasureUnit(
    Number.isFinite(numericValue) ? numericValue : value,
    field.units.find((unit) => unit.id === sourceUnitId),
    field.activeUnit,
    true,
    asDelta,
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        width: '100%',
        minWidth: 0,
      }}
    >
      <span style={{ lineHeight: '32px', whiteSpace: 'nowrap' }}>
        <SpanNumber value={displayedValue} scale={field.decimalPlaces} />
      </span>
      {field.unitMeasuresIds?.length ? (
        <div
          style={{
            flex: '0 0 128px',
            width: 128,
            minWidth: 128,
            maxWidth: 128,
          }}
        >
          <FieldRangeSelect
            hideLabel
            hasFeedback={false}
            allowClear={false}
            unlocalizeMessage
            style={{ width: '100%', marginBottom: 0 }}
            name={unitField}
            defaultValue={field.defaultUnitName}
            options={field.options}
            optionKeyPath={['value']}
            optionMessagePath={['label']}
            overrideOnChange={field.handleUnitChange}
            getPopupContainer={() => document.body}
            popupMatchSelectWidth={false}
            dropdownStyle={{ minWidth: 160 }}
          />
        </div>
      ) : null}
    </div>
  )
}

export function unitDetailItem({
  variable,
  labelId,
  value,
  unitTypes,
  section,
  defaultUnitIds,
  asDelta,
}: {
  variable: string
  labelId?: string
  value: any
  unitTypes: string
  section: string
  defaultUnitIds: { si: number; ip: number }
  asDelta?: boolean
}) {
  return {
    label: <SpanIntl value={labelId ?? `data.thermal.details.${variable}`} />,
    children: (
      <DetailUnitValue
        value={value}
        unitTypes={unitTypes}
        query={{
          product: 'condenser',
          step: 'Model detail',
          section,
          variable,
        }}
        defaultUnitIds={defaultUnitIds}
        asDelta={asDelta}
      />
    ),
  }
}
