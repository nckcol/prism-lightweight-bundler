module.exports = function (paths) {
  return {
    resolve: {
      extensions: ['.js'],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                presets: [require.resolve('../babel-preset-prism.js')],
                compact: true
              }
            }
          ]
        },
      ],
    }
  }
}