import tkLogo from 'Images/thermokey-logo.png'
import { Card, Divider, Image } from 'antd'
import { Route, Routes } from 'react-router-dom'

import { useIntl } from 'react-intl'
import styled from 'styled-components'

const StyledLink = styled.a`
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`

const HelpPage = (props: any) => {
  // const { message } = props
  const intl = useIntl()

  return (
    <Card>
      <Image src={tkLogo} preview={false} />
      <Divider />

      <div>
        <p>{intl.formatMessage({ id: 'ui.help' })}</p>
        <StyledLink href='mailto:support-tkdesk@thermokey.com'>
          support-tkdesk@thermokey.com
        </StyledLink>
      </div>

      <div style={{ marginTop: '15px' }}>
        <span>{intl.formatMessage({ id: 'ui.help.download' })}</span>
        <StyledLink
          href='https://www.thermokey.com/en/download/technical-manuals/'
          target='_blank'
        >
          {intl.formatMessage({ id: 'ui.help.user_guide' })}
        </StyledLink>
      </div>
    </Card>
  )
}

const HelpPageRouting = (props: any) => {
  const { match } = props

  return (
    <Routes>
      <Route path='/' element={<HelpPage />} />
    </Routes>
  )
}

HelpPageRouting.prefix = 'help'
export default HelpPageRouting
