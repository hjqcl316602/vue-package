/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-18 21:26:51
 * @LastEditTime: 2019-08-20 16:18:11
 * @LastEditors: Please set LastEditors
 */
var path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConfig, {
  //devtool: 'source-map',
  entry: {
    main: './package/ui/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../package/ui'),
    publicPath: '/dist/',
    filename: 'index.min.js',
    library: 'index',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
  // plugins: [
  //   // @todo
  //   // new webpack.DefinePlugin({
  //   //   'process.env.NODE_ENV': '"production"'
  //   // })
  //   // new UglifyJsPlugin({
  //   //   parallel: false, // true,
  //   //   sourceMap: false // true
  //   // })
  //   // new CompressionPlugin({
  //   //   asset: '[path].gz[query]',
  //   //   algorithm: 'gzip',
  //   //   test: /\.(js|css)$/,
  //   //   threshold: 10240,
  //   //   minRatio: 0.8
  //   // })
  // ]
});

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  })
]);

// module.exports = {
//   entry: './package/ui/index.js',
//   output: {
//     path: path.resolve(__dirname, '../package/ui'),
//     //publicPath: '/dist/',
//     filename: 'index.min.js',
//     library: 'mui', // library指定的就是你使用require时的模块名，这里便是require("vueAjaxUpload")
//     libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
//     umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['vue-style-loader', 'css-loader']
//       },
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader',
//         options: {
//           loaders: {}
//           // other vue-loader options go here
//         }
//       },
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(png|jpg|gif|svg)$/,
//         loader: 'file-loader',
//         options: {
//           name: '[name].[ext]?[hash]'
//         }
//       }
//     ]
//   },
//   resolve: {
//     alias: {
//       vue$: 'vue/dist/vue.esm.js'
//     },
//     extensions: ['*', '.js', '.vue', '.json']
//   },
//   devServer: {
//     historyApiFallback: true,
//     noInfo: true,
//     overlay: true
//   },
//   performance: {
//     hints: false
//   },
//   devtool: '#eval-source-map'
// };

// if (process.env.NODE_ENV === 'production') {
//   //module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ]);
// }
