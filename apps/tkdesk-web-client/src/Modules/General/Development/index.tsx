import { Routes, Route, Navigate } from 'react-router-dom'

import Swagger from './Swagger'
import GetAuth from './GetAuth'

const Development = () => {
  return (
    <Routes>
      <Route path='swagger' element={<Swagger />} />
      <Route path='get-auth' element={<GetAuth />} />
      <Route path='*' element={<Navigate to='swagger' />} />
    </Routes>
  )
}

Development.prefix = 'development'

export default Development
