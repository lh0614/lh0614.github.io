/* eslint-disable */
const fs = require('fs')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/** 路由配置公共方法 */
const utils = {
  resolve: dir => {
    return path.join(__dirname, dir)
  },
  assetsPath: _path => {
    return path.posix.join('', _path)
  },
}

/**
 *配置页面入口文件及模版
 */
let pages = {}
const filePath = path.resolve('./src/pages')
const fileList = fs.readdirSync(filePath)
fileList.forEach(file => {
  pages[file] = {
    entry: `src/pages/${file}/index.ts`,
    template: `src/pages/${file}/index.html`,
  }
})

// 允许对内部的 webpack 配置进行更细粒度的修改。
const chainWebpack = config => {
  config.resolve.symlinks(false) // 是否将符号链接解析为其符号链接位置
  // 路径重命名
  config.resolve.alias
    .set('@', utils.resolve('src'))
    .set('api', utils.resolve('src/api'))
    .set('assets', utils.resolve('src/assets'))
    .set('utils', utils.resolve('src/utils'))
    .set('common', utils.resolve('src/common'))
    .set('request', utils.resolve('src/common/request'))
    .set('components', utils.resolve('src/components'))
    .set('pages', utils.resolve('src/pages'))
    .set('router', utils.resolve('src/router'))
    .set('styles', utils.resolve('src/styles'))
    .set('store', utils.resolve('src/store'))
    .end()
  // 覆盖原 font 打包机制，所有的 font 不做处理
  config.module
    .rule('fonts')
    .use('url-loader')
    .tap(() => { })
  // set svg-sprite-loader
  config.module.rule('svg').exclude.add(path.resolve('src/assets/icons')).end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(path.resolve('src/assets/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]',
    })
    .end()
}

const configureWebpack = config => {
  //生产and测试环境
  let pluginsPro = [
    //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      generateStatsFile: true, // 是否生成stats.json文件
    }),
  ]
  //开发环境插件配置
  if (process.env.NODE_ENV === 'production') {
    // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    config.plugins = [...config.plugins, ...pluginsPro]
  } else {
    // 为开发环境修改配置...
    config.plugins = [...config.plugins]
  }
}

// TODO
const proxyTable = {
  '/api': {
    target: 'https://mengceng-docker.suanshubang.com',
    changeOrigin: true,
    secure: false,
  },
}

module.exports = {
  pages,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  runtimeCompiler: true,
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    proxy: proxyTable,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  chainWebpack,
  configureWebpack,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "/src/styles/vant.less";`,
        },
      }
    },
  },
}
