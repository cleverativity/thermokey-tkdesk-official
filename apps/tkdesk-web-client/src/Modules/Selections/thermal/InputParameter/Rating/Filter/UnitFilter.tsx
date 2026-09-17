import { Col } from 'antd'
import {
  FieldUnitInput,
  FieldCheckbox,
  FieldSwitch,
  FieldThermalSelect,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import _ from 'lodash'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import React, { useEffect } from 'react'
import rawSeriesId from 'Localization/Constants/rating_series_id.json'
import rawSubseriesId from 'Localization/Constants/rating_subseries_id.json'

interface UnitFilterProps {
  unitTypes: string
}

const SECTION = 'Unit Filter'
const MEASURE_UNITS = { si: 1, ip: 3 }
const WEIGHT_UNITS = { si: 139, ip: 167 }
const ALL_OPTION = { value: 'All', label: 'All' }
const withAllOption = (
  options: Array<{ value: string; label: string }> = [],
) => [ALL_OPTION, ...options.filter((option) => option.value !== 'All')]

const COUNT_OPTIONS = withAllOption(
  Array.from({ length: 12 }, (_, index) => {
    const value = String(index + 1)
    return { value, label: value }
  }),
)

const getSubseriesOptions = (series?: string) => {
  if (series === 'T') {
    return withAllOption(rawSubseriesId.T)
  }
  if (series === 'V' || series === 'J') {
    return withAllOption(rawSubseriesId.J ?? [])
  }
  return [ALL_OPTION]
}

function UnitFilter(props: UnitFilterProps) {
  const { unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()

  useEffect(() => {
    if (_.isNil(_.get(values, 'rating.assembly'))) {
      setFieldValue('rating.assembly', 'All', false)
    }
    if (_.isNil(_.get(values, 'rating.useContainerWidth'))) {
      setFieldValue('rating.useContainerWidth', false, false)
    }
  }, [])

  const handleContainerhange = (checked: boolean, { form, field }: any) => {
    setFieldValue(field.name, checked ? 'Single' : 'Assembled', false)
  }

  const selectedSeries = _.get(values, 'rating.series')
  const subseriesOptions = getSubseriesOptions(selectedSeries)

  const handleSeriesChange = (value: any) => {
    const nextOptions = getSubseriesOptions(value)
    const currentSubseries = _.get(values, 'rating.subseries')
    const stillValid = nextOptions.some(
      (option) => option.value === currentSubseries,
    )

    if (!stillValid) {
      setFieldValue('rating.subseries', 'All', false)
    }
  }

  const maxLength = useUnitMeasureField({
    query: {
      product: 'drycooler',
      step: 'Rating',
      section: SECTION,
      variable: 'maxLength',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.maxLength',
    unitField: 'rating.maxLengthType',
    defaultValue: 10,
    defaultUnitIds: MEASURE_UNITS,
  })
  const maxHeight = useUnitMeasureField({
    query: {
      product: 'drycooler',
      step: 'Rating',
      section: SECTION,
      variable: 'maxHeight',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.maxHeight',
    unitField: 'rating.maxHeightType',
    defaultValue: 10,
    defaultUnitIds: MEASURE_UNITS,
  })
  const maxWidth = useUnitMeasureField({
    query: {
      product: 'drycooler',
      step: 'Rating',
      section: SECTION,
      variable: 'maxWidth',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.maxWidth',
    unitField: 'rating.maxWidthType',
    defaultValue: 10,
    defaultUnitIds: MEASURE_UNITS,
  })
  const weight = useUnitMeasureField({
    query: {
      product: 'drycooler',
      step: 'Rating',
      section: SECTION,
      variable: 'weight',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'rating.weight',
    unitField: 'rating.weightType',
    defaultValue: 10,
    defaultUnitIds: WEIGHT_UNITS,
  })

  return (
    <>
      <StyledCollapse defaultActiveKey={['3']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel
          header='ui.thermal.panelHeader.rating_unit_filter'
          key='3'
        >
          <StyledRow gutter={[16, 16]}>
            <FieldThermalSelect
              span={{ xs: 24, sm: 12 }}
              data={withAllOption(rawSeriesId)}
              name='rating.series'
              label='data.thermal.rating.series'
              field='value'
              defaultValue='All'
              required
              overrideOnChange={handleSeriesChange}
            />
            <FieldThermalSelect
              span={{ xs: 24, sm: 12 }}
              data={subseriesOptions}
              name='rating.subseries'
              label='data.thermal.rating.subseries'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={{ xs: 24, sm: 12 }}
              data={COUNT_OPTIONS}
              name='rating.n_modules'
              label='data.thermal.rating.n_modules'
              field='value'
              defaultValue='All'
              required
            />
            <FieldThermalSelect
              span={{ xs: 24, sm: 12 }}
              data={COUNT_OPTIONS}
              name='rating.n_fans'
              label='data.thermal.rating.n_fans'
              field='value'
              defaultValue='All'
              required
            />
            <FieldUnitInput
              span={{ xs: 24, sm: 12 }}
              labelId='data.thermal.rating.maxLength'
              field={maxLength}
              valueName='rating.maxLength'
              unitName='rating.maxLengthType'
              required
            />
            <FieldUnitInput
              span={{ xs: 24, sm: 12 }}
              labelId='data.thermal.rating.maxHeight'
              field={maxHeight}
              valueName='rating.maxHeight'
              unitName='rating.maxHeightType'
              required
            />
            <FieldUnitInput
              span={{ xs: 24, sm: 12 }}
              labelId='data.thermal.rating.maxWidth'
              field={maxWidth}
              valueName='rating.maxWidth'
              unitName='rating.maxWidthType'
              required
            />
            <FieldUnitInput
              span={{ xs: 24, sm: 12 }}
              labelId='data.thermal.rating.weight'
              field={weight}
              valueName='rating.weight'
              unitName='rating.weightType'
              required
            />
          </StyledRow>
          <StyledRow gutter={[8, 8]} align='middle' style={{ marginTop: 8 }}>
            <Col xs={24} sm={12}>
              <FieldCheckbox
                hideLabel
                hasFeedback={false}
                name='rating.useContainerWidth'
                options={[
                  {
                    value: true,
                    label: 'data.thermal.rating.container_width',
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={12}>
              <FieldSwitch
                hideLabel
                hasFeedback={false}
                name='rating.assembly'
                checkedChildren='SINGLE'
                unCheckedChildren='ASSEMBLED'
                transformFrom={(value) => value === 'Single'}
                overrideOnChange={handleContainerhange}
              />
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default UnitFilter
