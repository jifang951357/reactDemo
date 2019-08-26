import * as React from "react";
import Login from "@auth/user";
import LayoutPage from "./router/LayoutPage";
import http from "@sinoui/http";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ActionCreators } from "@auth/user";
import User from "./UserType";
import { History } from "history";
export interface LayoutPageProps {
  currentUser: User;
  isLoggined: boolean;
  onLogout: () => void;
  onRequestFresh: (item1: object, item2?: string) => void;
  history: History;
}

export interface LayoutPageState {
  refreshing: boolean;
}

class LayoutContainer extends React.Component<
  LayoutPageProps,
  LayoutPageState
> {
  private props: LayoutPageProps;
  private state: LayoutPageState;
  constructor(props: LayoutPageProps) {
    super(props);
    this.state = {
      refreshing: true
    };
  }

  public componentDidMount() {
    http.interceptors.response.use(undefined, error => {
      if (error.response && error.response.status === 401) {
        // message.error('您的会话已失效,请重新登录！');
        // 跳转到登录页
        this.props.history.replace("/");
        this.props.onLogout();
      } else if (error.response && error.response.status === 403) {
        this.props.history.push("/tip");
        // message.error('无权限访问此页面！');
      }

      this.setState({
        refreshing: false
      });

      throw error;
    });

    // tslint:disable-next-line:no-any
    http.get("/admin/check").then((result: any) => {
      this.setState({
        refreshing: false
      });
      if (result && result.data && result.data.user) {
        this.props.onRequestFresh(result.data.user);
      }
    });
  }

  public renderChildren() {
    const { currentUser } = this.props;
    if (this.props.isLoggined) {
      return <LayoutPage currentUser={currentUser} />;
    } else if (this.state.refreshing) {
      return <div />;
    }
    return (
      <>
        <Login />
      </>
    );
  }

  public render() {
    return this.renderChildren();
  }
}

// tslint:disable-next-line:no-any
const mapStateToProps = (state: any) => ({
  isLoggined: state.auth.loginStatus === "LOGIN_SUCCESS",
  currentUser: state.auth.currentUser
});

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: any) => ({
  // tslint:disable-next-line:no-any
  onRequestFresh: (user: any) => dispatch(ActionCreators.loginSuccess(user)),
  onLogout: () => dispatch(ActionCreators.logoutSuccess())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LayoutContainer)
);
