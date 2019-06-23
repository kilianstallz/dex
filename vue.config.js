const WorkboxPlugin = require('workbox-webpack-plugin')
module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  transpileDependencies: ['vuex-module-decorators']
}
