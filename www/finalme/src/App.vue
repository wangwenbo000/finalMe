<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
// 全局样式
@import './assets/scss/index';
@import './assets/scss/pageNav';
@import './assets/scss/markdown';
@import './assets/scss/animate.scss';
@import './assets/scss/normalize.scss';
</style>
