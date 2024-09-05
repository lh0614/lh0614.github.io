process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true
module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset',
    '@babel/preset-env',
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        polyfills: ['es6.promise', 'es6.symbol'],
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // 指定样式路径
        style: name => `${name}/style/less`,
      },
      'vant',
    ],
  ],
}
