var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = (opts) => {
  const ROOT = opts.ROOT;
  return {
    devtool: 'hidden-source-map',
    entry: [
      path.join(ROOT, 'front', 'src', 'index')
    ],
    output: {
      path: path.join(ROOT, 'front', 'bundles'),
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    plugins: [
      new BundleTracker({
        path: ROOT, filename: 'webpack-stats.json'
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
        sourceMap: false,
      }),
      new webpack.optimize.DedupePlugin(),
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loader: ['babel'],
        exclude: /node_modules/,
        include: path.join(ROOT, 'front', 'src')
      }]
    }
  };
};
