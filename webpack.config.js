// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin"); //自动创建html文件
// const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //清除多余文件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// module.exports = {
//   devtool: "cheap-module-eval-source-map", // 用于开发调试，方便清楚是那个文件出错 (共有7种)
//   entry: {
//     index: "./src/index.js"
//   },
//   output: {
//     path: path.resolve(__dirname, "build"),
//     publicPath: "/",
//     filename: "js/[name]-[hash]" + ".js",
//     chunkFilename: "js/[name]-[hash]" + ".js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: "style-loader!css-loader"
//       },
//       {
//         test: /\.scss/,
//         use: [
//           {
//             loader: "style-loader"
//           },
//           {
//             loader: "css-loader"
//           },
//           {
//             loader: "sass-loader"
//           }
//         ]
//         // 加载时顺序从右向左
//       },
//       {
//         test: /\.scss$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: "css-loader"
//             },
//             {
//               loader: "sass-loader"
//             }
//           ],
//           fallback: "style-loader"
//         })
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: ["file-loader"]
//       },
//       {
//         test: /\.(js|jsx|tsx)$/,
//         loader: "babel-loader",
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//         loader: "url-loader",
//         options: {
//           limit: 10000,
//           name: "static/img/[name].[hash:7].[ext]"
//         }
//       },
//       {
//         test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
//         loader: "url-loader",
//         options: {
//           limit: 10000,
//           name: "static/media/[name].[hash:7].[ext]"
//         }
//       },
//       {
//         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//         loader: "url-loader",
//         options: {
//           limit: 10000,
//           name: "static/fonts/[name].[hash:7].[ext]"
//         }
//       }
//     ]
//   },
//   // 开启一个虚拟服务器
//   devServer: {
//     contentBase: "./build",
//     hot: true
//   },
//   plugins: [
//     new CleanWebpackPlugin(), //每次编译都会把build下的文件清除，我们可以在合适的时候打开这行代码，例如我们打包的时候，开发过程中这段代码关闭比较好
//     new webpack.HotModuleReplacementPlugin(), // 模块热替换
//     new ExtractTextPlugin({
//       filename: "css/[name]-[hash].css",
//       allChunks: true // 当为true时打包全部css文件，当为false不打包css文件
//     }),
//     new HtmlWebpackPlugin({
//       template: "src/index.html", //使用一个模板
//       favicon: "public/icon-live.png" // 添加icon
//     })
//   ]
// };

/**
 * @desc Webpack配置入口
 * @author codingplayboy
 */
module.exports = function(enviroment) {
  let env;
  let _DEV_ = true;
  let _PROD_ = false;

  switch (enviroment) {
    case "dev":
      env = "dev";
      _DEV_ = true;
      _PROD_ = false;
      break;
    case "production":
      env = "prod";
      _DEV_ = false;
      _PROD_ = true;
      break;
    default:
      env = "dev";
      _DEV_ = true;
      _PROD_ = false;
  }

  // 根据环境参数动态决定引入对应配置文件
  return require(`./webpack/${env}.config.js`)({
    ROOTPATH: __dirname,
    _DEV_,
    _PROD_
  });
};
