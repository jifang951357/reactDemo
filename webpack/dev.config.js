/**
 * [webpack开发模式配置]
 */

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
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
    devtool: "source-map", // 开发模式设置为原始源代码，方便调试
    devServer: {
      contentBase: path.join(devConfig.ROOTPATH, "./src"),
      hot: true, //开启热部署块
      port: PORT, //设置访问端口
      proxy: {
        // 设置请求代理
        "/": {
          bypass: function(req, res, proxyOptions) {
            console.log("Skipping proxy for browser request.");
            return `${PUBLICPATH}index.html`;
          }
        }
      }
    },
    plugins: []
  });
};
