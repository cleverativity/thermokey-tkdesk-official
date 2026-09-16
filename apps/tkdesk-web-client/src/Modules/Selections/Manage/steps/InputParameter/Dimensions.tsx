import { useEffect, useMemo } from 'react'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import _ from 'lodash'

import {
  FieldCheckbox,
  FieldDecimalNumber,
  FieldRangeSelect,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

import rawSeriesId from 'Localization/Constants/series_id.json'
import rawHeightIds from 'Localization/Constants/height_ids.json'

const Dimensions = ({ seriesCompatibility = [] }: any) => {
  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext()

  const selectedSeriesIds = _.get(
    values,
    'input_data.dimensions.series_ids.value',
    [],
  )
  const selectedHeightIds = _.get(
    values,
    'input_data.dimensions.height_ids.value',
    [],
  )

  const allowedHeightIds = useMemo(
    () =>
      _.chain(seriesCompatibility)
        .filter(({ id }) => _.includes(selectedSeriesIds, id))
        .map('subserie_ids')
        .flatten()
        .uniq()
        .value(),
    [selectedSeriesIds, seriesCompatibility],
  )

  const heightOptions = _.map(rawHeightIds, (height) => ({
    ...height,
    disabled:
      _.isEmpty(selectedSeriesIds) ||
      !_.includes(allowedHeightIds, height.value),
  }))

  useEffect(() => {
    if (!_.isEqual(selectedHeightIds, allowedHeightIds)) {
      setFieldValue(
        'input_data.dimensions.height_ids.value',
        allowedHeightIds,
        false,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeriesIds])

  const machineTypes = [
    { key: 'single', label: 'Single' },
    { key: 'assembled', label: 'Assembled' },
  ]

  return (
    <StyledCollapse defaultActiveKey={['3']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.selections.steps.input_parameters.dimensions'
        key='3'
      >
        <StyledRow>
          <FieldCheckbox
            span={{ sm: 24, lg: 12, xl: 4 }}
            name='input_data.dimensions.series_ids'
            label='data.selections.input_parameters.series_ids'
            options={rawSeriesId}
            vertical
          />
          <FieldCheckbox
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.dimensions.height_ids'
            label='data.selections.input_parameters.height_ids'
            options={heightOptions}
            tooltip={intl.formatMessage({
              id: 'data.selections.input_parameters.height_ids.tooltip',
            })}
          />
          <FieldRangeSelect
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.dimensions.machine_type'
            label='data.selections.input_parameters.machine_type'
            unlocalizeMessage
            optionMessagePath={['label']}
            options={machineTypes}
          />
          <FieldCheckbox
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.dimensions.is_container_width'
            options={[
              {
                label: 'data.selections.input_parameters.is_container_width',
              },
            ]}
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            name='input_data.dimensions.max_length'
            label='data.selections.input_parameters.max_length'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.dimensions.max_height'
            label='data.selections.input_parameters.max_height'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.dimensions.max_width'
            label='data.selections.input_parameters.max_width'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='input_data.dimensions.max_weight'
            label='data.selections.input_parameters.max_weight'
          />
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Dimensions
