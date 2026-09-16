import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

const Style = styled.div`
  padding: 0 40px;
  h2,
  h5 {
    color: ${colors.primary};
  }
  h2 {
    margin-bottom: 20px;
  }
  h5 {
    border-bottom: 1px solid ${colors.primary};
  }
  p {
    font-size: 14px;
    margin-top: 8px;
  }

  @media only screen and (max-width: 767px) {
    padding: 0;
  }
`

const DescriptionContainer = (props: any) => {
  return <Style>{props.children}</Style>
}

export default DescriptionContainer
