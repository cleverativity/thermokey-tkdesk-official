import { Card } from 'antd'
import _ from 'lodash'

import { StyledSeparator } from 'Components/Styled'

import GeneralInfo from './GeneralInfo'
import Info from './Info'
import AirSide from './AirSide'
import RefrigerantSide from './RefrigerantSide'

import GeometricDetails from '../GeometricDetails'

const FreeCoolingCondenser = ({ useCase, stepMode, detailData }: any) => {
  const renderSection = (coreKey: string) => {
    const dataSource = _.get(detailData, coreKey, {})

    return (
      <>
        <Card style={{ marginBottom: '30px' }}>
          <StyledSeparator
            withText={`ui.coils.microchannel.steps.input_parameters.geometric_parameters.${coreKey}`}
          />

          <Info coreKey={coreKey} />
          <AirSide coreKey={coreKey} detailData={detailData} />
          <RefrigerantSide coreKey={coreKey} />

          <GeometricDetails
            useCase={useCase}
            stepMode={stepMode}
            detailData={dataSource}
            coreKey={coreKey}
          />
        </Card>
      </>
    )
  }

  return (
    <>
      <GeneralInfo detailData={detailData} />

      {renderSection('c1')}
      {renderSection('c2')}
    </>
  )
}

export default FreeCoolingCondenser
