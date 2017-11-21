<template>
<transition name="zoom">
  <div class="User"
       v-show="toggle"
       v-drag="'.title'"
       :style="{top:position.y+'px',left:position.x+'px'}">
    <div class="title">
      <div>
        :: User <div class="spinner" v-show="loading"></div>
      </div>
      <a href="javascript:;" @click="close">
        <i class="iconfont">&#xe6bc;</i>
      </a>
    </div>
    <div class="avatar">
      <img src="../../assets/img/avatar.jpg" alt="" width="100%">
        <a href="javascript:;" class="del-avatar">
          <i class="iconfont">&#xe6bb;</i>
        </a>
    </div>
    <h1>wangwenbo000</h1>
    <div class="changePassWord">
      <input type="text" placeholder="passowrd1">
      <input type="text" placeholder="password2">
      <button class="yellowBtn">changePassWord</button>
    </div>
  </div>
</transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    position () {
      const width = window.innerWidth
      const x = (width - 200) / 2
      return {
        x: x,
        y: 100
      }
    },
    ...mapState({
      toggle: state => state.Toggle.userToggle
    })
  },
  methods: {
    close () {
      this.$store.commit('userToggle', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.User{
  width: 200px;
  height: 356px;
  border: 1px solid #000;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  background: #fff;
  position: fixed;
  .title{
    background: #000;
    padding: 2px 4px;
    display: flex;
    justify-content: space-between;
    cursor: move;
    align-items: center;
    color: #fff;
    &:active{
      background: #faed7c;
      color:#000;
    }
    a{
      float: right;
      color: #fff;
    }
  }
  .avatar{
    position: relative;
    height: 200px;
    img{
      position: absolute;
      display: block;
    }
    .del-avatar{
      background: #000;
      color: #fff;
      padding: 4px;
      position: absolute;
      right: 4px;
      bottom: 4px;
    }
  }
  h1{
    text-align: center;
    margin: 4px 0 0 0;
    padding-bottom: 4px;
    border-bottom: 1px solid #000;
  }
  .changePassWord{
    padding: 6px;
    input{
      width: 100%;
      margin-bottom: 2px;
    }
    button{
      width: 100%;
    }
  }
}
</style>


