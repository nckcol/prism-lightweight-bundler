module.exports = function () {
  return {
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-proposal-decorators')
    ],

    presets: [
      [
        require.resolve('@babel/preset-env'), {
          targets: {
            browsers: require('./browserslist.config')
          }
        }
      ]
    ],
  }
}