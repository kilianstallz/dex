module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateManifest',
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
  }
}
