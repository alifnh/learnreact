import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, VideoCameraOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const SideBar=() =>{
  
   return(
      
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >
          {
          Cookies.get('token') !== undefined &&
          <>
          <SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Movie">
            <Menu.Item key="1"><Link to="/movielist">Movie List</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/movieform">Movie Form</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Game">
            <Menu.Item key="5"><Link to="/gamelist">Game List</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/gameform">Game Form</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Account">
            <Menu.Item key="9"><Link to="/changepassword">Change Password</Link></Menu.Item>
          </SubMenu>
          </>
        }

          {
          Cookies.get('token') === undefined && (
            <>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Anonymous">
            <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/register">Register</Link></Menu.Item>
          </SubMenu>
            </>
          )}
        </Menu>
      </Sider>
      
   )
}

export default SideBar