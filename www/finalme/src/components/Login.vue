<template>
<div class="login" :style="{'background-image':'url('+ bg +') '}">
<div class="logo"><i class="iconfont">&#xe635;</i></div>
<div class="win">
  <div class="title">
    FinalMe Login
  </div>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="UserName" v-model="userName">
    <input type="password" placeholder="PassWord" v-model="passWord">
    <button>Login</button>
  </form>
</div>
<div class="footer">
  <i class="iconfont">&#xe635;</i> FinalMe blog 0.0.0.170929
   | <i class="iconfont">&#xe600;</i><a href="https://github.com/wangwenbo000" target="_blank"> Github</a>
</div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      passWord: '',
      bg: ''
    }
  },
  async created () {
    await this.get500px()
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async onSubmit () {
      await this.login({
        userName: this.userName,
        passWord: this.passWord
      })
      this.$router.replace({
        name: 'DashBoard',
        query: {
          filter: 'list',
          page: 1
        }
      })
    },
    async get500px () {
      const url = 'https://api.500px.com/v1/photos'
      const res = await this.$http({
        url: url,
        method: 'get',
        params: {
          feature: 'popular',
          rpp: 10,
          consumer_key: 'KPCjkI4AJjVfrELh5ZtYHZsH8SM5x0DN9IWiYGEl',
          image_size: 2048
        }
      })
      this.bg = res.data.photos[parseInt(10 * Math.random())].image_url
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  .logo{
    font-size: 52px;
    margin-bottom: 20px;
    color: #fff;
  }
  .footer{
    margin-top: 10px;
    color: #fff;
    a{
      color: #fff;
    }
  }
  .win{
    width: 300px;
    border: 1px solid #000;
    .title{
      height: 30px;
      background: #000;
      text-align: center;
      line-height: 30px;
      font-weight: 600;
      font-size: 16px;
      color: #fff;
    }
    input{
      box-sizing: border-box;
      width: 100%;
      border: none;
      border-bottom: 1px solid #000;
      &:first-child{

      }
    }
    button{
      display: block;
      width: 100%;
    }
  }
}
</style>
