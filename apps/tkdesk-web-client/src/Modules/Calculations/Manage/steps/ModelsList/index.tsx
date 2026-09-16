import { useEffect, useState } from 'react'
import _ from 'lodash'
import { Col } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'

import { useMediaQuery } from 'Generic/hooks'

import { StyledRow, StyledCard, StyledTable } from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

import { createStaticColumnsModelsList } from 'Model/Calculations/InputParameters/table'
import { removeColumns } from 'Model/table'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAuthorization } from 'Modules/App/Authorization'

const log = new ConsoleLogger('Modules/Calculations/ModelsList')

const ModelsList = (props: {
  output_data: any
  saveModelCode: any
  mode: any
  useCase: string
  fluid_c1: any
  fluid_c2: any
  glycol_percentage: any
}) => {
  const {
    output_data,
    saveModelCode,
    mode,
    useCase,
    fluid_c1,
    fluid_c2,
    glycol_percentage,
  } = props
  log.info('render.props', props)

  const autho = useAuthorization()
  const { isMediumScreen, isLargeScreen } = useMediaQuery()

  const [selection, setSelection] = useState<CommonValue | null>(
    _.size(output_data) === 1 ? output_data[0].model_code : null,
  )

  useEffect(() => {
    if (_.size(output_data) === 1) {
      saveModelCode(output_data[0].model_code)
    }
  }, [output_data, saveModelCode])

  const liquidOrRefrigerantColumns =
    useCase === 'air_cooled_condenser'
      ? removeColumns(
          ['liquid', 'secondary_coolant'],
          createStaticColumnsModelsList(
            useCase,
            fluid_c1,
            fluid_c2,
            glycol_percentage,
          ),
        )
      : _.includes(useCase, 'water_')
        ? removeColumns(
            ['refrigerant', 'secondary_coolant'],
            createStaticColumnsModelsList(
              useCase,
              fluid_c1,
              fluid_c2,
              glycol_percentage,
            ),
          )
        : _.startsWith(useCase, 'double_flow')
          ? removeColumns(
              ['refrigerant'],
              createStaticColumnsModelsList(
                useCase,
                fluid_c1,
                fluid_c2,
                glycol_percentage,
              ),
            )
          : removeColumns(
              ['refrigerant', 'secondary_coolant', 'geom_type'],
              createStaticColumnsModelsList(
                useCase,
                fluid_c1,
                fluid_c2,
                glycol_percentage,
              ),
            )

  const staticColumnsVerifyOrDesign =
    mode !== 'design'
      ? removeColumns(['flow_rate_c1'], liquidOrRefrigerantColumns)
      : liquidOrRefrigerantColumns

  const newStaticColumns = autho.check(rawPermissions.Calculation.manage)
    ? staticColumnsVerifyOrDesign
    : removeColumns(['engine_performance_string'], staticColumnsVerifyOrDesign)

  return (
    <StyledCard>
      <StyledRow>
        <Col
          span={12}
          offset={6}
          style={{ textAlign: 'center', margin: '10px 0 25px 25%' }}
        >
          <SpanIntl
            style={{ fontWeight: 'bold' }}
            value='ui.coils.microchannel.model_list'
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col span={24}>
          <StyledTable
            rowKey={(record: any) => _.get(record, 'model_code', '')}
            dataSource={output_data}
            pagination={false}
            loading={false}
            bordered
            columns={newStaticColumns}
            scroll={
              _.startsWith(useCase, 'double_flow') ||
              isLargeScreen ||
              isMediumScreen
                ? { x: 'max-content' }
                : null
            }
            rowSelection={
              mode === 'serie'
                ? null
                : {
                    type: 'radio',
                    selectedRowKeys: [selection],
                    onChange: (
                      selectedRowKeys: React.Key[],
                      selectedRows: OutputData[],
                    ) => {
                      saveModelCode(selectedRows[0].model_code)
                      setSelection(selectedRows[0].model_code)
                    },
                  }
            }
          />
        </Col>
      </StyledRow>
    </StyledCard>
  )
}

export default ModelsList
