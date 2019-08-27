import * as React from "react";
import { DropTarget, DragSource } from "react-dnd";
import Internal from "./Internal";

const style = {
  width: "90%",
  margin: "15px",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal"
};

interface Props {
  itemList: any;
  handleDND: Function;
}

class Dustbin extends React.Component<Props> {
  public render() {
    const { canDrop, isOver, connectDropTarget, itemList } = this.props;
    const isActive = canDrop && isOver;

    let border = "1px solid #000";
    // 拖拽组件此时正处于 drag target 区域时，
    if (isActive) {
      border = "1px solid #ff0000";
    }
    // 当前组件可以放置 drag source 时，
    else if (canDrop) {
      border = "1px solid #000";
    }

    // 使用 connectDropTarget 包裹住 DOM 节点，使其可以接收对应的 drag source 组件
    // connectDropTarget 包裹住的 DOM 节点才能接收 drag source 组件
    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ ...style, border }}>
          {isActive ? "Release to drop" : "Drag a box here"}
          {itemList.map((item, index) => {
            return (
              <Internal index={index} handleDND={this.props.handleDND}>
                {item}
              </Internal>
            );
          })}
        </div>
      )
    );
  }
}

const Types = {
  box: "box"
};

const boxTarget = {
  // 当有对应的 drag source 放在当前组件区域时，会返回一个对象，可以在 monitor.getDropResult() 中获取到
  drop: (props, monitor, component) => {
    if (monitor.didDrop()) {
      return;
    }
    let dragIndex = monitor.getItem().newIndex; //拖拽目标的Index
    if (dragIndex === -1) {
      monitor.getItem().addBox(monitor.getItem().Html, 0);
    }
    return { name: "Dustbin" };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

export default DropTarget(Types.box, boxTarget, collect)(Dustbin);
