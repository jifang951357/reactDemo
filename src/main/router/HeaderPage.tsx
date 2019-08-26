import * as React from "react";
import { Layout, Icon, Menu, Dropdown, Modal } from "antd";
import http from "@sinoui/http";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionCreators } from "@auth/user";

const { Header } = Layout;

function HeaderPage(props) {
  const showConfirm = () => {
    const logout = props.onLogout;
    const history = props.history;
    Modal.confirm({
      title: "提示",
      content: "确定退出？",
      cancelText: "取消",
      okText: "确认",
      onOk() {
        http.post("/admin/logout").then(() => {
          logout();
          history.replace("/");
        });
      }
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={showConfirm}>
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: "#fff" }}>
      <Icon
        className="trigger"
        type={props.collapsed ? "menu-unfold" : "menu-fold"}
        onClick={props.toggle}
      />
      <Dropdown overlay={menu}>
        <a
          className="ant-dropdown-link"
          href="javascript:;"
          style={{ float: "right" }}
        >
          <span>{props.currentUser.username}</span>
        </a>
      </Dropdown>
    </Header>
  );
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(ActionCreators.logoutSuccess()),
  dispatch
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(HeaderPage)
);
