import _ from 'lodash'
import { Tag } from 'antd'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

const defColor = 'neutral'

interface BadgeProps {
  prefix: string
  value: string | undefined
  color: string
}

const SpanBadge = (props: BadgeProps): any => {
  const { prefix = '', value = '', color } = props

  const intl = useIntl()
  if (_.isNil(value) || _.isEmpty(value)) {
    return '•'
  }

  const localData = intl.formatMessage({ id: prefix + value })
  const tagColor = _.defaultTo(color, defColor)

  return (
    <StyledTag variant='solid' color={tagColor}>
      {localData}
    </StyledTag>
  )
}

const StyledTag = styled(Tag)`
  font-family: 'Avenir Heavy', sans-serif;
`

export default SpanBadge
