import { useState } from 'react'
import { Col, Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'

import {
  StyledButton,
  StyledCard,
  StyledDescriptions,
  StyledPageHeader,
} from 'Components/Styled'
import { FormikForm } from 'Components/Formik'
import { Detail, DetailDate } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'

import ChangePasswordModal from 'Model/Users/modal/ChangePasswordModal'
import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'

const log = new ConsoleLogger('Modules/Users/Profile')
const Profile = (props: any) => {
  log.info('render.props', props)
  const autho = useAuthorization()
  const { data: profile, onResetEula, onDownloadEula } = props

  // const handleOnEdit = () => {
  //   const { id } = profile
  //   log.info('handleOnEdit.user', profile)
  //   onProfileEdit(id)
  // }

  const { preferences, eula_storage_url: storage_url } = profile
  const { language } = preferences
  // Edit validity
  const [modalChangePassword, setModalChangePassword] = useState({
    visible: false,
    error: false,
    loading: false,
  })

  const items = [
    {
      label: <SpanIntl value='data.users.username' />,
      children: <Detail name='username' />,
    },
    {
      label: <SpanIntl value='data.users.firstname' />,
      children: <Detail name='registry.name' />,
    },
    {
      label: <SpanIntl value='data.users.lastname' />,
      children: <Detail name='registry.surname' />,
    },
    autho.check(rawPermissions.Calculation.manage) && {
      label: <SpanIntl value='data.users.birth_date' />,
      children: <DetailDate name='registry.birth_date' />,
    },
    autho.check(rawPermissions.Calculation.manage) && {
      label: <SpanIntl value='data.users.gender' />,
      children: <Detail name='registry.gender' />,
    },
    {
      label: <SpanIntl value='data.users.email' />,
      children: <Detail name='registry.company_email' />,
    },
    {
      label: <SpanIntl value='data.users.phone_number' />,
      children: <Detail name='registry.company_telephone' />,
    },
    autho.check(rawPermissions.Calculation.manage) && {
      label: <SpanIntl value='data.users.jde_code' />,
      children: <Detail name='registry.jde_id' />,
    },
    autho.check(rawPermissions.Calculation.manage) && {
      label: <SpanIntl value='data.users.activation_date' />,
      children: <DetailDate name='activation_date' />,
    },
    autho.check(rawPermissions.Calculation.manage) && {
      label: <SpanIntl value='data.users.expiration_date' />,
      children: <DetailDate name='expiration_date' />,
    },
  ]

  const handleCloseModalChangePassword = () => {
    setModalChangePassword({ ...modalChangePassword, visible: false })
  }
  const handleOpenModalChangePassword = () => {
    setModalChangePassword({ ...modalChangePassword, visible: true })
  }
  return (
    <>
      <FormikForm initialValues={profile}>
        <StyledPageHeader title='data.users.profile' />
        <Row justify='end' align='middle' style={{ margin: '0 0 16px 0' }}>
          {autho.check(rawPermissions.Development.show) ? (
            <Col>
              <StyledButton
                label='ui.generic.reset_eula'
                onClick={onResetEula}
                type='primary'
                id='button.profile.reset_eula'
                style={{ marginRight: '20px' }}
              />
            </Col>
          ) : null}

          <Col>
            <StyledButton
              label='data.users.profile.download_eula'
              onClick={() => onDownloadEula({ storage_url, language })}
              id='button.profile.eula'
              style={{ marginRight: '20px' }}
            />
          </Col>

          <Col>
            <StyledButton
              label='data.users.profile.change_password'
              onClick={handleOpenModalChangePassword}
              id='button.profile.edit'
            />
          </Col>
        </Row>
        <StyledCard>
          <StyledDescriptions items={items} />
        </StyledCard>
        <ChangePasswordModal
          onCancel={handleCloseModalChangePassword}
          modal={{
            visible: modalChangePassword.visible,
            data: { __formik_state_reset: modalChangePassword.visible },
            loading: false,
            progress: false,
            error: false,
          }}
        />
      </FormikForm>
    </>
  )
}

export default Profile
