<template>

<div id="NotFound404">
  <div class="win">
    <p><i class="iconfont">&#xe635;</i></p>
    <h2>From FinalMe</h2>
    <h1>404</h1>
    <p>👨🏻‍💻 Not Found</p>
    <div class="actionButton">
      <button @click="back">BACK ({{time}})</button>
      <button @click="go">FINALME</button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      time: 6
    }
  },
  created () {
    setInterval(() => {
      this.time = this.time - 1
    }, 1000)
    setTimeout(() => {
      this.back()
    }, 6000)
  },
  methods: {
    back () {
      this.$router.back()
    },
    go () {
      location.href = '/'
    }
  }
}
</script>
<style lang="scss" scoped>
#NotFound404{
  background: #F6F6F6;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .win{
    width: 400px;
    // height: 400px;
    padding: 20px 10px 30px 10px;
    background: #fff;
    border-radius: 3px;
    color: #02f;
    box-shadow: 0 40px 50px rgba(0,0,0,.1);
    // text-shadow:2px 2px 0 #ff0000;
    .iconfont{
      font-size: 60px;
    }
    h1{
      width: 100%;
      margin: 0;
      font-size: 180px;
      text-align: center;
      font-weight: normal;
    }
    h2{
      text-align: center;
      font-size: 32px;
      margin: 10px 0;
    }
    p{
      text-align: center;
      font-size: 20px;
      margin: 0;
    }
    .actionButton{
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      button{
        border: 1px solid #02f;
        border-radius: 50px;
        background: #fff;
        color: #02f;
        padding: 4px 20px;
        cursor: pointer;
        min-width: 120px;
        &:hover{
          background: #02f;
          color: #fff;
        }
        &:active{
          background: darken(#02f, 20);
        }
      }
    }
  }
}
</style>
