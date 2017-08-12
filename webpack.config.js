const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/stylesheets/styles.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }],
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  devServer: {
    contentBase: "./dist"
  }
};
