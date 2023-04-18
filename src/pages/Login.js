import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { Button, Checkbox, Form, Input, Typography, message  } from 'antd';

import { login, loginSuccess} from '../redux/actions/auth'


export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onFinish(values) {
    const { email, password } = values;
    console.log(email, password);
    dispatch(login());
    try {
      fetch("http://localhost:5000/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(
                {email, password}
            )
        }).then(res => res.json()).then((data) => {
            console.log(data, "userLogin")
            if(data.status === "ok") {
              localStorage.setItem("accessToken", data.accessToken)
              dispatch(loginSuccess({ accessToken: data.accessToken, userId: data.userId , currentUser: data.user}));
              messageApi.open({
                type: 'success',
                content: 'Login successful!',
            });
              navigate('/profile')
            }
            else {
              messageApi.open({
                type: 'error',
                content: data.error,
              });
            }
        })
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: err,
      });
    }
  }

  function onFinishFailed() {
    messageApi.open({
      type: 'error',
      content: 'Login error!',
    });
  }

  return (
    <div className="bg-container">
        {contextHolder}
        <Form
          name="normal_login"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ width: 600, padding: '20px', backgroundColor: '#fff', borderRadius: '12px'}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
            <Typography.Title level={1} style={{textAlign: 'center', paddingBottom: '16px'}} >Login</Typography.Title>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            style={{ marginBottom: 6}}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a href="/reset-password">
                Forgot password
              </a>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }} >
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </Form.Item>

          <Typography style={{textAlign: 'center'}}>You want create a new account?<a href="/register"> Register now!</a></Typography>
        </Form>
    </div>
  )
}
