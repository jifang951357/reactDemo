webpack //对项目进行打包
webpack --config XXX.js //使用另一个 js 启动 默认启动 webpack.config.js
webpack --watch // 自动监控文件的改变
webpack --progress //显示进度条
webpack --display-modules //打包时显示隐藏的模块
webpack--display-chunks //打包时显示 chunks
webpack --display-error-details //显示详细错误信息
webpack -w #提供 watch 方法，实时进行打包更新
webpack -p #对打包后的文件进行压缩
webpack -d #提供 SourceMaps，方便调试
webpack --colors #输出结果带彩色，比如：会用红色显示耗时较长的步骤
webpack --profile #输出性能数据，可以看到每一步的耗时
