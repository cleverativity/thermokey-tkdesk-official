import styled from 'styled-components'
import { useIntl } from 'react-intl'

const Style = styled.h1`
  font-size: 23px;
  font-family: 'Avenir Heavy', sans-serif;
  letter-spacing: 1px;
  color: #616775;
  width: 100%;
  margin-right: 17px !important;
  margin-bottom: 30px !important;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }
`

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: 400;
  color: #7d828e;
  width: 50%;
  margin-top: -25px !important;
  margin-bottom: 30px !important;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }
`

const StyledPageHeader = (props: any) => {
  const intl = useIntl()
  const { title, subTitle = '', ...otherProps } = props
  return (
    <>
      <Style title={intl.formatMessage({ id: title })} {...otherProps}>
        {intl.formatMessage({ id: title })}
      </Style>
      <SubTitle>
        {subTitle === '' ? subTitle : intl.formatMessage({ id: subTitle })}
      </SubTitle>
    </>
  )
}

export default StyledPageHeader
