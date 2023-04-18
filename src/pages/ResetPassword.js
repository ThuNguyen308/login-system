import { useState } from 'react'
import { Form, Button, Input, Typography, message } from 'antd'

export default function ResetPassword() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isSent, setIsSent] = useState(false)

  const onFinish = (values) => {
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(
          {email: values.email}
      )
  })
  .then(res => res.json())
  .then((data) => {
      if(data.status === 'User Not Exists'){
        messageApi.open({
          type: 'error',
          content: data.status,
        });
      }
      else {
        setIsSent(true)
      }
  })
  }

  return (
    <div className="bg-container">
          {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{
          width: 600,
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Typography.Title
          level={1}
          style={{ textAlign: "center", paddingBottom: "16px" }}
        >
          Reset password
        </Typography.Title>

        <Typography.Paragraph italic style={{color: "#444", textAlign: "center"}}>Enter your email and we'll send you link to reset your password.</Typography.Paragraph>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      {isSent ? <Typography.Paragraph strong style={{color: "blue", textAlign: "center"}}>We emailed to you. Please check!</Typography.Paragraph> : null}
      </Form>
    </div>

  )
}
