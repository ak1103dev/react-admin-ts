import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Logout = (): JSX.Element => {
  const {
    authContext: { logout },
  } = useAuth()
  const history = useHistory()
  useEffect(() => {
    logout().then(() => {
      history.push('/login')
    })
  })
  return <div>Logout</div>
}

export default Logout
