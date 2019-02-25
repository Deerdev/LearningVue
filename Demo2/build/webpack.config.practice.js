const path = require("path");
const webpack = require("webpack");
// merge合并webpack的config配置
const merge = require("webpack-merge");
// 读取base的配置
const baseConfig = require("./webpack.config.base");

const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 将非javascript文件单独打包的工具
// const ExtractPlugin = require('extract-text-webpack-plugin')
const miniCssExtractPlugin = require("mini-css-extract-plugin");
// 生成html并且将生成的js引入进去
const HTMLPlugin = require("html-webpack-plugin");

// 环境变量判断
const isDev = process.env.NODE_ENV === "development";

// 服务端渲染时，不需要这些plugin，所以放在client里
const defaultPluins = [
  // webpack根据 process.env，自己进行不同的打包
  // 外界也可以调用 process.env 判断开发环境
  new webpack.DefinePlugin({
    "process.env": {
      // 注意 双引号 "development"
      NODE_ENV: "development"
    }
  }),
  new VueLoaderPlugin(),
  // 加载插件, 练习模式 使用template.html 作为模板
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
];

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}

let config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  mode: "development",
  // 打包完的代码比较复杂，配置后可以查看自己写的源码(webpack4 中 可以去掉)
  devtool: "#cheap-module-eval-source-map",
  devServer,
  // import Vue from 'vue', 练习语法时 使用该版本vue
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          "less-loader"
        ]
      },
      {
        // css预处理器 stylus sass等等
        test: /\.styl$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              // 复用前面loader生成的sourceMap，提升postcss-loader编译速度
              sourceMap: true
            }
          },
          "stylus-loader"
        ]
      }
    ]
  },
  plugins: defaultPluins.concat([
    // 支持hot加载的 插件
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin() // webpack4 中去除
  ])
});
module.exports = config;
