import type { CSSProperties, ReactNode } from 'react'
import { Col, Space } from 'antd'
import { useIntl } from 'react-intl'

import FieldDecimalNumber from './FieldDecimalNumber'
import FieldRangeSelect from './FieldRangeSelect'

export type FieldUnitMeasure = {
  decimalPlaces: number
  defaultValue?: number
  defaultUnitName?: string
  unitMeasuresIds?: number[] | null
  options: { label: string; value: string }[]
  handleValueChange: (...args: any[]) => void
  handleUnitChange: (...args: any[]) => void
}

const UNIT_SELECT_WIDTH = 96

const labelStyle: CSSProperties = {
  fontFamily: 'Avenir Medium, sans serif',
  paddingBottom: '8px',
}

export function FieldUnitInput({
  span,
  labelId,
  field,
  valueName,
  unitName,
  required,
  tooltip,
  disabled,
  unitSelectWidth = UNIT_SELECT_WIDTH,
}: {
  span?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  labelId?: string
  field: FieldUnitMeasure
  valueName: string
  unitName: string
  required?: boolean
  tooltip?: ReactNode
  disabled?: boolean
  unitSelectWidth?: number
}) {
  const intl = useIntl()

  const input = (
    <Space.Compact style={{ width: '100%', minWidth: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <FieldDecimalNumber
          style={{ width: '100%' }}
          name={valueName}
          scale={field.decimalPlaces}
          defaultValue={field.defaultValue}
          required={required}
          hideLabel
          hasFeedback={false}
          controls={false}
          isPointed={true}
          addonAfter={null}
          tooltip={tooltip}
          disabled={disabled}
          overrideOnChange={field.handleValueChange}
        />
      </div>
      {field.unitMeasuresIds?.length ? (
        <div
          style={{
            flex: `0 0 ${unitSelectWidth}px`,
            width: unitSelectWidth,
            minWidth: unitSelectWidth,
            maxWidth: unitSelectWidth,
          }}
        >
          <FieldRangeSelect
            overrideOnChange={field.handleUnitChange}
            hideLabel
            hasFeedback={false}
            style={{ width: '100%' }}
            allowClear={false}
            disabled={disabled}
            defaultValue={field.defaultUnitName}
            name={unitName}
            optionKeyPath={['value']}
            optionMessagePath={['label']}
            options={field.options}
            unlocalizeMessage
          />
        </div>
      ) : null}
    </Space.Compact>
  )

  if (!labelId) {
    return input
  }

  return (
    <Col {...span} style={{ minWidth: 0, maxWidth: '100%' }}>
      <p style={labelStyle}>
        {required ? <span style={{ color: '#ff4d4f' }}>* </span> : null}
        {intl.formatMessage({ id: labelId })}
      </p>
      {input}
    </Col>
  )
}

export function CompactUnitSelect({
  field,
  unitName,
  unitSelectWidth = UNIT_SELECT_WIDTH,
}: {
  field: FieldUnitMeasure
  unitName: string
  unitSelectWidth?: number
}) {
  if (!field.unitMeasuresIds?.length) return null

  return (
    <Col
      flex={`0 0 ${unitSelectWidth}px`}
      style={{ minWidth: unitSelectWidth }}
    >
      <p style={{ ...labelStyle, minHeight: 22 }}>&nbsp;</p>
      <FieldRangeSelect
        overrideOnChange={field.handleUnitChange}
        hideLabel
        hasFeedback={false}
        style={{ width: '100%' }}
        allowClear={false}
        defaultValue={field.defaultUnitName}
        name={unitName}
        optionKeyPath={['value']}
        optionMessagePath={['label']}
        options={field.options}
        unlocalizeMessage
      />
    </Col>
  )
}

export default FieldUnitInput
