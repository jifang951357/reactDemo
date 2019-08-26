import * as React from "react";
import { DragSource } from "react-dnd";
import { createDragPreview } from "react-dnd-text-dragpreview";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};

const dragPreviewStyle = {
  backgroundColor: "rgb(68, 67, 67)",
  borderColor: "#F96816",
  color: "white",
  fontSize: 15,
  paddingTop: 4,
  paddingRight: 7,
  paddingBottom: 6,
  paddingLeft: 7
};

class Box extends React.Component {
  public dragPreview;

  componentDidMount() {
    // handles first time dragPreview setup
    this.dragPreview = createDragPreview(
      formatDragMessage(this.props.numRows),
      dragPreviewStyle
    );
    this.props.connectDragPreview(this.dragPreview);
  }
  componentDidUpdate(prevProps) {
    // handles updates to the dragPreview image as the dynamic numRows value changes
    this.dragPreview = createDragPreview(
      formatDragMessage(this.props.numRows),
      dragPreviewStyle,
      this.dragPreview
    );
  }

  // 使用 connectDragSource 包裹住 DOM 节点，使其可以接受各种拖动 API
  // connectDragSource 包裹住的 DOM 节点才可以被拖动
  public render() {
    const { isDragging, connectDragSource } = this.props;
    const { name, Html } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return (
      connectDragSource &&
      connectDragSource(
        <>
          <div style={{ ...style, opacity }}>{name}</div>
        </>
      )
    );
  }
}

const Types = {
  box: "box"
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

const boxSource = {
  /**
   * 开始拖拽时触发当前函数
   * @param {*} props 组件的 props
   */
  beginDrag(props, monitor, component) {
    // 返回的对象可以在 monitor.getItem() 中获取到
    return {
      name: props.name,
      Html: props.Html,
      newIndex: -1,
      addBox: props.addBox
    };
  }
};

export default DragSource(Types.box, boxSource, collectSource)(Box);
