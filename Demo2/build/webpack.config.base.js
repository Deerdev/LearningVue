// 存放webpack的基本配置 开发 生产 服务端渲染

const path = require("path");
const webpack = require("webpack");
// 加载vue-loader的options
const createVueLoaderOptions = require("./vue-loader.config");

// 环境变量判断
const isDev = process.env.NODE_ENV === "development";

var config = {
  // 浏览器运行
  target: "web",
  // 入口文件
  entry: path.join(__dirname, "../client/index.js"),
  // 输出文件 全部打包出来到bundle.js
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: "eslint-loader",
        // 去除文件夹（不检测）
        exclude: /node_modules/,
        // 使用真正的loader加载文件之前，先使用eslint检测一下vue|js|jsx文件
        enforce: "pre"
      },
      {
        // 告诉webpack 处理.vue文件时，使用哪个loader来解析
        // 正则 .vue结尾的文件 \.vue$ (\转义字符)
        test: /\.vue$/,
        loader: "vue-loader",
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.css$/,
        // css-loader 从css中读取内容，style-loader 将css内容插入到html中
        // 数组形式：多个loader共同处理
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            // url-loader 读取图片 转成base64，直接加载到html中
            // url-loader 依赖file-loader
            // 这种形式是对url-loader配置一些参数
            loader: "url-loader",
            options: {
              // 文件大小 小于1024，转义成base64
              limit: 1024,
              // name: 文件名；ext：文件后缀
              // 美化生成目录
              name: "resources/[path][name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = config;
