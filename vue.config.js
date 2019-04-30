module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW'
    // workboxOptions: {
    //   swSrc: 'src/service-worker.js'
    // }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
