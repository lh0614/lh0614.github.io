<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
@import './../../styles/variables.less';
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #34495e;
  background-color: @background-class-detail;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  a {
    color: #42b983;
    font-weight: 600;
  }
  a,
  a:hover,
  a:active,
  a:visited,
  a:link,
  a:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
  }

  &::selection {
    background: #fff;
    color: #333;
  }
  &::-moz-selection {
    background: #fff;
    color: #333;
  }
  &::-webkit-selection {
    background: #fff;
    color: #333;
  }
}
</style>
