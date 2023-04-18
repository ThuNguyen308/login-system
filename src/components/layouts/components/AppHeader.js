import { Input, Space, Badge, Avatar } from 'antd'
import { SearchOutlined, GlobalOutlined, MessageOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

export default function AppHeader() {
  const currentUser = useSelector(state => state.auth.currentUser)
  console.log(currentUser, "header")
  return (

    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Input placeholder="Search something..." prefix={<SearchOutlined />}  style={{ width: '35%'}}/>
      <Space size={16} style={{ color: '#fff'}}>
        <Space size={4}>
            <GlobalOutlined style={{fontSize: '20px'}}/>
            <span style={{ fontWeight: 'lighter' }}>English</span>
        </Space>
        <Badge count={5} size="small">
          <MessageOutlined style={{fontSize: '20px', color: '#fff'}} />
        </Badge>
        <Badge>
          <BellOutlined  style={{fontSize: '20px', color: '#fff'}}/>
        </Badge>
        <Space size={4}>
          <Avatar src={currentUser.avatar} style={{ background: '#fff'}}/>
          <span style={{ fontSize: '18px'}}>{currentUser.username}</span>
        </Space>
        <SettingOutlined  style={{fontSize: '20px', color: '#fff'}}/>
      </Space>
    </div>
  )
}
