<template>
<div class="msgBox">
  <h1>{{msg}}</h1>
  <div class="btn-group">
    <button class="redBtn" @click="cancel">取消</button>
    <button class="greenBtn" @click="submit">确认</button>
  </div>
</div>
</template>
<script>
export default {
  name: 'boxInsideMsg',
  props: ['msg'],
  methods: {
    submit () {
      this.$emit('ok')
    },
    cancel () {
      this.$emit('cancel', false)
    }
  }
}
</script>
<style lang="scss">
.msgBox{
  position: absolute;
  top: 18px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color:#fff;
  }
  .btn-group{
    width: 200px;
    display: flex;
    justify-content: space-between;
    button{
      width: 48%;
    }
  }
}
</style>


