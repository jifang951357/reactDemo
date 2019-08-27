/**
 * [webpack开发模式配置]
 */
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ENV = process.env.NODE_ENV || "prod";
const PUBLICPATH = "/";

// 拓展配置
const options = {
  publicPath: PUBLICPATH,
  loaders: {
    styles: ExtractTextPlugin.extract({
      use: [
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }
      ],
      fallback: "style-loader"
    })
  },
  globals: {
    "process.env": {
      NODE_ENV: JSON.stringify(ENV)
    },
    __DEV__: ENV === "dev",
    __PROD__: ENV === "prod",
    __TEST__: ENV === "test"
  }
};

module.exports = function(prodConfig) {
  options.ROOTPATH = prodConfig.ROOTPATH;
  options.env = prodConfig.env;

  const babelOptions = {
    presets: [
      [
        "env",
        {
          targets: {
            browsers: ["last 2 versions", "safari >= 7"]
          }
        }
      ]
    ]
  };

  return webpackMerge(require("./base.config")(options), {
    mode: "production",
    plugins: [
      new ExtractTextPlugin({
        filename: "css/[name]-[hash].css"
      })
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()],
      removeEmptyChunks: false
    }
  });
};
