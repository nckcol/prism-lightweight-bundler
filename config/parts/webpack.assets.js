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
                    fileLoader('assets/images')
                  ]
                },
                {
                  resourceQuery: /inline/,
                  use: [
                    urlLoader('image/jpeg')
                  ]
                }
              ]
            },
            {
              test: /\.png$/,
              oneOf: [
                {
                  use: [
                    fileLoader('assets/images')
                  ]
                },
                {
                  resourceQuery: /inline/,
                  use: [
                    urlLoader('image/png')
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