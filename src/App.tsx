import React from 'react'
import 'antd/dist/antd.less'
import Routes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { LocalizationProvider } from './contexts/LocalizationContext'

function App(): JSX.Element {
  return (
    <LocalizationProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </LocalizationProvider>
  )
}

export default App
