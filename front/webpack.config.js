const webpack = require('webpack');
const path = require('path');
const envFile = require('node-env-file');

module.exports = {
  context: __dirname + '/app',
  entry: ['script-loader!jquery/dist/jquery.min.js', './app.jsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    alias: {

			// -> APP
      app: 'app',
      applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),

			// -> TRANSLATES
      Translates: path.resolve(__dirname, 'app/translates/index.jsx'),

			// -> INDEX.JSX SCREENS
      Test: path.resolve(__dirname, 'app/screens/test/index.jsx'),

			// -> COMPONENTS

			// -> API
      //user: path.resolve(__dirname, 'app/api/user.jsx'),

			// -> ACTIONS
      //profile: path.resolve(__dirname, 'app/actions/profile.jsx'),

			// -> Configure STORE
      configureStore: path.resolve(__dirname, 'app/store/configureStore.jsx')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['babel-preset-env'] //Preset used for env setup
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss?$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },

    ]
  },
  //plugins: [htmlWebpackPlugin]
  plugins: [
    /*
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
      }
    }),
    */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

// in script before (ROM) : webpack --mode production --module-bind js=babel-loader
// in script for working (TANG) : webpack --config webpack.config.js
