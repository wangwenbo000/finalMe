<template>
<transition name="message-fade">
  <div class="alert-msg" v-if="show" :style="{backgroundColor:msgType}">
    <div class="icon"><img :src="typeImg" width="100%" height="28"></div>
    <div class="msg">{{message}}</div>
  </div>
</transition>
</template>

<script>
export default {
  data () {
    return {
      delay: 2000,
      message: '',
      show: false,
      timeout: null,
      type: 'success'
    }
  },
  mounted () {
    this.$nextTick(function () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.show = false
      }, this.delay)
    })
  },
  computed: {
    msgType () {
      switch (this.type) {
        case 'error':
          return '#ff6060'
        case 'info':
          return '#459ae9'
        case 'warn':
          return '#F7BA2A'
        default:
          return '#44b549'
      }
    },
    typeImg () {
      return require(`./assets/${this.type}.svg`)
    }
  }
}
</script>

<style lang='scss'>
  .alert-msg{
    z-index: 10000;
    position: fixed;
    height: 28px;
    top: 10px;
    left:50%;
    transform: translateX(-50%);
    transition: opacity 0.3s, transform .3s;
    background-color: #44b549;
    z-index: 10000;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .msg{
      font-size: 12px;
      padding: 10px;
    }
    .icon{
      width: 30px;
      height: 100%;
      border-right:1px solid rgba(0,0,0,.1);
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .message-fade-enter,
  .message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
</style>
