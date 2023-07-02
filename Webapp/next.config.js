module.exports = {
    output: 'export',
    distDir: 'build',
    trailingSlash: true,
    webpack: (config, options) => {
        config.module.rules.push({
          test: /\.(gltf)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/models/',
              outputPath: 'static/models/',
              name: '[name].[hash].[ext]',
            },
          },
        })
      return config
    }
}