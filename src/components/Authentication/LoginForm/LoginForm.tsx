import { FC, useRef } from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import { layout, tailLayout } from '../form-config'
import { authService } from '../../../store/services/AuthenticationService'
import { useHistory } from 'react-router-dom'
import { useAuthentication } from '../../../utils/useAuthentication'

type Values = {
  userId: string
  password: string
}

export const LoginForm: FC = observer(() => {
  const { login } = useAuthentication()
  const history = useHistory()
  const form = useRef<any>()
  const onFinish = (values: Values) => {
    login(values.userId, values.password)

    form.current.resetFields()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        {...layout}
        ref={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ marginTop: '100px' }}
      >
        <Form.Item
          label='ID'
          name='userId'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})
