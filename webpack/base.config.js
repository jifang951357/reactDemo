/**
 * [webpack基础配置]
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除多余文件

module.exports = function(options) {
  const PUBLICPATH = options.publicPath || "/";
  const ROOTPATH = options.ROOTPATH;

  return {
    devtool: "cheap-module-eval-source-map", // 用于开发调试，方便清楚是那个文件出错 (共有7种) devtool文件夹详细说明
    entry: {
      index: path.resolve(ROOTPATH, "src/index.tsx") // 入口文件可以是多个入口
    },
    output: {
      path: path.resolve(ROOTPATH, "build"), // 输出目录
      publicPath: PUBLICPATH, // 指定资源文件引用的目录
      filename: "js/[name]-[hash]" + ".js", // 输出js文件名
      chunkFilename: "js/[name]-[hash]" + ".js" // 输出按需加载的第三方组件
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          rules: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.(css|scss)/,
          use: options.loaders.styles
          // 加载时顺序从右向左
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader?presets[]=react,presets[]=es2015",
          exclude: /node_modules/,
          query: {
            presets: ["react", "es2015"]
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "static/img/[name].[hash:7].[ext]"
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "static/media/[name].[hash:7].[ext]"
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "static/fonts/[name].[hash:7].[ext]"
          }
        }
      ]
    },
    resolve: {
      modules: ["node_modules/"],
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: (options.beforePlugins || []).concat([
      new CleanWebpackPlugin(), //每次编译都会把build下的文件清除
      new webpack.DefinePlugin(options.globals),
      // 抽取js同时与ExtractTextPlugin搭配为公共块（common chunk）抽取样式文件
      new HtmlWebpackPlugin({
        template: "src/index.html", //使用一个模板
        favicon: "public/icon-live.png" // 添加icon
      })
    ])
  };
};
