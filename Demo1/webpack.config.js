const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 将非javascript文件单独打包的工具
// const ExtractPlugin = require('extract-text-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
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
        filename: 'bundle.[hash:8].js',
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
            test: /\.jsx$/,
            loader: 'babel-loader'
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

// 测试环境中
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
    // 添加新的module
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'less-loader'
        ]
    }, {
        // css预处理器 stylus sass等等
        test: /\.styl$/,
        use: [
            'style-loader',
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
    }, )
} else {

    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        // 区分打包类库代码，将类库抽出去
        // 打包第三方框架vue vue-router vuex
        vendor: ['vue']
    }
    // 生产环境使用 chunkhash
    // chunkhash 是针对每一块单独生成的hash，这样只用修改单独的模块，而不会影响vendor的模块（vendor的hash不变）
    config.output.filename = '[name].[chunkhash:8].js'

    config.module.rules.push({
        test: /\.less$/,
        use: [
            miniCssExtractPlugin.loader,
            "css-loader",
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
    }, {
        // css预处理器 stylus sass等等
        test: /\.styl$/,
        use: [
            miniCssExtractPlugin.loader,
            "css-loader", {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    config.plugins.push(
        // 生成的css文件名称，[contenthash:8] 根据内容做hash
        // new ExtractPlugin('styles.[contenthash:8].css'),
        new miniCssExtractPlugin({
            filename: 'styles.[contenthash:8].css'
        }),


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

    )

    // webpack4 改变
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}


module.exports = config