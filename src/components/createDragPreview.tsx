function createDragPreview(text?: any, style?: any, img?: any) {
  //这边是放表格行数据的，给了固定文字
  text = "拖拽信息";
  //新建img对象
  if (!img) img = new Image();

  let rectHeight = style.paddingTop + style.fontSize + style.paddingBottom;
  let rectStrokeWidth = 1;
  //创建canvas
  let c = document.createElement("canvas");
  c.height = rectHeight;
  let ctx = c.getContext("2d");
  ctx.font = style.fontSize + "px sans-serif";
  let textWidth = 150;
  let rectWidth = style.paddingLeft + textWidth + style.paddingRight;
  ctx.canvas.width =
    style.paddingLeft + textWidth + style.paddingRight + rectStrokeWidth * 2;
  ctx.font = style.fontSize + "px sans-serif";
  ctx.rect(0, 0, rectWidth, rectHeight);
  ctx.save();
  ctx.fillStyle = style.backgroundColor;
  ctx.strokeStyle = style.borderColor;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = style.color;
  //关键是这里，将表格的行数据传给canvas
  ctx.fillText(
    text,
    style.paddingLeft,
    style.paddingTop * 0.75 + style.fontSize
  );
  //将canvas转为base64形式的图片地址，并赋值给img
  img.src = c.toDataURL();
  return img;
}

export default createDragPreview;
