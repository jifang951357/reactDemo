import * as React from "react";
import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Input, Button, Radio } from "antd";
import update from "immutability-helper";

import Dustbin from "../../components/Dustbin";
import Box from "../../components/Box";

function Demo(props) {
  const [itemList, setItemList] = useState<any[]>([]);

  const addBox = (item: any, index: number) => {
    let newItemList = [...itemList];

    if (newItemList.length > 0) {
      if (index === 0) {
        newItemList.unshift(item);
      } else {
        newItemList.splice(index, 0, item);
      }
    } else {
      newItemList.push(item);
    }

    setItemList(newItemList);
  };

  const handleDND = (dragIndex, hoverIndex) => {
    let newitemList = itemList;
    let tmp = newitemList[dragIndex]; //临时储存文件
    newitemList.splice(dragIndex, 1); //移除拖拽项
    newitemList.splice(hoverIndex, 0, tmp); //插入放置项
    setItemList(newitemList);
  };

  const deleteDND = index => {
    let newitemList = itemList;
    newitemList.splice(index, 1);
    setItemList([...newitemList]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <Box
            name="Input"
            index={0}
            addBox={addBox}
            Html={<Input placeholder="Basic usage" />}
          />
          <Box
            name="Button"
            index={0}
            addBox={addBox}
            Html={<Button type="primary">Primary</Button>}
          />
          <Box
            name="Radio"
            index={0}
            addBox={addBox}
            Html={
              <Radio.Group>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
              </Radio.Group>
            }
          />
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <Dustbin
            itemList={itemList}
            deleteDND={deleteDND}
            handleDND={handleDND}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default Demo;
