const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    if (isProduction) {
      config
        .plugin('ignoreConsle')
        .use(UglifyJsPlugin, [
          {
            uglifyOptions: {
              output: {
                comments: false // 去掉注释
              },
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          }
        ])
        .end()
    }
  }
}
