import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from 'styles/colors.module.scss'

const StyledCard = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${colors.text};
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const StyledLink = styled(Link)`
  background-color: ${colors.background};
  padding: 5px 14px;
  border: 1px solid ${colors.disabled};
  color: ${colors.text};
  font-family: 'Avenir Medium', sans-serif;
  border-radius: 6px;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);

  &:hover {
    color: ${colors.primary_hover};
    border-color: ${colors.primary_hover};
  }
`

const Blank = (props: any) => {
  // const { message } = props
  return (
    <StyledCard>
      <p
        style={{
          fontFamily: 'Avenir Heavy, sans-serif',
          fontSize: '150px',
        }}
      >
        <FormattedMessage id='ui.generic.blank' />
      </p>

      <p
        style={{
          fontFamily: 'Avenir Medium, sans-serif',
          fontSize: '20px',
          marginBottom: '20px',
        }}
      >
        <FormattedMessage id='ui.generic.blank_description' />
      </p>

      <StyledLink to='/'>
        <FormattedMessage id='ui.generic.blank_button' />
      </StyledLink>

      {/* {message ? <div> {message}</div> : null} */}
    </StyledCard>
  )
}

export default Blank
