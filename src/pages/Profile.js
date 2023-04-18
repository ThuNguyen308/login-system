import { useEffect, useState } from "react";
import { Card, Modal, Input, Form, Avatar, Typography, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from '../redux/actions/auth'

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state =>state.auth)
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [info, setInfo] = useState(currentUser)
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState("");


    useEffect(() => {
        // fetch("http://localhost:5000/userData", {
        //     method: "POST",
        //     crossDomain: true,
        //     headers: {
        //         "Content-type": "application/json",
        //         Accept: "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //         "token": `Bearer ${localStorage.getItem("accessToken")}`
        //         },
        //     body: JSON.stringify({
        //         token: window.localStorage.getItem("accessToken")
        //     })
        //     }).then(res => res.json())
        //     .then((data) => {
        //         console.log(data, "profile - userData")
        //         setInfo(data.data)
        //         dispatch(updateSuccess(data.data))
        //         form.setFieldsValue(data.data)
        // })
        form.setFieldsValue(currentUser)

    }, [])

    const handleEdit = (values) => {
        // console.log(values.username, values.password, values.avatar, 'success')
        const requestOptions = {
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(
                {
                    username: values.username,
                    email: values.email,
                    avatar: image || info.avatar
                }
            )
        };
        fetch(`http://localhost:5000/update-userData/${info._id}`, requestOptions
        )
        .then(response => response.json())
        .then(data => {
            if(data.status === "Update successful") {
                messageApi.open({
                    type: 'success',
                    content: data.status,
                });
                
                dispatch(updateSuccess(data.data))
                setInfo({...data.data})
                setIsEditing(false);
            } else {
                messageApi.open({
                    type: 'error',
                    content: data.status,
                });
            }
        })
    }

//   const uploadButton = (
//     <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//         <PlusOutlined />
//         <div style={{ marginTop: 8 }}> Upload </div>
//     </div>
//   );

    const handleDelete = () => {
        Modal.confirm({
            title: `Are you sure to delete your account?`,
            onText: 'Yes',
            okType: 'danger',
            onOk() {
                fetch("http://localhost:5000/deleteUser", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "token": `Bearer ${localStorage.getItem("accessToken")}`
                },
                    body: JSON.stringify(
                        {userId: info._id}
                    )
                })
                .then(response => response.json())
                .then(data => {
                    window.localStorage.removeItem("accessToken");
                    window.localStorage.removeItem("userId");
                    navigate("/")
                })
            }
        })
    }

    function convertToBase64(e) {
        var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64encode string
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: ", error);
        }
    }


  return (
    <>
        {contextHolder}
        <Card
            style={{maxWidth: 500, margin: 'auto', textAlign: 'center',}}
            actions={[
                <DeleteOutlined key="setting"
                    style={{ color: "red" }}
                    onClick={handleDelete} />,
                <EditOutlined key="edit"
                    style={{ color: "#42b883" }}
                    onClick={() => setIsEditing(true)} />,

            ]}
        >
            <Avatar src={info.avatar} size={200} style={{margin: 'auto'}} />
            <Typography.Title level={1}>{info.username}</Typography.Title>
            <Card>
                <Typography.Title level={3}>Role</Typography.Title>
                <Typography.Paragraph>{info.role}</Typography.Paragraph>
            </Card>
            <Card style={{margin: '20px 0'}}>
                <Typography.Title level={3}>Email</Typography.Title>
                <Typography.Paragraph>{info.email}</Typography.Paragraph>
            </Card>
        </Card>

        <Modal
            title="Edit My Profile"
            forceRender
            open={isEditing}
            okText="Save"
            onOk={
                form.submit
            }
            onCancel={() => {
                setIsEditing(false)
            }}
        >
            <Form
                form={form}
                labelCol={{ span:6}}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={handleEdit}
                autoComplete="off"
            >
                
                <Form.Item
                    label="Avatar"
                    disabled={true}
                >
                    <Input type="file" onChange={(e) => convertToBase64(e)}/>
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    initialValue={form.getFieldValue("username")}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    initialValue={form.getFieldValue("email")}
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email'}
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
      </Modal>
    </>
    )
}
