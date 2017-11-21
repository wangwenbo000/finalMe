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
      <button @click="tranRoute">Translate</button>
    </div>
    <div class="tag">
      <select v-model="article.cate">
        <option :value="-1" selected>暂无分类</option>
        <option :value="cate.id"
                v-for="cate in categoryList">
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
      <div class="toc" >
        <div class="toc-title">@TOC |
          <a href="javascript:;" @click="clearToc" v-if="article.content===''">
            <i class="iconfont">&#xe6bb;</i>
          </a>
        </div>
        <div v-html="toc"></div>
      </div>
      <div class="left">
        <codemirror ref="myEditor"
              :code="code"
              :options="editorOptions"
              @ready="onEditorReady"
              @focus="onEditorFocus"
              @change="onEditorCodeChange">
        </codemirror>
      </div>
      <div class="right">
        <vue-markdown :source="article.content"
                      @rendered="renderHtml"
                      @toc-rendered="renderToc"
                      :watches="['show','html','breaks','linkify','emoji','typographer','toc']"
                      :toc='true'></vue-markdown>
      </div>
    </div>
  </div>
  <div class="btnBar">
    <ul>
      <li><strong v-text="$route.query.action === 'edit'?'LastUpdate@':'Create@'"> </strong> &nbsp;{{getNowFormatDate}}</li>
      <li><strong>Status: </strong> new</li>
    </ul>
    <ul>
      <li class="cancel">
        <i class="iconfont">&#xe6bc;</i>
      </li>
      <li class="draft">
        <i class="iconfont">&#xe6b6;</i>
      </li>
      <li class="post" @click="postAction">
        <i class="iconfont">&#xe6a0;</i>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
require('codemirror/addon/dialog/dialog.css')
require('codemirror/addon/fold/foldgutter.css')
// require active-line.js
require('codemirror/addon/selection/active-line.js')
// styleSelectedText
require('codemirror/addon/selection/mark-selection.js')
require('codemirror/addon/search/searchcursor.js')
// highlightSelectionMatches
require('codemirror/addon/scroll/annotatescrollbar.js')
require('codemirror/addon/search/matchesonscrollbar.js')
require('codemirror/addon/search/searchcursor.js')
require('codemirror/addon/search/match-highlighter.js')
// keyMap
require('codemirror/mode/clike/clike.js')
require('codemirror/addon/edit/matchbrackets.js')
require('codemirror/addon/comment/comment.js')
require('codemirror/addon/dialog/dialog.js')

require('codemirror/addon/search/searchcursor.js')
require('codemirror/addon/search/search.js')
require('codemirror/keymap/sublime.js')
// foldGutter

require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/comment-fold.js')
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/xml-fold.js')
import VueMarkdown from 'vue-markdown'
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      code: '',
      editorOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-markdown',
        theme: 'material',
        lineWrapping: true,
        lineNumbers: true,
        line: true,
        // 高级配置（需要引入对应的插件包）,codemirror advanced options(You need to manually introduce the corresponding codemirror function script code)
        // sublime、emacs、vim三种键位模式，支持你的不同操作习惯
        keyMap: 'sublime',
        // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
        extraKeys: { 'Ctrl': 'autocomplete' },
        // 代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true }
        // more codemirror options...
        // 如果有hint方面的配置，也应该出现在这里
      },
      tagText: '',
      categoryList: [],
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
    onEditorReady (editor) {
      // console.log('the editor is readied!', editor)
      editor.setSize('600px', '800px')
    },
    onEditorFocus (editor) {
      // console.log('the editor is focus!', editor)
    },
    onEditorCodeChange (newCode) {
      // console.log('this is new code', newCode)
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
    renderHtml (html) {
      this.article.html = html
    },
    renderToc (html) {
      this.toc = html
    },
    clearToc () {
      this.toc = ''
    },
    async postAction () {
      await this.postArticle(this.article)
      this.$router.replace({name: 'DashBoard'})
    }
  },
  computed: {
    editor () {
      return this.$refs.myEditor.editor
    }
  },
  async created () {
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
  async mounted () {

  },
  components: {
    VueMarkdown
  }
}
</script>
<style lang="scss" scoped>

.Article{
  width: 1200px;
  margin: 0 auto;
  input[class=routeInput],
  input[class=title] {
    width: 100%;
  }
  input[class=title]{
    font-size: 20px;
    margin-bottom: 6px;

  }
  .router{
    display: flex;
    margin-bottom: 6px;
    button{
      width: 100px;
      background: #000;
      color: #fff;
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
      margin: 0;
      display: flex;
      li{
        input[type=radio]{
          display: block;
          margin-right: 10px;
        }
        cursor: pointer;
        margin-left: -1px;
        border:1px solid #000;
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
    .toc{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 100;
      padding: 3px;
      border: 1px solid #000;
      background: #faed7c;
      font-weight: bold;
      .toc-title{
        background: #000;
        color: #fff;
        padding: 2px;
      }
    }
  }
}
.btnBar{
  display: flex;
  justify-content: space-between;
  ul{
    li{
      display: inline-flex;
      padding: 8px 10px;
      border: 2px solid #000;
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
      color: #fff;
    }
  }
}
</style>
