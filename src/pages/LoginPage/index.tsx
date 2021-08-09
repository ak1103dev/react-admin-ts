import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { useHistory } from 'react-router-dom'

type FormValues = {
  email: string
  password: string
}

const LoginPage = (): JSX.Element => {
  const history = useHistory()

  const onFinish = (values: FormValues) => {
    try {
      console.log('Success:', values)
      history.push('/dashboard')
      message.success('Login Success')
    } catch (e) {
      message.error('Login Failed')
    }
  }

  return (
    <Form name="login" layout="vertical" initialValues={{}} onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginPage
