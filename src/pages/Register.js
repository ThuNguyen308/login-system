import { Form, Button, Input, Typography, Radio, message } from 'antd'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
    const [role, setRole] = useState('user');
    

    function onFinish(values) {
        const {username, email, password, role, secretKey} = values
        if(values.role === "admin" && secretKey !== "thunguyen") {
            messageApi.open({
                type: 'error',
                content: 'Invalid admin',
            });
        }else {
            fetch("http://localhost:5000/register", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(
                    {username, email, password, role}
                )
            }).then(res => res.json()).then((data) => {
                if(data.status === "ok") {
                    messageApi.open({
                        type: 'success',
                        content: "Refister successful",
                    });
                    navigate('/login')
                }
                else {
                    messageApi.open({
                        type: 'error',
                        content: data.status,
                    });
                }
                console.log(data, "userRegister")
            })
        }
    }


  return (
    <>
        {contextHolder}
        <div className='bg-container'>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ width: 600, padding: '20px', backgroundColor: '#fff', borderRadius: '12px'}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Typography.Title level={1} style={{textAlign: 'center', paddingBottom: '16px'}} >Register</Typography.Title>
    
                <Form.Item label="Role" name="role" initialValue={role}>
                    <Radio.Group
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                    >
                        <Radio value="user"> User </Radio>
                        <Radio value="admin"> Admin </Radio>
                    </Radio.Group>
                </Form.Item>
    
                {
                    role === 'admin'
                    ? (<Form.Item
                            name="secretKey"
                            label="Secret Key"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your secret key!',
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>)
                    : null
                }
    
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>
    
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email'}
                    ]}
                >
                    <Input />
                </Form.Item>
    
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
    
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                </Form.Item>
    
    
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
              <Typography style={{textAlign: 'center'}}>Already a member? <a href="/login"> Login now!</a></Typography>
            </Form>
        </div>
    </>
  )
}
