import _ from 'lodash'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ConsoleLogger } from 'aws-amplify/utils'

import { StyledButton, StyledPageHeader } from 'Components/Styled'
import { FormikForm, FormikSubmit } from 'Components/Formik'

import confirmEditUserIt from 'Model/Users/modal/confirmEditUser/confirmEditUserIt'
import confirmEditUserEn from 'Model/Users/modal/confirmEditUser/confirmEditUserEn'

import CreationForm from '../../../Model/Users/components/CreationForm'
import CorrectiveFactors from './CorrectiveFactors'

const log = new ConsoleLogger('Modules/Users/Edit')

interface UserEditProps {
  data: any
  onEdit?: (data: User) => void
  profile: any
}

const UserEdit = (props: UserEditProps) => {
  log.info('render.props', props)
  const { data: user, onEdit, profile } = props

  const navigate = useNavigate()

  const language = _.get(profile, 'preferences.language', 'it')

  const userIsProfile = _.isEqual(profile.id, user?.id)

  const handleSubmit = (values: User, frk: any) => {
    log.info('handleSubmit.values', values)
    if (onEdit) {
      if (language === 'it') {
        confirmEditUserIt(() => onEdit(values))()
      } else {
        confirmEditUserEn(() => onEdit(values))()
      }
    }
    frk.setSubmitting(false)
  }

  return (
    <>
      <StyledPageHeader
        title={
          userIsProfile
            ? 'data.users.edit_profile_header'
            : 'data.users.edit_user_header'
        }
      />
      <FormikForm initialValues={user} onSubmit={handleSubmit}>
        <Row
          justify='space-between'
          align='middle'
          style={{ margin: '0 0 16px 0' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={() => navigate(-1)}
              id='button.create.goback'
            />
          </Col>
          <Col>
            <FormikSubmit
              label='data.generic.edit'
              type='primary'
              id='button.create.edit_user'
            />
          </Col>
        </Row>

        <CreationForm mode='edit' />
        <CorrectiveFactors user={user} />
      </FormikForm>
    </>
  )
}

export default UserEdit
