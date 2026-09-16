import { useState } from 'react'
import { Card, Col } from 'antd'
import { StyledButton, StyledPageHeader, StyledRow } from 'Components/Styled'
import { fetchAuthSession } from 'aws-amplify/auth'

const GetAuth = () => {
  const [state, setState] = useState({ token: '' })
  return (
    <>
      <StyledPageHeader title='ui.generic.get_auth' />
      <Card>
        <StyledButton
          id='data.get_auth_token'
          label='ui.generic.get_auth'
          onClick={async () => {
            const idToken = (
              await fetchAuthSession()
            )?.tokens?.idToken?.toString()
            if (idToken) {
              setState({ token: idToken })
            }
          }}
        />
        <StyledRow>
          <Col span={24}>
            <p style={{ wordBreak: 'break-all' }}>{state.token}</p>
          </Col>
        </StyledRow>
      </Card>
    </>
  )
}

export default GetAuth
