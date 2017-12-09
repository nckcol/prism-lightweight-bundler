module.exports = function () {
  return {
    resolve: {
      extensions: ['.js'],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
      ],
    }
  }
}