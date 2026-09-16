import { Col, Image } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { SpanIntl } from 'Components/Span'
import {
  StyledButton,
  StyledCard,
  StyledPageHeader,
  StyledRow,
} from 'Components/Styled'

import coils from 'Images/coils.png'
import ventilation from 'Images/ventilation.png'
import { useAuthorization } from 'Modules/App/Authorization'

const log = new ConsoleLogger('Modules/Dashboard/Home')

const Home = (props: any) => {
  log.info('render.props', props)
  const { onGoCalculations, onGoSelections } = props

  const autho = useAuthorization()

  return (
    <>
      <StyledPageHeader title='data.dashboard.header' />

      <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
        <SpanIntl
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            paddingBottom: '20px',
          }}
          value='ui.dashboard'
        />
      </StyledRow>

      <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
        <Col span={12}>
          <StyledCard>
            <StyledRow
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '20px',
              }}
            >
              <Image src={coils} preview={false} height={'250px'} />
            </StyledRow>

            <StyledRow justify='center'>
              <StyledButton
                id='button.dashboard.go_calculations'
                label='ui.dashboard.buttons.calculations'
                type='primary'
                onClick={onGoCalculations}
              />
            </StyledRow>
          </StyledCard>
        </Col>

        {/* {autho.iAmAdmin ? ( */}
        <Col span={12}>
          <StyledCard>
            <StyledRow
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '20px',
              }}
            >
              <Image src={ventilation} preview={false} height={'250px'} />
            </StyledRow>

            <StyledRow justify='center'>
              <StyledButton
                id='button.dashboard.go_ventilations'
                type='primary'
                label='ui.dashboard.buttons.ventilations'
                onClick={onGoSelections}
              />
            </StyledRow>
          </StyledCard>
        </Col>
        {/* ) : null} */}
      </StyledRow>
    </>
  )
}

export default Home
