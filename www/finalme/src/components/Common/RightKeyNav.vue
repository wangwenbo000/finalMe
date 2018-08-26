<template>
  <div class="mouseRightClick"
       :style="{top:rightClick.top + 'px',left:rightClick.left + 'px'}"
       v-show="rightClick.show"
       v-drag="'.title'">
    <div class="title">
      :: Quick Actions
      <a href="javascript:;" @click="rightClick.show = false">
        <i class="iconfont">&#xe6bc;</i>
      </a>
    </div>
    <ul>
      <router-link tag="li" :to="{name:'DashBoard'}" @click.native="close">
        <img src="../../assets/img/avatar.jpg" width="12" alt="">
        <span>Dashboard</span>
      </router-link>
      <li class="cutLine"></li>
      <router-link tag="li" :to="{name:'Article'}" @click.native="close">
        <i class="iconfont">&#xe699;</i>
        <span>Writing</span>
      </router-link>
      <!-- <li @click="openSrc">
        <i class="iconfont">&#xe709;</i>
        <span>Source</span>
      </li> -->
      <li @click="openCate">
        <i class="iconfont">&#xe688;</i>
        <span>Categorys</span>
      </li>
      <li @click="openUser">
        <i class="iconfont">&#xe6b4;</i>
        <span>User</span>
      </li>
      <li class="cutLine"></li>
      <li @click="openAbout">
        <i class="iconfont">&#xe726;</i>
        <span>About</span>
      </li>
      <li>
        <i class="iconfont">&#xe6a0;</i>
        <span>Preview</span>
      </li>
      <li class="cutLine"></li>
      <li @click="refreshPage">
        <i class="iconfont">&#xe6ea;</i>
        <span>Refresh</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RightKeyNav',
  data () {
    return {
      rightClick: {
        top: 0,
        left: 0,
        show: false
      }
    }
  },
  mounted () {
    document.oncontextmenu = e => {
      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop
      var x = e.pageX || e.clientX + scrollX
      var y = e.pageY || e.clientY + scrollY
      this.rightClick.top = y
      this.rightClick.left = x
      this.rightClick.show = true
      e.preventDefault()
    }
  },
  methods: {
    close () {
      this.rightClick.show = false
    },
    refreshPage () {
      location.reload()
      this.close()
    },
    openCate () {
      this.$store.commit('cateToggle', true)
      this.close()
    },
    openSrc () {
      this.$store.commit('srcToggle', true)
      this.close()
    },
    openUser () {
      this.$store.commit('userToggle', true)
      this.close()
    },
    openAbout () {
      window.open('https://github.com/wangwenbo000/finalMe')
      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.mouseRightClick{
  position: fixed;
  background: #273544;
  z-index: 1000;
  border: 1px solid #000;
  border-right: 2px solid #000;
  .title{
    background: #000;
    color:#fff;
    padding: 2px 6px;
    cursor:move;
    &:active{
      background: #faed7c;
      color:#000;
    }
    a{
      float: right;
      color: #fff;
    }
  }
  ul{
    width: 120px;
    .cutLine{
      height: 2px;
      padding: 0;
      width: 100%;
      background: #faed7c;
    }
    li{
      padding: 6px 10px;
      border-bottom: 1px solid #000;
      font-weight: bold;
      align-items: center;
      width: 100px;
      color: #aab2bd;
      span{
        margin-left: 6px;
      }
      &:hover{
        background: #000;
        color:#faed7c;
        cursor: pointer;
      }
    }
  }
}
</style>


