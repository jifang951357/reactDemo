import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./router";
import NavMenu from "./NavMenu";
import HeaderPage from "./HeaderPage";
import { Layout } from "antd";

const { Header, Content } = Layout;

interface Props {
  currentUser: any;
}

function LayoutPage(props: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout>
        <NavMenu collapsed={collapsed} />

        <Layout>
          <HeaderPage
            collapsed={collapsed}
            toggle={toggle}
            currentUser={props.currentUser}
          />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
              height: "85vh"
            }}
          >
            <Switch>
              {routes.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  component={item.component}
                />
              ))}
              {/*path为空用来匹配任意路由 */}
              <Route
                component={() => (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    请等待, 页面正在建设中...
                  </div>
                )}
              />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default LayoutPage;
