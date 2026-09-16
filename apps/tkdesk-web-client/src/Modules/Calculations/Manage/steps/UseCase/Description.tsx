import _ from 'lodash'
import { useIntl } from 'react-intl'
import { Col, Image } from 'antd'
import { useMediaQuery } from 'Generic/hooks'
import { sanitizeHtml } from 'Utils/sanitizeHtml'

import { StyledDescriptionContainer, StyledRow } from 'Components/Styled'

import AirCooledCondenser from 'Images/Coils/AirCooledCondenser.png'
import WaterCooler from 'Images/Coils/WaterCooler.png'
import DoubleFlow from 'Images/Coils/DoubleFlow.png'

const Description = ({ use_case }: any) => {
  const intl = useIntl()
  const { isSmallScreen } = useMediaQuery()

  const isDoubleFlow = _.startsWith(use_case, 'double_flow')

  const newUseCase = isDoubleFlow ? 'double_flow' : use_case
  const featuresDescription = intl.formatMessage({
    id: `ui.coils.microchannel.use_case.${newUseCase}.features_desc`,
  })

  return (
    <StyledDescriptionContainer>
      <StyledRow
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isSmallScreen ? 'column' : 'row',
        }}
      >
        <Col
          sm={24}
          lg={7}
          style={
            isSmallScreen ? { display: 'flex', justifyContent: 'center' } : {}
          }
        >
          {use_case === 'air_cooled_condenser' ? (
            <Image
              width={isSmallScreen ? '50%' : '100%'}
              preview={false}
              alt='Air-Cooled Condenser Image'
              src={AirCooledCondenser}
            />
          ) : _.startsWith(use_case, 'water') ? (
            <Image
              width={isSmallScreen ? '50%' : '80%'}
              preview={false}
              alt='Liquid Cooler Image'
              src={WaterCooler}
            />
          ) : isDoubleFlow ? (
            <Image
              width={isSmallScreen ? '50%' : '100%'}
              preview={false}
              alt='Double Flow Image'
              src={DoubleFlow}
            />
          ) : null}
        </Col>
        <Col
          lg={17}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <StyledRow>
            <Col span={24}>
              <h2>
                {intl.formatMessage({
                  id: `ui.coils.microchannel.use_case.${newUseCase}`,
                })}
              </h2>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col span={12}>
              <h5>
                {_.toUpper(
                  intl.formatMessage({
                    id: 'ui.coils.microchannel.use_case.usage',
                  }),
                )}
              </h5>
              <p>
                {intl.formatMessage({
                  id: `ui.coils.microchannel.use_case.${newUseCase}.usage_desc`,
                })}
              </p>
            </Col>
            {!isDoubleFlow && (
              <Col span={12}>
                <h5>
                  {_.toUpper(
                    intl.formatMessage({
                      id: 'ui.coils.microchannel.use_case.features',
                    }),
                  )}
                </h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(featuresDescription),
                  }}
                ></p>
              </Col>
            )}
          </StyledRow>
        </Col>
      </StyledRow>
    </StyledDescriptionContainer>
  )
}

export default Description
