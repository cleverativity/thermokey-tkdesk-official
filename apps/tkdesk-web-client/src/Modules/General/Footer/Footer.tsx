import { useState } from 'react'

import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import ReactJson from 'react-json-view'
import env from 'Configs/env'

import * as E from 'Utils/errors'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { InfoCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import packageJson from '../../../../package.json'
import colors from 'styles/colors.module.scss'

const log = new ConsoleLogger('Modules/Footer')

const { Footer: AntdFooter } = Layout

const DEVELOP =
  env.VITE_ENV === 'development' ||
  env.VITE_ENV === 'local' ||
  env.VITE_ENV === 'localfront'
const TEST = env.VITE_ENV === 'staging' || env.VITE_ENV === 'qatest'

interface FooterProps {
  footerText: string
  show?: boolean
  state?: any
}

const Footer = (props: FooterProps) => {
  const intl = useIntl()
  const { footerText = '', state } = props

  const [showError, setShowError] = useState(props.show)

  const back_version = _.get(state, 'general.profile.data.back_version', '')

  if (!showError) {
    return (
      <AntdFooter
        style={{
          background: colors.white,
          textAlign: 'center',
          borderTop: '1px solid #ededed',
          zIndex: 10,
          position: 'relative',
        }}
      >
        <span
          onClick={(e) => {
            if (DEVELOP || TEST) {
              setShowError(true)
            } else {
              e.preventDefault()
            }
          }}
        >
          <StyledLink to='/information'>
            <InfoCircleOutlined /> Thermokey
          </StyledLink>{' '}
          - {intl.formatMessage({ id: footerText })} -{' '}
          <CustomLink to='/help'>
            {intl.formatMessage({ id: 'ui.footer.help' })}
          </CustomLink>
          <br />
          Version: FE_v{packageJson.version} | BE_v{back_version}
        </span>
      </AntdFooter>
    )
  } else {
    const errors = E.filterError(props.state)

    if (!errors) {
      return (
        <AntdFooter
          style={{
            background: colors.white,
            textAlign: 'center',
            borderTop: '1px solid #ededed',
          }}
        >
          <span
            onClick={(e) => {
              if (DEVELOP || TEST) {
                setShowError(false)
              } else {
                e.preventDefault()
              }
            }}
          >
            No errors
          </span>
        </AntdFooter>
      )
    }
    return (
      <AntdFooter
        style={{
          background: colors.white,
          borderTop: '1px solid #ededed',
          zIndex: '20',
        }}
      >
        <ReactJson indentWidth={4} collapsed={false} src={errors} />
      </AntdFooter>
    )
  }
}

const StyledLink = styled(Link)`
  color: ${colors.text};

  &:hover {
    color: ${colors.primary_hover};
  }
`

const CustomLink = styled(StyledLink)`
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`

export default connect((state) => ({ state }))(Footer)
