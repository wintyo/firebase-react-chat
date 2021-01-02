import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import baseConfig from './webpack.config.base';

const config = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
} as webpack.Configuration);

// @ts-ignore
config.module.rules.push({
  test: /\.(sass|scss)$/,
  use: [
    // CSSをextractする
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
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
        postcssOptions: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          plugins: (loader: any) => [
            // new IconfontWebpackPlugin(loader),
            autoprefixer(),
            cssnano(),
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [path.resolve('./src/css/resources/*.scss')],
      },
    },
  ],
});

export default config;
