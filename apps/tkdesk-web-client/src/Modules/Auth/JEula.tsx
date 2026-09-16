import { useState } from 'react'
import { connect } from 'react-redux'
import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import { Col, Row } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import LoginLayout from 'Modules/Auth/signin.style'

import { StyledSeparator, StyledButton } from 'Components/Styled'
import { FormikDependent, FormikForm, FormikSubmit } from 'Components/Formik'
import { FieldCheckbox } from 'Components/Field'

import actions from '../App/actions'
import FirstPartIT from './Eula/It/FirstPart'
import SecondPartIT from './Eula/It/SecondPart'
import FirstPartEN from './Eula/En/FirstPart'
import SecondPartEN from './Eula/En/SecondPart'
const appActions = actions.application
const profileActions = actions.profile

const log = new ConsoleLogger('Modules/Auth/JEula')

const JEula = ({
  onBack,
  onDownloadEula,
  onAcceptEula,
  data: profile,
}: {
  onBack: () => void
  onDownloadEula?: (value: { storage_url: string; language: string }) => void
  onAcceptEula?: () => void
  data?: any
}) => {
  const [firstPageAccepted, setFirstPageAccepted] = useState(false)

  const language: string = _.get(profile, 'preferences.language', 'it')
  const handleSubmit = (values: ObjNumber, frk: any) => {
    if (onAcceptEula) onAcceptEula()
    frk.setSubmitting(false)
  }

  const handleDownload = (values: ObjNumber) => {
    if (onDownloadEula) {
      if (firstPageAccepted) {
        onDownloadEula({
          storage_url:
            language === 'it'
              ? 'ITA_EULA TKDesk_1341_ThermoKey.pdf'
              : 'ENG_EULA TKDesk_1341_ThermoKey.pdf',
          language,
        })
      } else {
        onDownloadEula({
          storage_url:
            language === 'it'
              ? 'ITA_EULA TKDesk_no_1341_ThermoKey.pdf'
              : 'ENG_EULA TKDesk_no_1341_ThermoKey.pdf',
          language,
        })
      }
    }
  }

  return (
    <>
      <LoginLayout>
        <FormikForm initialValues={{ eula: null }} onSubmit={handleSubmit}>
          {!firstPageAccepted ? (
            <>
              <StyledSeparator
                title
                withText='ui.login.eula.first_page_title'
              />
              {language === 'it' ? <FirstPartIT /> : <FirstPartEN />}
              <Row justify='space-between'>
                <Col>
                  <FieldCheckbox
                    requiredSingle
                    required
                    hideRequired
                    name='forward'
                    options={[
                      {
                        label: 'data.login.first_eula',
                        value: 'true',
                      },
                    ]}
                  />
                </Col>
                <Col>
                  <StyledButton
                    id='button.login.downloadEula'
                    style={{ marginRight: '20px' }}
                    icon={<DownloadOutlined />}
                    label='ui.login.eula.download_1'
                    type='link'
                    onClick={handleDownload}
                  />
                  <StyledButton
                    id='button.login.backLogin'
                    style={{ marginRight: '20px' }}
                    onClick={onBack}
                    type='default'
                    label='ui.login.signin.back_to_login'
                  />
                  <FormikDependent
                    propsFunction={({ formik }) => {
                      const forward = _.get(formik.values, 'forward', false)
                      return { forward }
                    }}
                    render={({ forward }) => {
                      return (
                        <StyledButton
                          id='button.login.forwardEula'
                          style={{ marginTop: '0px' }}
                          disabled={!forward}
                          onClick={() => setFirstPageAccepted(true)}
                          type='primary'
                          label='ui.login.eula.go_to_second_page'
                        />
                      )
                    }}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <StyledSeparator
                title
                withText='ui.login.eula.second_page_title'
              />
              {language === 'it' ? <SecondPartIT /> : <SecondPartEN />}
              {/* <SecondPartIT /> */}
              {/* <p>{intl.formatMessage({ id: 'ui.login.eula.second_page' })}</p> */}

              <Row justify='space-between'>
                <Col>
                  <FieldCheckbox
                    requiredSingle
                    required
                    hideRequired
                    name='eula'
                    options={[
                      {
                        label: 'data.login.second_eula',
                        value: 'true',
                      },
                    ]}
                  />
                </Col>
                <Col>
                  <StyledButton
                    id='button.login.downloadEula'
                    style={{ marginRight: '20px' }}
                    icon={<DownloadOutlined />}
                    label='ui.login.eula.download_2'
                    type='link'
                    onClick={handleDownload}
                  />
                  <StyledButton
                    id='button.login.backLogin'
                    style={{ marginRight: '20px' }}
                    onClick={() => setFirstPageAccepted(false)}
                    type='default'
                    label='ui.login.eula.back_to_first_page'
                  />
                  <FormikDependent
                    propsFunction={({ formik }) => {
                      const eula = _.get(formik.values, 'eula', false)
                      return { eula }
                    }}
                    render={({ eula }) => {
                      return (
                        <FormikSubmit
                          disabled={!eula}
                          style={{ marginTop: '0px' }}
                          label='ui.login.eula.accept'
                        />
                      )
                    }}
                  />
                </Col>
              </Row>
            </>
          )}
        </FormikForm>
      </LoginLayout>
    </>
  )
}
export default connect(
  (state: AppState) => ({ ...state.general.profile }),
  (dispatch) => ({
    onDownloadEula: ({ storage_url }: { storage_url: string }) =>
      dispatch(appActions.downloadEula({ storage_url })),
    onAcceptEula: () => dispatch(profileActions.acceptEula()),
  }),
)(JEula)
