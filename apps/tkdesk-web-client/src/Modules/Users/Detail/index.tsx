import _ from 'lodash'
import { Col, Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'

import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAuthorization } from 'Modules/App/Authorization'
import { useModal } from 'Generic/hooks'

import { StyledButton, StyledPageHeader } from 'Components/Styled'
import { FormikForm } from 'Components/Formik'

import EditValidityModal from 'Model/Users/modal/EditValidityModal'
import ConfirmActivateUser from 'Model/Users/modal/ConfirmActivateUser'
import confirmResendSignUpEn from 'Model/Users/modal/confirmResendSignUp/confirmResendSignUpEn'
import confirmResendSignUpIt from 'Model/Users/modal/confirmResendSignUp/confirmResendSignUpIt'
import ConfirmDeleteUser from 'Model/Users/modal/ConfirmDeleteUser'

import GeneralInfo from './GeneralInfo'
import CorrectiveFactors from './CorrectiveFactors'

const log = new ConsoleLogger('Modules/Users/Detail')

const UserDetail = (props: any) => {
  log.info('render.props', props)
  const {
    data: user,
    language,
    onEdit,
    onBack,
    onEditValidity,
    onActivate,
    onDelete,
    onResendSignUp,
  } = props

  const { status } = user

  const username = _.get(user, 'username', '')
  const userCognitoStatus = _.get(user, 'cognito_status', 'CONFIRMED')
  const autho = useAuthorization()

  const handleOnEdit = () => {
    const { id } = user
    log.info('handleOnEdit.user', user)
    onEdit(id)
  }

  const {
    modal: modalDeleteUser,
    handleOpenModal: handleOpenModalDelete,
    handleCloseModal: handleCloseModalDelete,
  } = useModal({})

  const {
    modal: modalValidity,
    handleOpenModal: handleOpenModalValidity,
    handleCloseModal: handleCloseModalValidity,
  } = useModal({})

  const {
    modal: modalActivateUser,
    handleOpenModal: handleOpenModalActivateUser,
    handleCloseModal: handleCloseModalActivateUser,
  } = useModal({})

  const handleResendSignUp = () => {
    if (language === 'it') {
      confirmResendSignUpIt(() => onResendSignUp({ username, language }))()
    } else {
      confirmResendSignUpEn(() => onResendSignUp({ username, language }))()
    }
  }

  const isPending = status === 'pending'
  const isDisabled = status === 'disabled'

  const activateModalUser = isDisabled
    ? { ...user, expiration_date: null }
    : user

  return (
    <>
      <StyledPageHeader title='data.users.detail_user_header' />
      <FormikForm initialValues={user}>
        <Row
          justify='space-between'
          align='middle'
          style={{ marginBottom: '20px' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={onBack}
              id='button.create.goback'
            />
          </Col>
          <Col>
            {userCognitoStatus === 'FORCE_CHANGE_PASSWORD' ? (
              <StyledButton
                label='data.users.resend_signup'
                onClick={handleResendSignUp}
                id='button.detail.resend_signup'
                style={{ marginRight: '20px' }}
              />
            ) : null}

            <StyledButton
              label='data.users.edit_validity'
              onClick={handleOpenModalValidity}
              id='button.create.goback'
              style={{ marginRight: '20px' }}
            />
            {isPending || isDisabled ? (
              <StyledButton
                label={
                  isPending
                    ? 'data.users.activate_user'
                    : 'data.users.reactivate_user'
                }
                onClick={handleOpenModalActivateUser}
                type='primary'
                id='button.create.activate_user'
                style={{ marginRight: '20px' }}
              />
            ) : null}

            {autho.check(rawPermissions.User.destroy) ? (
              <StyledButton
                label={'data.users.delete_user'}
                onClick={handleOpenModalDelete}
                danger
                id='button.create.delete_user'
                style={{ marginRight: '20px' }}
              />
            ) : null}

            <StyledButton
              label='data.generic.edit'
              onClick={handleOnEdit}
              type='primary'
              id='button.create.edit'
            />
          </Col>
        </Row>

        <GeneralInfo />
        <CorrectiveFactors {...props} />

        <EditValidityModal
          onChangeValidity={onEditValidity}
          onCancel={handleCloseModalValidity}
          modal={{
            ...modalValidity,
            visible: modalValidity.visible,
            data: { __formik_state_reset: modalValidity.visible, user },
            loading: false,
            progress: false,
            error: false,
          }}
        />

        <ConfirmActivateUser
          onActivateUser={onActivate}
          onCancel={handleCloseModalActivateUser}
          modal={{
            ...modalActivateUser,
            visible: modalActivateUser.visible,
            data: {
              __formik_state_reset: modalActivateUser.visible,
              user: activateModalUser,
            },
            loading: false,
            progress: false,
            error: false,
          }}
        />

        <ConfirmDeleteUser
          onDeleteUser={onDelete}
          onCancel={handleCloseModalDelete}
          modal={{
            ...modalDeleteUser,
            visible: modalDeleteUser.visible,
            data: {
              __formik_state_reset: modalDeleteUser.visible,
              user: activateModalUser,
            },
            loading: false,
            progress: false,
            error: false,
          }}
        />
      </FormikForm>
    </>
  )
}

export default UserDetail
