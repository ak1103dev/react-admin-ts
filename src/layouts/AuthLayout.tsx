import React from 'react'
import PropTypes from 'prop-types'
import { Card, Layout } from 'antd'

interface Props {
  children: JSX.Element
}

const AuthLayout = ({ children }: Props): JSX.Element => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content
        style={{ padding: '70px 0px', display: 'flex', alignItems: 'center' }}
      >
        <Card
          style={{
            width: 320,
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {children}
        </Card>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        © 2020 Admin Web v1.0.0
      </Layout.Footer>
    </Layout>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AuthLayout
