module.exports = {
  plugins: {
    autoprefixer: {
      // 配置css样式默认添加内核前缀
      overrideBrowserslist: [
        'last 1 major version',
        'last 5 Firefox versions',
        'Safari >= 6',
        'ie >= 8',
      ],
    },
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
    },
  },
}
