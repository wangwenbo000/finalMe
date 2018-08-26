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
          <button class="greenBtn" @click="addBtn"><i class="iconfont">&#xe699;</i> 新增分类</button>
        </div>
        <ul>
          <li @click="toggleWin(l)" v-for="l in list">
            · {{l.name}}
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="contentTitle" :style="{backgroundColor:state==='add'?'#44b549':'#b9f'}">
          <strong v-text="state==='add'?'增加操作':'更新操作'"></strong>
          <a href="javascript:;" @click.prevent="showInBox=true" v-show="state!=='add'">
            <i class="iconfont">&#xe6bb;</i>
          </a>
        </div>
        <div class="form">
          <input type="text" placeholder="category Name" v-model="form.name">
          <!-- <input type="text" placeholder="Router Name" v-model="form.routerName"> -->
          <textarea rows="7" placeholder="describe" v-model="form.describe"></textarea>
          <div class="button-group">
            <button class="cancelBtn" @click="close">取消</button>
            <button class="greenBtn" @click="save">保存</button>
          </div>
        </div>
      </div>
    </div>
    <BoxInsideMsg msg="准备删除？"
                  v-show="showInBox"
                  @cancel="showInBox=false"
                  @ok="del"></BoxInsideMsg>
  </div>
</transition>
</template>
<script>
import BoxInsideMsg from '@/components/Common/BoxInsideMsg'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Category',
  data () {
    return {
      width: 320,
      loading: false,
      state: 'add',
      showInBox: false,
      form: {
        id: null,
        name: '',
        describe: ''
      }
    }
  },
  components: {
    BoxInsideMsg
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
      toggle: state => state.Toggle.categoryToggle,
      list: state => state.Cate.list
    })
  },
  async created () {
    await this.getCateList()
  },
  methods: {
    ...mapActions([
      'getCateList',
      'updateCate',
      'addCate',
      'delCate'
    ]),
    close () {
      this.$store.commit('cateToggle', false)
    },
    addBtn () {
      this.state = 'add'
      this.form = {
        id: null,
        name: '',
        describe: ''
      }
    },
    async save () {
      if (this.form.name === '' || this.form.describe === '') {
        this.$message({message: '表单不能为空', type: 'warn'})
        return false
      }
      if (this.form.id) {
        // 更新
        this.loading = true
        await this.updateCate(this.form)
        this.$message({message: '更新成功'})
        this.loading = false
      } else {
        // 新增
        this.loading = true
        await this.addCate(this.form)
        this.$message({message: '新增成功'})
        this.addBtn()
        this.loading = false
      }
    },
    async del () {
      this.loading = true
      await this.delCate(this.form.id)
      this.showInBox = false
      this.$message({message: '删除成功'})
      this.addBtn()
      this.loading = false
    },
    toggleWin (info) {
      this.loading = true
      this.state = 'up'
      this.form.name = info.name
      this.form.describe = info.describe
      this.form.id = info.id
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
// #627485
.category{
  width: 260px;
  height: 240px;
  border: 1px solid #000;
  position: fixed;
  background: #273544;
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
    height: 222px;
    width: 320px;
    overflow: hidden;
    justify-content: space-between;
    .left{
      width: 130px;
      border-right: 1px solid #000;
      button{
        width: 100%;
      }
      ul{
        overflow-y: scroll;
        width: 130px;
        height: 191px;
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
          color: #aab2bd;
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
        }
      }
    }
    .right{
      // width: 299px;
      height: 100%;
      .contentTitle{
        padding: 2px 4px;
        height: 26px;
        background: #b9f;
        border-bottom: 1px solid #000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
          float: right;
          color: rgb(255, 0, 0);
        }
      }
      .form{
        padding: 6px;
        ::-webkit-input-placeholder {
           color: #aab2bd;
           font-size: 12px;
        }

        input{
          width: 100%;
          margin-bottom: 6px;
          background: #627485;
          color:#fff;
        }

        .button-group{
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          button{
            width: 49%;
          }
        }
        textarea{
          width: 100%;
          resize: none;
          background: #627485;
        }
      }
    }
  }
}
</style>
