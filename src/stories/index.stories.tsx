import * as React from "react";
import { storiesOf } from "@storybook/react";
import DemoButton from "../components/DemoButton";
import "antd/dist/antd.css";

storiesOf("Button", module).add("组件", () => <DemoButton />);
