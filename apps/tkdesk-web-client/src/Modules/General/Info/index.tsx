import { Card, Divider, Image } from 'antd'
import { Route, Routes } from 'react-router-dom'
import tkLogo from 'Images/thermokey-logo.png'

const InfoPage = () => {
  return (
    <Card>
      <Image src={tkLogo} preview={false} />
      <Divider />
      <div>
        <p>
          ThermoKey S.p.A. <br />
          Via dell&apos;Industria 1 - 33061
          <br />
          Rivarotta di Rivignano Teor - UD - Italy
          <br />
          <strong>T.</strong> +39 0432 772300 <br />
          <strong>F.</strong> +39 0432 779734 <br />
          <br />
          <strong>P. IVA</strong> IT 01705880308 <br />
          <strong>Cap. sociale</strong> euro 8.300.000,00 i.v. <br />
          Uff. Reg. Imp. di Udine REA n. 189967
        </p>
      </div>
    </Card>
  )
}

const InfoPageRouting = () => {
  return (
    <Routes>
      <Route path='/' element={<InfoPage />} />
    </Routes>
  )
}

InfoPageRouting.prefix = 'information'
export default InfoPageRouting
