import _ from 'lodash'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Popover, Divider } from 'antd'
import { SpanIntl } from 'Components/Span'
import { StyledButton } from 'Components/Styled'
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import colors from 'styles/colors.module.scss'

interface UserProps {
  onLogout: () => void
  onProfileDetail: () => void
  profile?: User
}
const UserProfileIcon = (props: UserProps) => {
  const intl = useIntl()
  const { onProfileDetail, onLogout, profile } = props

  const registry: Registry = _.get(profile, 'registry', {})

  const user_type = _.get(profile, 'user_type', '')

  const popoverContent = (
    <StyledUserData>
      <div style={{ textTransform: 'none' }}>
        <p>
          {_.startCase(
            _.get(registry, 'name') + ' ' + _.get(registry, 'surname'),
          )}
        </p>
        {_.toLower(_.get(profile, 'username', ''))}
      </div>

      <StyledButton
        onClick={onProfileDetail}
        style={{ marginBottom: '5px' }}
        id='data.button.profile'
        label='ui.generic.profile'
      />
      <StyledButton
        id='data.button.logout'
        type='link'
        label='ui.generic.logout'
        onClick={onLogout}
        style={{ marginBottom: 0 }}
      />
      <Divider />

      <Link
        to='/information'
        style={{ width: '70%' }}
        className='link-info-content'
      >
        <div className='info-content'>
          <InfoCircleOutlined />
          <span>{intl.formatMessage({ id: 'ui.generic.information' })}</span>
        </div>
      </Link>
    </StyledUserData>
  )
  return (
    <>
      <Popover
        placement='bottomRight'
        trigger='hover'
        title={<SpanIntl value='ui.profile.title' />}
        content={popoverContent}
        arrow={{ pointAtCenter: true }}
        overlayStyle={{
          textTransform: 'capitalize',
          textAlign: 'center',
          fontSize: '17px',
          cursor: 'pointer',
        }}
      >
        <UserOutlined style={{ fontSize: '23px', cursor: 'pointer' }} />
      </Popover>
    </>
  )
}

const StyledUserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  div {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    p {
      margin-bottom: 5px;
      font-family: 'Avenir Medium', sans-serif;
      &:first-child {
        font-family: 'Avenir Heavy', sans-serif;
        font-size: 18px;
      }
    }
  }
  .ant-btn-link {
    span:hover {
      text-decoration: underline;
    }
  }
  .link-info-content {
    width: 70%;
    color: ${colors.text};

    .info-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    &:hover {
      .info-content {
        span {
          color: ${colors.primary_hover};
        }
      }
    }
  }

  .ant-divider {
    margin: 10px 0;
  }
`

export default UserProfileIcon
