import { FieldSolveMode } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledSeparator,
} from 'Components/Styled'
import React from 'react'
import { useFormikContext } from 'formik'
import _ from 'lodash'
import AdjustCapacity from './AdjustCapacity'
import AdjustFanFlows from './AdjustFanFlows'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useIntl } from 'react-intl'

interface AdjustModuleProps {
  //calculateCapacity: () => void

  capacityData: any
  fanFlowsData: any
  model?: any
  compute?: any
  preferences: any
}
function AdjustModule(props: AdjustModuleProps) {
  const intl = useIntl()
  const formik = useFormikContext()
  const { values, setFieldValue } = formik
  const { capacityData, fanFlowsData, model, compute, preferences } = props

  const types: string = _.get(values, 'condenser.adjustmentModuleType', 'ac')
  const unitsType = _.get(preferences, 'um_system', 'si')

  const log = new ConsoleLogger(
    'Modules/Selections/thermal/ModelDetail/AdjustModule/AdjustCapacity',
  )

  log.info('AdjustModule.Index', { capacityData, fanFlowsData, model, types })

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.adjustment_modules'
        >
          <StyledSeparator
            withText={
              types === 'ac'
                ? 'ui.thermal.tab_value.ac'
                : 'ui.thermal.tab_value.aff'
            }
            actions={
              <FieldSolveMode
                defaultValue={types}
                name='condenser.adjustmentModuleType'
                //onChange={onTabChange}
                // disabled={isDisableType}
                options={[
                  {
                    label: intl.formatMessage({
                      id: 'ui.thermal.tab_value.ac',
                    }),
                    value: 'ac',
                  },
                  {
                    label: intl.formatMessage({
                      id: 'ui.thermal.tab_value.aff',
                    }),
                    value: 'aff',
                  },
                ]}
              />
            }
          />
          {types === 'ac' ? (
            <AdjustCapacity
              acData={capacityData}
              condenser={model}
              onCompute={compute}
              unitTypes={unitsType}
            />
          ) : (
            <AdjustFanFlows
              affData={fanFlowsData}
              condenser={model}
              onCompute={compute}
              unitTypes={unitsType}
            />
          )}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default AdjustModule
