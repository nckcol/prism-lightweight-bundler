module.exports = function assetsConfig (paths) {
  return {
    module: {
      rules: [
        {
          oneOf: [
            /* load images */
            {
              test: /\.jpe?g$/,
              oneOf: [
                {
                  use: [
                    fileLoader('assets/images'),
                    imageWebpackLoader()
                  ]
                },
                {
                  resourceQuery: /inline/,
                  use: [
                    urlLoader('image/jpeg'),
                    imageWebpackLoader()
                  ]
                }
              ]
            },
            {
              test: /\.png$/,
              oneOf: [
                {
                  use: [
                    fileLoader('assets/images'),
                    imageWebpackLoader()
                  ]
                },
                {
                  resourceQuery: /inline/,
                  use: [
                    urlLoader('image/png'),
                    imageWebpackLoader()
                  ]
                }
              ],
            },

            /* Load icons */
            {
              test: /\.svg$/,
              use: [
                fileLoader('assets/icons'),
                {
                  loader: require.resolve('svgo-loader'),
                  options: {
                    plugins: [
                      {
                        removeTitle: true
                      },
                      {
                        convertColors: {
                          shorthex: false
                        }
                      },
                      {
                        convertPathData: false
                      }
                    ]
                  }
                }
              ]
            },

            /* load fonts */
            {
              test: /\.(woff2?|ttf|otf)$/,
              use: [
                fileLoader('assets/fonts')
              ]
            },

            /* Ensure all assets exports into build folder */
            {
              exclude: [
                /\.(jsx?|mjs)$/,
                /\.html$/,
                /\.json$/,
                /\.p?css$/
              ],
              use: [
                fileLoader('assets/other')
              ]
            },
          ]
        }
      ]
    }
  }
}

function imageWebpackLoader() {
  return {
    loader: require.resolve('image-webpack-loader'),
    options: {
      gifsicle: {
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      mozjpeg: {
        progressive: true,
        quality: 65
      },
      // Specifying webp here will create a WEBP version of your JPG/PNG images
      webp: {
        quality: 75
      }
    }
  }

}

function fileLoader(path) {
  return {
    loader: require.resolve('file-loader'),
    options: {
      name: path + '/[name].[ext]?[hash:6]',
      publicPath: ''
    }
  }
}
  
function urlLoader(mimetype) {
  return {
    loader: require.resolve('url-loader'),
    options: {
      mimetype: mimetype
    }
  }
}