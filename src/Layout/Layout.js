import React from "react"
import { Layout, Menu, Breadcrumb } from 'antd';
import Headers from './Header';
import Footers from './Footer';
import SideBar from './Sider';
const { Header, Content, Sider } = Layout;
const LayoutComponent = (props) =>{
   return(
      <>
         <Headers />
         <Layout>
         <SideBar />
         <Layout style={{ padding: '0 24px 24px' }}>
         <Content
            className="site-layout-background"
            style={{
               padding: 24,
               margin: '16px',
               minHeight: 470,
            }}
         >
            {props.content}
         </Content>
      </Layout>
      </Layout>
               
         <Footers />
      </>
   )
}

export default LayoutComponent