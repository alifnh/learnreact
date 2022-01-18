import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Routes from './Routes';
import LayoutComponent from './Layout/Layout';
import Register from "./Page/Register";
import Headers from './Layout/Header';
import Home from './Page/Home';

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
