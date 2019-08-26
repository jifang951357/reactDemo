import * as React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Tooltip
} from "antd";
import { connect } from "react-redux";
import { ActionCreators } from "./actions";
import http from "@sinoui/http";
import { withRouter } from "react-router-dom";
import "./css/Login.css";
import logo from "./images/logo.png";
const { Title } = Typography;

interface VerficationcodeResult {
  imgsrc: string;
  tokenCode: string;
}

interface State {
  isLoginPage: boolean;
  verficationcodeImgSrc: string;
}
class NormalLoginForm extends React.PureComponent<Props, State> {
  private tokenCode = "";
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoginPage: true,
      verficationcodeImgSrc:
        "http://s1.sinaimg.cn/bmiddle/003bsgbmgy6R6ekxkl2e0"
    };
  }

  public componentDidMount() {
    this.onChangeVerficationcode();
  }

  public onChangeVerficationcode = () => {
    http
      .get("/admin/validata/changeValidata", {
        params: {
          tokenCode: this.tokenCode
        }
      })
      .then((result: VerficationcodeResult) => {
        if (result) {
          this.setState({
            verficationcodeImgSrc: result.imgsrc
          });
          this.tokenCode = result.tokenCode;
        }
      });
  };

  // 跳转到登录页
  public goLogin = e => {
    this.setState({ isLoginPage: true });
  };

  public handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        http
          .post("/admin/login", {
            ...values,
            tokenCode: this.tokenCode
          })
          .then(result => {
            if (result && result.status == "success") {
              message.success("登录成功！");
              this.props.dispatch(
                ActionCreators.loginSuccess(result.data.user)
              );
            } else {
              message.success(`${result.message}`);
            }
          })
          .catch(e => {
            if (e.response && e.response.data) {
              message.error(e.response.data.message);
            }
          });
      }
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { verficationcodeImgSrc, isLoginPage } = this.state;
    return (
      <div className="layout">
        <div className="loginLayout">
          <div>
            <Title
              style={{
                fontSize: "33px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <img src={logo} width="40" style={{ marginRight: "10px" }} />
              xxx
            </Title>
            <p style={{ marginBottom: "40px", color: "rgba(0,0,0,.45)" }}>
              xxxxxxxxxxxxxxxx
            </p>
          </div>

          {isLoginPage === true ? (
            <div className="loginContainer">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "请输入用户名!" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="用户名"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "请输入密码!" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="密码"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("verficationcode", {
                    rules: [{ required: true, message: "请输入验证码!" }]
                  })(
                    <Input
                      placeholder="验证码"
                      addonAfter={
                        verficationcodeImgSrc && (
                          <Tooltip placement="top" title="点击重新获取验证码">
                            <img
                              height="29"
                              style={{
                                height: "29px",
                                cursor: "pointer"
                              }}
                              onClick={this.onChangeVerficationcode}
                              src={`data:image/png;base64,${verficationcodeImgSrc}`}
                            />
                          </Tooltip>
                        )
                      }
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                    >
                      登录
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div className="registerContainer" />
          )}
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

const mapDispatchToProps = (dispatch: any) => ({
  dispatch
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(WrappedNormalLoginForm)
);
