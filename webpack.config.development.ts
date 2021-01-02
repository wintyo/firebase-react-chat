import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

import baseConfig from './webpack.config.base';

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './.temp'),
    publicPath: '/',
  },
  devServer: {
    contentBase: '.temp',
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    overlay: true,
    port: 9150,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: true,
      suppressWarning: true,
    }),
  ],
} as webpack.Configuration);

// @ts-ignore
config.module.rules.push({
  test: /\.css$/,
  use: [
    'css-hot-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
  ],
});

// @ts-ignore
config.module.rules.push({
  test: /\.(sass|scss)$/,
  use: [
    'css-hot-loader',
    // CSSをextractする
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: {
          mode: 'local',
          localIdentName: '[name]-[local]-[hash:base64:5]',
        },
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: (loader: any) => [
            autoprefixer(),
            // new IconfontWebpackPlugin(loader),
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-resources-loader',
      options: {
        sourceMap: true,
        resources: [path.resolve('./src/css/resources/*.scss')],
      },
    },
  ],
});

const ip = require('ip');
// @ts-ignore
console.log(`External: http://${ip.address()}:${config.devServer.port}`);

export default config;
