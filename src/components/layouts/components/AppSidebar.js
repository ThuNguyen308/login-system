import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Menu, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';



export default function AppSidebar() {
  let href = window.location.pathname;
  const navigate = useNavigate()

  const items = [
    {
      label: 'Customers',
      key: '/customers',
      icon: <UserOutlined />,
    },
    {
      type: 'group',
      label: 'My Account',
      title: 'My Account',
      children: [
        {
          label: 'Profile',
          key: '/profile',
          icon: <ProfileOutlined />
        },
        {
          label: 'Logout',
          key: '/logout',
          icon: <LogoutOutlined />
        }
      ]
    }
  ]
 
  return (
    <>
      <Typography.Title level={1} style={{fontFamily: "'Pacifico', cursive", marginTop: '20px', color: '#fff', textAlign: 'center', userSelect: 'none', cursor: 'pointer'}}>
        Tech Shop
      </Typography.Title>
      <Menu
        items={items}
        onClick={(e) => navigate(e.key)}
        theme="dark"
        defaultSelectedKeys={[href]}
        selectedKeys={[href]}
      >
      </Menu>
    </>
  )
}
