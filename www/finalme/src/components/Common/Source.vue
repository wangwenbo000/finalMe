<template>
<transition name="zoom">
  <div class="Source"
       v-drag="'.title'"
       v-show="toggle"
       :style="{top:position.y+'px',left:position.x+'px'}">
    <div class="title">
      <div>
        :: Source 
      </div>
      <a href="javascript:;" @click="close">
        <i class="iconfont">&#xe6bc;</i>
      </a>
    </div>
    <div class="toolBar">
      <input type="text" placeholder="search path">
      <button>
        <i class="iconfont">&#xe6dd;</i>
      </button>
      <button>上一页</button>
      <button>下一页</button>
      <button class="blueBtn">
        <i class="iconfont">&#xe72d;</i>
      </button>
      <div class="spinner spinnerBig"></div>
    </div>
    <ul class="content">
      <li class="folder">
        <i class="iconfont">&#xe67c;</i>
        <span>folder name</span>
      </li>
      <li v-for="i in 80">
        <span class="type">jpeg</span>
        <a href="javascript:;">
          <i class="iconfont">&#xe6bb;</i>
        </a>
      </li>
    </ul>
  </div>
</transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Source',
  methods: {
    close () {
      this.$store.commit('srcToggle', false)
    }
  },
  computed: {
    position () {
      const width = window.innerWidth
      const x = (width - 900) / 2
      return {
        x: x,
        y: 100
      }
    },
    ...mapState({
      toggle: state => state.Toggle.sourceToggle
    })
  }
}
</script>
<style lang="scss" scoped>
.Source{
  width: 900px;
  height: 600px;
  border: 1px solid #000;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  background: #fff;
  position: fixed;
  z-index: 100;
  .title{
    background: #000;
    color: #fff;
    padding: 2px 4px;
    display: flex;
    justify-content: space-between;
    cursor: move;
    align-items: center;
    &:active{
      background: #faed7c;
      color:#000;
    }
    a{
      float: right;
      color: #fff;
    }
  }
  .toolBar{
    height: 32px;
    background: #222;
    display: flex;
    align-items: center;
    input{
      border: none;
      margin-right: 1px;
    }
    button{
      margin-right: 1px;
    }
  }
  .content{
    width: 896px;
    height: 547px;
    padding-top: 1px;
    margin: 0 auto;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      background-color: #faed7c;
      width: 6px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #000;
    }
    .folder{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 40px;
      background: #faed7c;
      span{
        font-size: 12px;
      }
    }
    li{
      width: 125px;
      height: 122px;
      float: left;
      background: #efefef;
      margin: 1px;
      position: relative;
      .type{
        background: #ccc;
        padding: 2px 3px;
        position: absolute;
        top: 2px;
        left: 2px;
      }
      a{
        position: absolute;
        width: 20px;
        height: 20px;
        bottom: 4px;
        right: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #000;
        color:#fff;
      }
    }
  }
}
</style>


