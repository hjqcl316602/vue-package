/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 15:25:50
 * @LastEditTime: 2019-08-21 11:08:27
 * @LastEditors: Please set LastEditors
 */

const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf');
module.exports = {
  entry: path.resolve(__dirname, '../package/ui/index.js'), //'./package/es/index.js',
  output: {
    path: path.resolve(__dirname, '../package/ui'),
    publicPath: '/dist/',
    filename: 'index.min.js',
    library: 'store-vue-ui', // library指定的就是你使用require时的模块名，这里便是require("vueAjaxUpload")
    libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        //include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
    ]
  }
};
