import _ from 'lodash'
import { useFormikContext } from 'formik'

import rawFpi from 'Localization/Constants/fpi.json'

import { StyledRow, StyledSeparator, StyledTable } from 'Components/Styled'
import { FieldNumberSelect } from 'Components/Field'

import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { staticColumnsGeomTypeAdmin } from 'Model/Calculations/InputParameters/table'
import { removeColumns } from 'Model/table'

import * as F from '../functions'
import { useState } from 'react'

const FormGeometricParameters = ({
  useCase,
  enabledCorrectiveFactors,
  geometricConstants = [],
  selectGeomTypes,
}: any) => {
  const { setGeomSelected } = selectGeomTypes

  const autho = useAuthorization()
  const formik = useFormikContext()

  const [geomTypes, setGeomTypes] = useState(
    _.get(formik.values, 'input_data.geom_types.value', []) as any,
  )

  const isFreeCooling = useCase === 'free_cooling_condenser'

  const authorizedStaticColumns = autho.check(rawPermissions.Calculation.manage)
    ? staticColumnsGeomTypeAdmin
    : removeColumns(
        ['hydraulic_diameter', 'aspect_ratio', 'port_number'],
        staticColumnsGeomTypeAdmin,
      )

  const getEnabledGeomTypes = (useCase: string, prefix: string) => {
    const allGeomTypes = F.getGeometryTypesForUseCase(useCase)

    if (_.isNil(useCase)) {
      return allGeomTypes
    }

    return _.filter(allGeomTypes, (el) =>
      _.get(
        enabledCorrectiveFactors,
        isFreeCooling
          ? `microchannel.${useCase}.${prefix}.${el.value}.enabled`
          : `microchannel.${useCase}.${el.value}.enabled`,
        false,
      ),
    )
  }

  const buildDataSource = (useCase: string, prefix: string) => {
    const types = _.map(getEnabledGeomTypes(useCase, prefix), 'value')

    return _.sortBy(
      _.filter(geometricConstants, (el) => {
        const value = _.get(el, 'type.value')

        return _.includes(types, value)
      }),
      (el) => _.get(el, 'type.value'),
    )
  }

  const handleChange = (value: any, core: string) => {
    const { setFieldValue, setFieldTouched } = formik

    if (isFreeCooling) {
      setFieldValue(`input_data.${core}.geom_type.value`, value[0], false)
      setTimeout(() => setFieldTouched(`input_data.${core}.fluid`, true))
    } else {
      setFieldValue('input_data.geom_types.value', value, false)
      setTimeout(() => setFieldTouched('input_data.fluid_c1', true))
    }
  }

  const renderSection = (isFreeCooling: boolean, coreKey: string) => {
    const geomType = _.get(
      formik.values,
      `input_data.${coreKey}.geom_type.value`,
      [],
    )

    const dataSource = buildDataSource(useCase, coreKey)

    return (
      !_.isEmpty(dataSource) && (
        <>
          {isFreeCooling && (
            <>
              <StyledSeparator
                withText={`ui.coils.microchannel.steps.input_parameters.geometric_parameters.${coreKey}`}
              />
              <StyledRow>
                <FieldNumberSelect
                  span={{ sm: 24, md: 12, lg: 4 }}
                  name={`input_data.${coreKey}.fpi`}
                  label='data.calculations.input_parameters.fpi'
                  options={rawFpi}
                  unlocalizeMessage
                />
              </StyledRow>
            </>
          )}

          <StyledTable
            rowKey={(record: any) => _.get(record, 'type.value')}
            loading={false}
            dataSource={dataSource}
            pagination={false}
            columns={authorizedStaticColumns}
            rowSelection={{
              type: isFreeCooling ? 'radio' : 'checkbox',
              selectedRowKeys: isFreeCooling ? [geomType] : geomTypes,
              onChange: (selectedRowKeys: React.Key[]) => {
                if (_.isEmpty(selectedRowKeys)) {
                  setGeomSelected(false)
                } else {
                  setGeomSelected(true)
                }

                setGeomTypes(selectedRowKeys)
                handleChange(selectedRowKeys, coreKey)
              },
            }}
          />
        </>
      )
    )
  }

  return (
    <>
      {renderSection(isFreeCooling, isFreeCooling ? 'c1' : '')}

      {isFreeCooling && renderSection(true, 'c2')}
    </>
  )
}

export default FormGeometricParameters
