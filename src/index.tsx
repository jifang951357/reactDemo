import * as React from "react";
import * as ReactDOM from "react-dom";
import LayoutContainer from "./main/LayoutContainer";

import { Provider } from "react-redux";
import store from "./main/redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./main/redux/history";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <LayoutContainer />
    </Router>
  </Provider>,
  document.getElementById("root")
);
