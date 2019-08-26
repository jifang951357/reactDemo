import * as React from "react";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash.flow";
import { findDOMNode } from "react-dom";

class Internal extends React.Component {
  public render() {
    const { connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div style={{ display: "block", margin: "10px" }}>
          {this.props.children}
        </div>
      )
    );
  }
}

const Types = {
  box: "box"
};
const boxSource = {
  beginDrag(props, monitor, component) {
    return {
      index: props.index
    };
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

const boxTarget = {
  // 当有对应的 drag source 放在当前组件区域时，会返回一个对象，可以在 monitor.getDropResult() 中获取到
  drop: (props, monitor, component) => {
    if (props.index !== undefined) {
      monitor.getItem().addBox(monitor.getItem().Html, props.index);
    }
    return { name: "Dustbin" };
  },
  hover: (props, monitor, component) => {
    //组件在target上方时触发的事件
    if (!component) return null;
    const dragIndex = monitor.getItem().index; //拖拽目标的Index
    const hoverIndex = props.index; //目标Index
    if (dragIndex === props.lastIndex || hoverIndex === props.lastIndex)
      return null;
    if (dragIndex === hoverIndex) {
      return null;
    }
    props.handleDND(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

export default flow(
  DragSource(Types.box, boxSource, collectSource),
  DropTarget(Types.box, boxTarget, collectTarget)
)(Internal);
