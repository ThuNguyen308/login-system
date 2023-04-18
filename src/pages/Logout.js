import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const navigation = useNavigate()
  return (
    <div className="bg-container">
      <div style={{width: 300, padding: 20, borderRadius: 12, backgroundColor: '#fff'}}>
      <Typography.Text style={{ fontWeight: 500}}>Do you want to log out?</Typography.Text>
        <Button danger
          style={{marginLeft: 16}}
          onClick={() => {
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem("userId")
            navigation('/')
          }}
        >Yes</Button>
    </div>  
    </div>
  )
}
