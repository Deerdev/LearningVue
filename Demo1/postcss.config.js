// `postcss-loader`: 后处理css的， 优化编译出来的css代码
// `autoprefixer`: 处理css属性， 用于处理需要加浏览器前缀的属性， 比如 - webkit之类的

const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer()
    ]
}