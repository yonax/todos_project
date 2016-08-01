var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = (opts) => {
  const ROOT = opts.ROOT;
  return {
    devtool: 'eval',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/only-dev-server',
      path.join(ROOT, 'front', 'src', 'index')
    ],
    output: {
      path: path.join(ROOT, 'front', 'bundles'),
      filename: 'bundle.js',
      publicPath: 'http://localhost:3000/static/bundles/'
    },
    plugins: [
      new BundleTracker({
        path: ROOT, filename: 'webpack-stats.json'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: ['babel'],
        exclude: /node_modules/,
        include: path.join(ROOT, 'front', 'src')
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }]
    }
  }
}
