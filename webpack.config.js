const currentTask = process.env.npm_lifecycle_event

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer'),
]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('Copy images', () => fse.copySync('./app/assets/images', './docs/assets/images'))
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    { loader: 'css-loader',
      options: { url: false }
    },
    { loader: 'postcss-loader',
      options: { postcssOptions: { plugins: postCSSPlugins } }
    }
  ]
}

let pages = fse.readdirSync('./app')
  .filter(file => file.endsWith('.html'))
  .map(page => {
    return new HtmlPlugin({
      filename: page,
      template: `./app/${page}`
    })
  })

let config = {
  entry: './app/assets/scripts/App.js',
  module: {
    rules: [
      cssConfig,
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: pages
}

if (currentTask === 'dev') {
  cssConfig.use.unshift('style-loader')
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  }
  config.devServer = {
    before: (app, server) => server._watch('./app/**/*.html'),
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  }
  config.mode = 'development'
}

if (currentTask === 'build') {

  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  /* config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist')
  } */
  config.output = {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: { chunks: 'all'},
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css'
    }),
    new RunAfterCompile()
  )
}

module.exports = config