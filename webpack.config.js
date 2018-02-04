const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, 'main'),
  output: {
    filename: 'js/[name].bundle.js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [{
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'img/[name]-[hash].[ext]'
            }
          }
        ]

      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "./dist",
    publicPath: path.join('/dist/'),
    inline: true,
    hot: true
  }
};
