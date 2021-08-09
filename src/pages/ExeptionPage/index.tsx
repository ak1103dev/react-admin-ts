import React from 'react'
import { Result, Button, Layout } from 'antd'
import { useHistory } from 'react-router-dom'

interface Props {
  code: 403 | 404 | 500
}

const ExceptionPage = ({ code = 500 }: Props): JSX.Element => {
  const history = useHistory()
  const subtitles: { [k in 403 | 404 | 500]: string } = {
    403: 'Sorry, you are not authorized to access this page.',
    404: 'Sorry, the page you visited does not exist.',
    500: 'Sorry, something went wrong.',
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Result
        status={code}
        title={code}
        subTitle={subtitles[code]}
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            Back to Home
          </Button>
        }
      />
    </Layout>
  )
}

export default ExceptionPage
