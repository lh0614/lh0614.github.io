<template>
  <div class="container">
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  // components: {},
})
export default class IndexView extends Vue {
  // async mounted() {}
  // destroyed () {}
}
</script>

<style lang="less" scoped>
@import './../../../styles/variables.less';
.container {
  font-size: 14px;
}
</style>
