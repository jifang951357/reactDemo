module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader"
      },
      {
        test: /\.(css|scss)/,
        use: [
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
        // 加载时顺序从右向左
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  }
};
