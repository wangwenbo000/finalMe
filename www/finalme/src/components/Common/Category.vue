<template>
<transition name="zoom">
  <div class="category"
       v-drag="'.title'"
       v-show="toggle"
       :style="{top:position.y+'px',left:position.x+'px',width:width+'px'}">
    <div class="title">
      <div>
        :: Category (2) <div class="spinner" v-show="loading"></div>
      </div>
      <a href="javascript:;" @click="close">
        <i class="iconfont">&#xe6bc;</i>
      </a>
    </div>
    <div class="content">
      <div class="left">
        <div>
          <button class="greenBtn">+ Add New Category</button>
        </div>
        <ul>
          <li @click="toggleWin">
            · javascript
            <a href="javascript:;">
              <i class="iconfont">&#xe6bc;</i>
            </a>
          </li>
          <li v-for="i in 30">
            · 生活琐碎
            <a href="javascript:;">
              <i class="iconfont">&#xe6bc;</i>
            </a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="contentTitle">
          <strong>操作</strong>
          <a href="javascript:;" @click="closePanle">
            <i class="iconfont">&#xe6bc;</i>
          </a>
        </div>
        <div class="form">
          <input type="text" placeholder="category Name">
          <input type="text" placeholder="Router Name">
          <textarea rows="15" placeholder="describe"></textarea>
          <button>保存</button>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Category',
  data () {
    return {
      width: 200,
      loading: false
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
      toggle: state => state.Toggle.categoryToggle
    })
  },
  methods: {
    close () {
      this.$store.commit('cateToggle', false)
    },
    toggleWin () {
      if (this.width === 200) {
        this.loading = true
      }
      this.width === 500 ? this.width = 200 : this.width = 500
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    closePanle () {
      this.width = 200
    }
  }
}
</script>
<style lang="scss" scoped>
.category{
  width: 200px;
  height: 400px;
  border: 1px solid #000;
  position: fixed;
  background: #efefef;
  z-index: 100;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  overflow: hidden;
  transition: width .5s;
  transition-timing-function:cubic-bezier(.99,.01,.77,1);
  .title{
    background: #000;
    color:#fff;
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
  .content{
    display: flex;
    height: 382px;
    width: 500px;
    overflow: hidden;
    justify-content: space-between;
    .left{
      width: 200px;
      border-right: 1px solid #000;
      button{
        width: 100%;
      }
      ul{
        overflow-y: scroll;
        width: 200px;
        height: 352px;
        border-top: 1px solid #000;
        &::-webkit-scrollbar {
          background-color: #faed7c;
          width: 6px;
        }
        &::-webkit-scrollbar-thumb{
          background-color: #000;
        }
        li{
          border-bottom: 1px solid #000;
          cursor: pointer;
          padding: 4px 6px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:last-child{
            border: none;
          }
          &:hover{
            background: #faed7c;
          }
          &:active{
            background: darken(#faed7c,50%);
            color: #fff;
          }
          a{
            float: right;
            color: #000;
          }
        }
      }
    }
    .right{
      width: 299px;
      height: 100%;
      .contentTitle{
        padding: 2px 4px;
        border-bottom: 1px solid #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
          float: right;
        }
      }
      .form{
        padding: 6px;
        input{
          width: 100%;
          margin-bottom: 6px;
        }
        textarea{
          width: 100%;
        }
      }
    }
  }
}
</style>
