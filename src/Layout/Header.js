import React, { useContext } from "react"
import Cookies from "js-cookie";
import { Layout, Menu } from 'antd';
import { Link, BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "../AppContext"
import { useHistory } from "react-router";
const { Header } = Layout;


const Headers =() =>{
  const { setLoginStatus } = useContext(AppContext)
  let history = useHistory()
  const handleLogout = () => {
    setLoginStatus(false)
    Cookies.remove('user')
        Cookies.remove('email')
        Cookies.remove('token')
    history.push('/login')
  }
 
   return(
     <>
     <Layout>    
     <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key={"1"}><Link to="/">Home</Link></Menu.Item>
        {
          Cookies.get('token') !== undefined &&
          <>
          <Menu.Item key={"4"} onClick={handleLogout}>Logout</Menu.Item>
          </>
        }
        {
          Cookies.get('token') === undefined && (
            <>
            <Menu.Item key={"4"}><Link to="/register">Register</Link></Menu.Item>
            <Menu.Item key={"5"}><Link to="/login">Login</Link></Menu.Item>
            </>
          )}
        
        
      </Menu>
    </Header>
    </Layout>
     </>
   )
 }
 
 export default Headers
 