<template>
<div class="Article">
  <h2>
    <i class="iconfont">&#xe699;</i>
    <span v-text="$route.query.action === 'edit'?'UPDATE':'POST'">POST</span> ARTICLE
  </h2>
  <div class="topForm">
    <input type="text"
           class="title"
           placeholder="Article Title"
           v-model="article.title">
    <div class="router">
      <input type="text" class="routeInput" placeholder="Router Name" v-model="article.routename">
      <button @click="tranRoute" :title="'翻译标题为路由名'"
                   v-tippy="{followCursor : true, animateFill: false, theme : 'gradient'}"> <i class="iconfont">&#xe616;</i></button>
    </div>
    <div class="tag">
      <select v-model="article.cate">
        <option :value="-1" selected>暂无分类</option>
        <option :value="cate.id"
                v-for="cate in list">
                {{cate.name}}
        </option>
      </select>
      <ul class="type">
        <li>
          <input type="radio" name="type" id="article" :value="3" v-model="article.show"/><label for="article">文章</label>
        </li>
        <li>
          <input type="radio" name="type" id="page" :value="1" v-model="article.show"/><label for="page">页面</label>
        </li>
        <li>
          <input type="radio" name="type" id="drafs" :value="2" v-model="article.show"/><label for="drafs">草稿</label>
        </li>
        <li>
          <input type="radio" name="type" id="top" :value="0" v-model="article.show"/><label for="top">置顶</label>
        </li>
      </ul>
      <input type="text" placeholder="Tag Name" @keyup.enter="addTag" v-model="tagText">
      <ul class="addTag">
        <li v-for="(t,index) in article.tags">
          <span>{{t}}</span>
          <i class="iconfont" @click="delTag(index)">&#xe6bc;</i>
        </li>
      </ul>
    </div>
    <div class="markdown">
      <mavon-editor style="height:700px;width:100%;z-index:1;"
                    :boxShadow="false"
                    :value="code"
                    @change="onEditorCodeChange"></mavon-editor>
    </div>
  </div>
  <div class="btnBar">
    <ul>
      <li><strong v-text="$route.query.action === 'edit'?'LastUpdate@':'Create@'"> </strong> &nbsp;{{getNowFormatDate}}</li>
      <li><strong>Status: </strong> new</li>
    </ul>
    <ul>
      <!-- <li class="cancel">
        <i class="iconfont">&#xe6bc;</i>
      </li>
      <li class="draft">
        <i class="iconfont">&#xe6b6;</i>
      </li> -->
      <li class="post" @click="postAction">
        <i class="iconfont">&#xe6a0;</i>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      code: '',
      tagText: '',
      toc: '',
      getNowFormatDate: '',
      article: {
        title: '',
        routename: '',
        cate: -1,
        tags: [],
        content: '',
        html: '',
        date: '',
        status: -1,
        show: 3
      }
    }
  },
  methods: {
    ...mapActions([
      'transRouteName',
      'getCateList',
      'postArticle',
      'editArticle'
    ]),
    onEditorCodeChange (newCode) {
      this.article.content = newCode
    },
    addTag () {
      if (this.tagText === '') return false
      this.article.tags.push(this.tagText)
      this.tagText = ''
    },
    delTag (index) {
      this.article.tags.splice(index, 1)
    },
    async tranRoute () {
      let res = await this.transRouteName(this.article.title)
      const routeName = res.dst.replace(/,/g).split(' ').join('-')
      this.article.routename = routeName
    },
    async postAction () {
      await this.postArticle(this.article)
      this.$message({message: '更新成功'})
      // this.$router.replace({name: 'DashBoard'})
    }
  },
  computed: {
    ...mapState({
      list: state => state.Cate.list
    }),
    editor () {
      return this.$refs.myEditor.editor
    }
  },
  async created () {
    let _this = this
    window.onbeforeunload = function (e) {
      console.log(_this.$route.fullPath)
      if (_this.$route.fullPath === '/Article?action=add') {
        e = e || window.event
          // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示'
        }
          // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示'
      } else {
        window.onbeforeunload = null
      }
    }

    setInterval(() => {
      this.getNowFormatDate = this.$moment().format('MMMM Do YYYY, h:mm:ss a')
    }, 1000)

    const cateList = await this.getCateList()
    this.categoryList = cateList
    this.article.date = this.getNowFormatDate
    // 编辑
    if (this.$route.query.action === 'edit') {
      const id = this.$route.query.id
      const article = await this.editArticle(id)
      article.tags = article.tags.split('|')

      const editJson = {
        id: article.id,
        title: article.title,
        routename: article.routename,
        cate: article.cateid,
        tags: article.tags,
        content: article.content,
        html: article.html,
        date: this.$moment(article.date).format('MMMM Do YYYY, h:mm:ss a'),
        status: -1,
        show: article.show
      }
      this.code = article.content
      this.article = editJson
    }
  },
  components: {
    mavonEditor
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('确认离开当前页面？你有未保存的数据！')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
<style lang="scss" scoped>

.Article{
  width: 90%;
  min-width: 960px;
  margin: 0 auto;
  h2{
    color: #e0e0e0;
    padding-bottom: 10px;
    border-bottom: 1px dashed #e0e0e0;
    margin-bottom: 20px;
  }
  input[class=routeInput],
  input[class=title],
  input[type=text],
  {
    width: 100%;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    padding-left: 12px;
  }
  input[class=title]{
    font-size: 20px;
    margin-bottom: 6px;
  }
  .router{
    display: flex;
    margin-bottom: 6px;
    button{
      padding: 0 20px;
      border-radius: 15px
    }
  }
  .tag{
    display: flex;
    margin-bottom: 6px;
    input[type=text]{
      width: 120px;
      margin-left: 6px;
    }

    .type{
      padding: 0;
      margin: 0 20px;
      display: flex;
      li{
        input[type=radio]{
          display: block;
          margin-right: 10px;
        }
        cursor: pointer;
        margin-left: -1px;
        // border:1px solid #000;
        display: flex;
        align-items: center;
        padding: 0 6px;
        height: 28px;
      }
    }
    .addTag{
      margin-left: 6px;
      li{
        padding: 8px 6px;
        border: 1px solid #000;
        line-height: 100%;
        display: inline-flex;
        align-items: center;
        background: #faed7c;
        margin-right: 2px;
        span{
          margin-right: 6px;
        }
        i{
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
  .markdown{
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    position: relative;
    .left,
    .right{
      width: 100%;
    }
    .right{
      padding: 6px;
      border:1px solid #000;
      height: 786px;
      overflow-y: scroll;
    }
  }
}
.btnBar{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ul{
    li{
      display: inline-flex;
      padding: 8px 10px;
      border: 1px solid #e0e0e0;
      align-items: center;
      cursor: pointer;
    }
    .cancel{
      background: #efefef;
    }
    .draft{
      background: #faed7c;
    }
    .post{
      background: #44b549;
      border: 1px solid #000;
      color: #fff;
    }
  }
}
</style>
