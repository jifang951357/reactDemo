import * as React from "react";
import { Link } from "react-router-dom";
import router from "./router";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

function NavMenu(props) {
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router[0].path]}>
        {router.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
}
export default NavMenu;
