import * as React from "react";
import { Button } from "antd";

function DemoButton() {
  return (
    <div>
      <p>Hello World</p>
      <Button type="primary" onClick={() => alert("你点击了按钮")}>
        按钮
      </Button>
    </div>
  );
}

export default DemoButton;
