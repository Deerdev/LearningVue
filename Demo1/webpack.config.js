const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 生成html并且将生成的js引入进去
const HTMLPlugin = require('html-webpack-plugin')

// 环境变量判断
const isDev = process.env.NODE_ENV === 'development'

var config = {
    // 浏览器运行
    target: 'web',
    // 入口文件
    entry: path.join(__dirname, 'src/index.js'),
    // 输出文件 全部打包出来到bundle.js
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            // 告诉webpack 处理.vue文件时，使用哪个loader来解析
            // 正则 .vue结尾的文件 \.vue$ (\转义字符)
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            // css-loader 从css中读取内容，style-loader 将css内容插入到html中
            // 数组形式：多个loader共同处理
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [{
                // url-loader 读取图片 转成base64，直接加载到html中
                // url-loader 依赖file-loader
                // 这种形式是对url-loader配置一些参数
                loader: 'url-loader',
                options: {
                    // 文件大小 小于1024，转义成base64
                    limit: 1024,
                    // name: 文件名；ext：文件后缀
                    name: '[name]-aaa.[ext]'
                }
            }]
        }, {
            // css预处理器 stylus sass等等
            test: /\.styl$/,
            use: ['style-loader', 'css-loader', 'stylus-loader']
        }]
    },
    plugins: [
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
}

if (isDev) {
    // 打包完的代码比较复杂，配置后可以查看自己写的源码
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
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
        // 对于单页应用，将无法识别的地址，映射到首页？
        // historyFallback: {}
    }
    config.plugins.push(
        // 支持hot加载的 插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}


module.exports = config