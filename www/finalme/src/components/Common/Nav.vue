<template>
  <div class="navBar">
    <router-link :to="{name: 'DashBoard'}" tag="h1">
      <img src="../../assets/img/avatar.jpg" alt="" width="30">
      FinalMe DashBoard
    </router-link>
    <ul class="menu">
      <router-link :to="{name:'Article', query:{action:'add'}}" tag="li">
        <div class="icon">
          <i class="iconfont">&#xe699;</i>
        </div>
        <span>Writing</span>
      </router-link>
      <!-- <li>
        <div class="icon">
          <i class="iconfont">&#xe688;</i>
        </div>
        <span>Category</span>
      </li> -->
      <li class="userInfo" @click="openUser">
        <div class="icon">
          <img src="../../assets/img/avatar.jpg" alt="">
        </div>
        <span>wangwenbo000</span>
      </li>
      <li class="logOut">
        <div class="icon">
          <i class="iconfont">&#xe731;</i>
        </div>
        <span>logOut</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  methods: {
    openUser () {
      this.$store.commit('userToggle', true)
    }
  }
}
</script>
<style lang="scss" scoped>
$height:30px;
$borderWidth: 2px;
$borderColor: #000;
$borderColorRed: #ff0000;
$navHeight: $height - $borderWidth * 2;
$border: $borderWidth solid $borderColor;
$iconSize: 14px;
.navBar{
  width: 1200px;
  height: 50px;
  margin: 0 auto;
  position: relative;
  top: 10px;
  display: flex;
  justify-content: space-between;
  h1{
    padding: 0;
    margin: 0;
    width: 190px;
    height: $height;
    line-height: $height;
    font-size: 16px;
    text-align: center;
    background: #000;
    color: #fff;
    display: inline-block;
    display: flex;
    cursor: pointer;
    img{
      margin-right: 8px;
    }
  }
  .menu{
    display: flex;
    li{
      border: $border;
      height: $navHeight;
      line-height: $navHeight;
      margin-left: 6px;
      text-align: center;
      display: flex;
      cursor: pointer;
      .icon{
        width: $navHeight;
        font-size: $iconSize;
        border-right: 1px solid $borderColor;
      }
      span{
        padding: 0 10px;
        font-weight: bolder;
      }
    }
    li[class=userInfo]{
      background: #efefef;
      img{
        width: 26px;
        display: block;
      }
    }
    li[class=logOut]{
      border-color: $borderColorRed;
      color: $borderColorRed;
      .icon{
        border-right-color: $borderColorRed;
      }
    }
  }
}
</style>
