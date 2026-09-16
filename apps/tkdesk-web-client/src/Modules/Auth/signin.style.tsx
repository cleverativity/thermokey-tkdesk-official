import styled from 'styled-components'
import bgImage from '../../Images/bgLogin.jpg'
import { FieldLanguage } from 'Components/Field'

const LoginLayout = (props: any) => {
  const { style = {} } = props
  return (
    <LoginPage>
      <LoginLayer>
        <LanguageContainer>
          <FieldLanguage isLogin />
        </LanguageContainer>
        <LoginForm style={style}>{props.children}</LoginForm>
      </LoginLayer>
    </LoginPage>
  )
}

const LanguageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 30px;
`

const LoginLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.35s;
`

const LoginPage = styled.section`
  height: 100vh;
  width: 100%;

  background: url(${bgImage});
  background-size: cover;
`

const LoginForm = styled.div`
  background-color: white;
  padding: 40px 35px;
  min-width: 400px;
  max-width: 900px;
  border-radius: 16px;
  transition: all ease 0.35s;
  box-shadow: 0px 0px 47px -11px rgba(0, 0, 0, 0.75);
  position: relative;
  img {
    margin: 0 auto;
    display: block;
    padding-bottom: 40px;
    width: 150px;
  }
`

export default LoginLayout
