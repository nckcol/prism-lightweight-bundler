const ExtractTextPlugin = require('extract-text-webpack-plugin')

const externalCss = new ExtractTextPlugin('index.css')

module.exports = function styleConfig (paths) {
  return {
    module: {
      rules: [
        /* load PostCSS specific synthax */
        {
          test: /\.pcss$/,
          oneOf: [
            {
              use: externalCss.extract({
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    sourceMap: true
                  }
                },
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      sourceMap: true
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      sourceMap: true,
                      config: {
                        path: require.resolve('../postcss.config.js'),
                        ctx: {
                          sugared: true // enables PostCSS specific synthax 
                        }
                      }
                    }
                  }
                ]
              })
            }
          ],
        },

        /* load CSS */
        {
          test: /\.css$/,
          oneOf: [
            {
              use: externalCss.extract({
                fallback: require.resolve('style-loader'),
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                      sourceMap: true
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      sourceMap: true,
                      config: {
                        path: require.resolve('../postcss.config.js'),
                      }
                    }
                  }
                ]
              })
            }
          ],
        }
      ]
    },

    plugins: [
      externalCss
    ]
  }
}
