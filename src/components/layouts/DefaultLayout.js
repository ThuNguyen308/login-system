import { Layout} from 'antd';
import AppHeader from './components/AppHeader'
import AppSidebar from './components/AppSidebar'


export default function DefaultLayout({ children }) {
    const { Header, Sider, Content } = Layout
  
    

    return (
    <Layout style={{minHeight: '100vh'}}>
        <Sider>
            <AppSidebar />
        </Sider>
        <Layout>
            <Header>
                <AppHeader />
            </Header>
            <Content style={{ padding: 20}}>
                {children}
            </Content>
        </Layout>
    </Layout>
  )
}
