import { Button, Modal, Space, Table, Input, Typography, message } from "antd"
import { FrownOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Customers() {
  const {currentUser} = useSelector(state => state.auth)
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null)
  const [dataSource, setDataSource] = useState([])

  //customize pagination
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 5
  let length;

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => {
        return ((currentPage - 1) * limit) + index + 1
      }
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => {
        return (
            <Space>
              <Button
                onClick={() => handleOpenEdit(record)}
              >
                Edit
              </Button>
              <Button
                danger
                onClick={() => handleDelete(record)}
              >
                Delete
              </Button>

            </Space>
        )
    }
    },
  ];

  const handleOpenEdit = (record) => {
    setIsEditing(true);
    setEditingUser(record);
  }

  const getAllCustomer = () => {
    fetch("http://localhost:5000/getAllUser", {
        method: "GET"
    })
    .then(res => res.json())
    .then((data) => {
      setDataSource(data.data.filter(user => user.role === "user"))
      length = dataSource.length
    })
  }

  // const getUserData = () => {
  //   fetch("http://localhost:5000/userData", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //         "Content-type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "token": `Bearer ${localStorage.getItem("accessToken")}`
  //       },
  //     body: JSON.stringify({
  //       token: window.localStorage.getItem("accessToken")
  //     })
  //   })
  //   .then(res => res.json())
  //   .then((data) => {
  //       setUserRole(data.data.role)
  //   })
  // }

  useEffect(() => {
    getAllCustomer();
  }, [])

  const handleEdit = () => {
      const requestOptions = {
          method: 'PUT',
          headers:{
              "Content-Type": 'application/json',
              "token": `Bearer ${localStorage.getItem("accessToken")}`
          },
          body: JSON.stringify(
              {
                  username: editingUser.username,
                  email: editingUser.email,
              }
          )
      };
      fetch(`http://localhost:5000/update-userData/${editingUser._id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
          if(data.status === "Update successful") {
              messageApi.open({
                  type: 'success',
                  content: data.status,
                });
              getAllCustomer();
              setIsEditing(false);
          } else {
              messageApi.open({
                  type: 'error',
                  content: data.status,
              });
          }
      })
  }

  const handleDelete = (record) => {
    Modal.confirm({
      title: `Are you sure to delete user "${record.username}"?`,
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
                    "token": `Bearer ${window.localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(
                    {userId: record._id}
                )
            })
            .then(response => response.json())
            .then(data => {
              messageApi.open({
                    type: 'success',
                    content: data.status,
                });
              getAllCustomer();
            })
      }
    })
  }


  return (
    <>
      {
        (currentUser.role !== 'admin')
        ? <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <FrownOutlined size={100}/>
            <Typography.Paragraph>You have no pemission to to access this page.</Typography.Paragraph>
          </div>
        : (<>
          {contextHolder}
            <Table
              columns={columns} 
              dataSource={dataSource}
              rowKey={(record) => record._id}
              pagination={{
                pageSize: limit,
                total: length,
                onChange(current) {
                  setCurrentPage(current);
                }
              }}
            >
            </Table>
            <Modal
              title="Edit User"
              open={isEditing}
              okText="Save"
              onOk={() => {
                handleEdit();
              }}
              onCancel={() => {
                setIsEditing(false)
              }}
            >
              <Input 
                value={editingUser?.username}
                onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
              />
              <Input
                style={{marginTop: 16}}
                value={editingUser?.email}
                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
              />
            </Modal>
          </>)
      }
    </>
  )
}
