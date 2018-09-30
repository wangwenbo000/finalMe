<template>
  <div class="navBar">
    <router-link :to="{name: 'DashBoard'}" tag="h1">
      <img src="../../assets/img/avatar.jpg" alt="" width="30">
      FinalMe DashBoard
    </router-link>
    <ul class="menu" v-if="$route.name!=='Article'">
      <router-link :to="{name:'Article', query:{action:'add'}}" tag="li" class="writing">
        <div class="icon">
          <i class="iconfont">&#xe699;</i>
        </div>
        <span :title="'撰写文章'"
              v-tippy="{followCursor : true,animateFill: false, theme : 'gradient'}">
              Writing
        </span>
      </router-link>
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
        <span :title="'退出登录'"
              v-tippy="{followCursor : true,animateFill: false, theme : 'gradient'}">
              logOut
        </span>
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
$borderWidth: 1px;
$borderColor: #efefef;
$borderColorRed: #ff0000;
$navHeight: $height - $borderWidth * 2;
$border: $borderWidth solid $borderColor;
$iconSize: 14px;
.navBar{
  width: 960px;
  height: 50px;
  margin: 0 auto;
  position: relative;
  top: 10px;
  display: flex;
  justify-content: space-between;
  h1{
    padding: 0;
    margin: 0;
    // width: 190px;
    height: $height;
    line-height: $height;
    font-size: 20px;
    text-align: center;
    // background: #000;
    // color: #fff;
    display: inline-block;
    display: flex;
    cursor: pointer;
    img{
      margin-right: 8px;
    }
  }
  .menu{
    display: flex;
    .writing{
      background: #0059ff;
      color: #fff;
      .icon{
        border-right: 1px solid #003cac;
      }
    }
    li{
      // border: $border;
      height: $navHeight;
      line-height: $navHeight;
      margin-left: 6px;
      text-align: center;
      display: flex;
      background: #fff;
      cursor: pointer;
      &:hover{
        background: #ccc;
      }
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
      // background: #efefef;
      img{
        width: 28px;
        display: block;
      }
    }
    li[class=logOut]{
      // border-color: $borderColorRed;
      // color: $borderColorRed;
      .icon{
        // border-right-color: $borderColorRed;
      }
    }
  }
}
</style>
