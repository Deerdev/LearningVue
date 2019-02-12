// vue-loader的配置是一个func
module.exports = isDev => {
  return {
    // vue-loader的相关配置
    // 消除一行末尾空格
    preserveWhitepace: true,
    // 将vue文件中的css单独打包到文件中；
    // css是没有热重载的, 使用vue-style-loader是可以的，见webpack配置
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev
        ? "[path]-[name]-[hash:base64:5]"
        : "[hash:base64:5]",
      // 驼峰命名
      camelCase: true
    }
    // hotReload: false, // 关闭热重载 根据环境变量生成
  };
};
