const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  configureWebpack: {
    watchOptions: {
      poll: true,
    },
    devServer: {
      host: 'localhost',
      port: '8080',
    },
  },
})
