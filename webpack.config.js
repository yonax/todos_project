const OPTS = {
  ROOT: __dirname
};

const makeConfig =
  process.env.NODE_ENV  === 'production' ?
    require('./config/webpack.production.config.js') :
    require('./config/webpack.dev.config.js');

module.exports = makeConfig(OPTS)
