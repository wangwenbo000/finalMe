<template>
<transition name="zoom">
  <div class="messagebox" v-drag="'.title'" v-show="show">
    <div class="title">
      <i class="iconfont">&#xe726; </i> {{title}}
    </div>
    <div class="content" v-html="content"></div>
    <div class="boxBtn">
      <button class="yellowBtn" @click="close">Cancel</button>
      <button class="blackBtn" @click="submit">Sure</button>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'MessageBox',
  props: {
    title: {
      default: 'Message box'
    },
    content: {
      default: '<strong style="font-size:22px;">Hello Message</strong>'
    },
    show: {
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close', !this.show)
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
<style lang="scss" scoped>
.messagebox{
  width: 240px;
  height: 120px;
  position: fixed;
  background: #fff;
  border: 1px solid #000;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  left: 50%;
  margin-left: -120px;
  top: 30%;
  margin-top: -60px;
  z-index: 1002;
  .title{
    background: #000;
    text-align: center;
    color: #fff;
    padding: 2px;
    cursor: move;
  }
  .content{
    display: flex;
    height: 70px;
    background: #efefef;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .boxBtn{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #000;
    button{
      width: 100%;
    }
  }
}
</style>


