const path = require('path');

const dotenv = require('dotenv');
const webpack = require('webpack');
const merge = require('webpack-merge');

dotenv.config();

module.exports = merge({
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, '..', 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /packages\/node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      WEBEX_LOG_LEVEL: 'log',
      DEBUG: '',
      NODE_ENV: process.env.NODE_ENV || 'development',
      WEBEX_ACCESS_TOKEN: process.env.WEBEX_ACCESS_TOKEN,
      // The follow environment variables are specific to our continuous
      // integration process and should not be used in general
      // Also, yes, CONVERSATION_SERVICE does not end in URL
      CONVERSATION_SERVICE: process.env.CONVERSATION_SERVICE || process.env.CONVERSATION_SERVICE_URL || 'https://conv-a.wbx2.com/conversation/api/v1',
      U2C_SERVICE_URL: process.env.U2C_SERVICE_URL || 'https://u2c.wbx2.com/u2c/api/v1',
      WDM_SERVICE_URL: process.env.WDM_SERVICE_URL || 'https://wdm-a.wbx2.com/wdm/api/v1',
      HYDRA_SERVICE_URL: process.env.HYDRA_SERVICE_URL || 'https://api.ciscospark.com/v1',
      ATLAS_SERVICE_URL: process.env.ATLAS_SERVICE_URL || 'https://atlas-a.wbx2.com/admin/api/v1'
    })
  ]
});
