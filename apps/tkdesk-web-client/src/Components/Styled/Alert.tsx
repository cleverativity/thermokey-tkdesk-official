import { Alert } from 'antd'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import * as _ from 'ramda'

const Style = styled<any>(Alert)`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: fit-content;
`

interface AlertProps {
  message?: string
  type?: 'success' | 'info' | 'warning' | 'error' | 'app'
  children?: any
  description?: string
  descriptionValues?: any
  titleValues?: any
  showIcon?: boolean
  action?: any
}
const StyledAlert = (props: AlertProps) => {
  const {
    children,
    message,
    type,
    description = '',
    descriptionValues = {},
    titleValues = {},
    ...other
  } = props

  const intl = useIntl()

  const newDescription = _.isNil(children)
    ? intl.formatMessage({ id: description }, descriptionValues)
    : children

  const intlTitle = _.isNil(message)
    ? null
    : intl.formatMessage({ id: message }, titleValues)

  return (
    <Style
      type={type}
      message={intlTitle}
      description={newDescription}
      {...other}
    />
  )
}

export default StyledAlert
