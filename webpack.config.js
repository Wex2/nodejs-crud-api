const { resolve } = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: resolve(__dirname, "dist"),
  },
};
