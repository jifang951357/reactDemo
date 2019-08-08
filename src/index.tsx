import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
function App() {
  return (
    <div>
      <p>Hello World</p>
      <Button type="primary" onClick={() => alert("你点击了按钮")}>
        按钮
      </Button>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
