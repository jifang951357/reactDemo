/**
 * [webpack开发模式配置]
 */

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const setProxy = require("./setProxy");
const PUBLICPATH = "/";
const PORT = "9090";
const ENV = process.env.NODE_ENV || "dev";

const options = {
  publicPath: PUBLICPATH,
  loaders: {
    styles: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "sass-loader"
      }
    ]
  },
  globals: {
    "process.env": {
      NODE_ENV: JSON.stringify(ENV)
    },
    __DEV__: ENV === "dev",
    __PROD__: ENV === "prod",
    __TEST__: ENV === "test"
  },
  beforePlugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = function(devConfig) {
  options.ROOTPATH = devConfig.ROOTPATH;
  options.env = devConfig.env;

  return webpackMerge(require("./base.config")(options), {
    mode: "development",
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高，默认为 300ms
      aggregateTimeout: 300,
      // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的,默认每秒轮询1000次
      poll: 1000
    },
    devtool: "source-map", // 开发模式设置为原始源代码，方便调试
    devServer: {
      contentBase: path.join(devConfig.ROOTPATH, "./src"),
      port: PORT, //设置访问端口
      inline: true,
      watchContentBase: true,
      historyApiFallback: true,
      proxy: setProxy
    },
    plugins: []
  });
};
