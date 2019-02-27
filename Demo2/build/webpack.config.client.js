const path = require('path')
const webpack = require('webpack')
// merge合并webpack的config配置
const merge = require('webpack-merge')
// 读取base的配置
const baseConfig = require('./webpack.config.base')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 将非javascript文件单独打包的工具
// const ExtractPlugin = require('extract-text-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// 生成html并且将生成的js引入进去
const HTMLPlugin = require('html-webpack-plugin')

// 环境变量判断
const isDev = process.env.NODE_ENV === 'development';

// 服务端渲染时，不需要这些plugin，所以放在client里
const defaultPluins = [
  // webpack根据 process.env，自己进行不同的打包
  // 外界也可以调用 process.env 判断开发环境
  new webpack.DefinePlugin({
    'process.env': {
      // 注意 双引号 "development"
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  // 加载插件
  new HTMLPlugin()
]

let config
// 测试环境中
if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    // 打包完的代码比较复杂，配置后可以查看自己写的源码(webpack4 中 可以去掉)
    devtool: '#cheap-module-eval-source-map',
    devServer: {
      port: 8000,
      host: '0.0.0.0',
      // 错误显示到网页上
      overlay: {
        errors: true
      },
      // 热刷新，只刷新修改的组件
      hot: true,
      // 每次编译时 都自动打开浏览器
      // open: true
      // 对于单页应用，将无法识别的地址，映射到首页(output导出的首页index.html)？
      // 如果output中设置了 public: '/public' 字段，指定了路径，则此处也要指定这个路径'/public/index.html'
      // historyFallback: {}
      historyApiFallback: {
        index: '/index.html'
      }
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        },
        {
          // css预处理器 stylus sass等等
          test: /\.styl$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // 复用前面loader生成的sourceMap，提升postcss-loader编译速度
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPluins.concat([
      // 支持hot加载的 插件
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin() // webpack4 中去除
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 区分打包类库代码，将类库抽出去
      // 打包第三方框架vue vue-router vuex
      vendor: ['vue']
    },
    output: {
      // 生产环境使用 chunkhash
      // chunkhash 是针对每一块单独生成的hash，这样只用修改单独的模块，而不会影响vendor的模块（vendor的hash不变）
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
          // use: ExtractPlugin.extract({
          //     fallback: 'style-loader',
          //     use: [
          //         'css-loader',
          //         {
          //             loader: 'postcss-loader',
          //             options: {
          //                 sourceMap: true
          //             }
          //         },
          //         'less-loader'
          //     ]
          // })
        },
        {
          // css预处理器 stylus sass等等
          test: /\.styl$/,
          use: [
            miniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPluins.concat([
      // 生成的css文件名称，[contenthash:8] 根据内容做hash
      // new ExtractPlugin('styles.[contenthash:8].css'),
      new miniCssExtractPlugin({
        filename: 'styles.[contenthash:8].css'
      })

      // webpack.optimize.CommonsChunkPlugin: 单独打包第三方类库代码
      // 打包vendor代码
      // 与runtime顺序不可换
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor'
      // }),
      // 把webpack相关的代码，打包到单独的文件中
      // webpack给每一个模块加一个id
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'runtime'
      // })
    ]),

    // webpack4 改变(默认会把代码全部打包到vender里去)
    optimization: {
      splitChunks: {
        // 默认会把代码全部打包到vender里去
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: 2
          }
        }
      },
      runtimeChunk: true
    }
  })
}

module.exports = config
