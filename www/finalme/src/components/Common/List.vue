<template>
<div class="List">
  <table>
    <!-- 功能栏 -->
    <tr>
      <!-- 搜索 -->
      <td style="position:relative">
        <!-- 文章搜索 -->
        <input type="text"
               placeholder="keywords search"
               name="search"
               autocomplete="off"
               @input="searchInput"
               v-model="keywords">
        <!-- 搜索推荐下拉 -->
        <div class="SearchSuggest"
             v-show="showSuggest">
          <ul>
            <li v-for="item in searchList"
                :class="item.show===0&&'topItem' || item.show===1&&'pageItem'"
                @click="typeInKeyword(item.title)" :key="item.id">
              <span v-show="!item.show" class="top">
                <i class="iconfont">&#xe71e;</i>
              </span>
              {{item.title}}
            </li>
          </ul>
        </div>
        <button :disabled="keywords.length<=0">
          <i class="iconfont">&#xe6dd;</i>
        </button>
      </td>
      <!-- 向google推送sitemap -->
      <td colspan="2">
        <button>
          Notify&nbsp;<img src="../../assets/img/google.png" width="50">&nbsp;update siteMap
        </button>
      </td>
      <!-- 文章类型筛选 -->
      <td colspan="3">
        <button :class="$route.query.filter === 'list'? 'greenBtn':'blackBtn'"
                @click="showList()">
                <img src="../../assets/img/list.png" width="12">
        </button>
        <button class="blackBtn"
                @click="lodaData($route.query.page || 1)">
                <img src="../../assets/img/refresh.png" width="12">
        </button>
        <button @click="filterData(3)"
                :class="$route.query.filter === 'article'? 'greenBtn':'blackBtn'">
                 <img src="../../assets/img/post.png" width="12">&nbsp;已发布
        </button>
        <button @click="filterData(2)"
                :class="$route.query.filter === 'drafs'? 'greenBtn':'blackBtn'">
                <img src="../../assets/img/draft.png" width="12">&nbsp;草稿箱
        </button>
        <button @click="filterData(1)"
                :class="$route.query.filter === 'page'? 'greenBtn':'blackBtn'">
                <img src="../../assets/img/page.png" width="12">&nbsp;页面
        </button>
        <!-- <span v-show="loadingData" class="spinner spinnerBig"></span> -->
      </td>
    </tr>
    <!-- <tr>
      <td colspan="4">
        <Chart></Chart>
      </td>
    </tr> -->
    <tr>
      <th>Title</th>
      <th width="156">Category</th>
      <th width="10">Comment</th>
      <th width="140">Date</th>
      <th width="58">Push</th>
      <th width="86">Action</th>
    </tr>
    <tr v-show="actMsg">
      <td colspan="6" align="center" style="background:#44b549;color:#fff;">
        数据删除成功
      </td>
    </tr>
    <tr v-if="dataList.count === 0">
      <td colspan="6" align="center" style="background:#faed7c;height:20px;">
        还没有数据 <router-link tag="a" :to="{name:'Article'}">[发布第一条数据]</router-link>
      </td>
    </tr>
    <tr class="data"
        :class="item.show === 0 && 'topItem' || item.show === 1 && 'pageItem'"
        v-for="(item,index) in dataList.data" :key="item.id">
      <router-link tag="td"
                   :to="{name:'Article', query: { action: 'edit', id: item.id }}"
                   :title="item.routename+' | tags:'+item.tags.split('|').length"
                   v-tippy="{followCursor : true, animateFill: false, theme : 'gradient'}">
        <!-- <span v-show="!item.show" class="top">
          <i class="iconfont">&#xe71e;</i>
        </span> -->
        <img src="../../assets/img/top.png" v-show="!item.show" width="14">
        <img src="../../assets/img/draft.png" v-if="item.show===2" width="12">
        <img src="../../assets/img/post.png" v-if="item.show===3" width="12">
        <img src="../../assets/img/page.png" v-if="item.show===1" width="12">&nbsp;
        <strong>{{item.title}}</strong>
        <!-- <span class="routename"><i class="iconfont">&#xe616;</i>{{item.routename}}</span><br> -->
        <!-- <span class="tagname"><i class="iconfont">&#xe719;</i> {{item.tags.split('|').length}}</span> -->
      </router-link>
      <td class="tcenter">
        <strong>
          {{item.hasOwnProperty('cateName')?item.cateName.name:'未分类'}}
        </strong>
      </td>
      <td class="tcenter">{{item.comment}}</td>
      <td class="tcenter"
          :title="$moment.unix(item.date).format('LLLL')"
          v-tippy="{followCursor : true, animateFill: false}">{{$moment.unix(item.date).format('ll')}}</td>
      <td :title="item.sync?'已推送':'向百度推送本文链接'"
          v-tippy="{followCursor : true, animateFill: false}">
        <a href="javascript:;"
           class="syncBdBtn unlink"
           v-if="item.sync"
           @click="delBdLink">
        </a>
        <a href="javascript:;"
           class="syncBdBtn"
           :class="item.sync===0?'syncBdBtnGray':''"
           @click="pushUrlForBd((item.date===item.lastdate), item.routename, index, item.id)"></a>

      </td>
      <td class="tcenter">
        <router-link tag="button" :to="{name:'Article', query:{action:'edit',id:item.id}}" :title="'编辑'"
                   v-tippy="{followCursor : true, animateFill: false, theme : 'gradient'}">
          <i class="iconfont">&#xe6b9;</i>
          <!-- 编辑 -->
        </router-link>
        <button @click="showDelBoxFn(item.id)"
                class="cancelBtn"
                :title="'删除'"
                v-tippy="{followCursor : true, animateFill: false, theme : 'gradient'}">
          <i class="iconfont">&#xe6bb;</i>
          <!-- 删除 -->
        </button>
        <!-- <button @click="showTopBoxFn(item.id)" v-show="item.show">
          <i class="iconfont">&#xe71e;</i>
        </button> -->
        <!-- <button @click="" v-show="!item.show">
          <i class="iconfont">&#xe71d;</i>
        </button> -->
      </td>
    </tr>
    <tr>
      <td colspan="6">
        <zpagenav :page="dataList.currentPage"
          :page-size="dataList.pagesize"
          :total="dataList.count"
          :max-link="5"
          :page-handler="pageHandler"
          :create-url="createUrl"></zpagenav>
      </td>
    </tr>
  </table>
  <div id="titleMorInfo">

  </div>
  <MsgBox :show="showDelBox"
          @close="closeDelBox"
          @submit="delAction"
          title="即将进入删除操作"
          :content="`<strong style='font-size:22px;'><i class='iconfont' style='font-weight:100;margin-right:10px;color:#ff0000;'>&#xe728;</i>确定删除记录？</strong>`">
  </MsgBox>
</div>

</template>
<script>
import MsgBox from './MessageBox'
import { mapActions, mapState, mapMutations } from 'vuex'
import Chart from '@/components/Common/Chart'
export default {
  name: 'List',
  data () {
    return {
      loadingData: true,
      actMsg: false,
      showDelBox: false,
      showSuggest: false,
      keywords: '',
      delPoint: null
    }
  },
  components: {
    MsgBox,
    Chart
  },
  async created () {
    await this.lodaData(this.$route.query.page || 1)
  },
  watch: {
    '$route': async function (n, o) {
      await this.lodaData(n.query.page || 1)
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.List.list,
      searchList: state => state.List.search
    })
  },
  methods: {
    ...mapActions([
      'getList',
      'search',
      'delitem',
      'pushBd'
    ]),
    ...mapMutations([
      'changePushState'
    ]),
    async lodaData (page) {
      // this.loadingData = true
      this.$message({message: '数据请求', type: 'info'})
      await this.getList()
      // this.loadingData = false
      this.$message({message: '数据请求完成'})
    },
    async pushUrlForBd (action, url, index, id) {
      this.$message({message: '推送请求已发送', type: 'info'})
      const res = await this.pushBd({action, url, id})
      if (res.data.data.hasOwnProperty('error')) {
        this.$message({message: res.data.errmsg, type: 'error'})
      } else {
        this.$message({message: `已经把链接推送给百度了, ${res.data.errmsg}`})
        this.changePushState(index)
      }
    },
    async delBdLink () {

    },
    showList () {
      this.$router.push({
        name: 'DashBoard',
        query: {
          filter: 'list'
        }
      })
    },
    showDelBoxFn (id) {
      this.showDelBox = true
      this.delPoint = id
    },
    closeDelBox (boolean) {
      this.showDelBox = boolean
    },
    closePushErr (boolean) {
      this.showPushErr = boolean
    },
    pageHandler (page) {
      const filter = this.$route.query.filter || 'list'
      this.$router.push({
        name: 'DashBoard',
        query: {
          filter: filter,
          page: page
        }
      })
    },
    async delAction () {
      await this.delitem(this.delPoint)
      this.closeDelBox(false)
      this.actMsg = true
      setTimeout(() => {
        this.actMsg = false
      }, 2000)
    },
    createUrl () {
      return ''
    },
    filterData (n) {
      const page = this.$route.query.page || 1
      switch (n) {
        case 3:
          this.$router.push({
            query: {
              filter: 'article',
              page: page
            }
          })
          break
        case 2:
          this.$router.push({
            query: {
              filter: 'drafs',
              page: page
            }
          })
          break
        case 1:
          this.$router.push({
            query: {
              filter: 'page',
              page: page
            }
          })
          break
      }
    },
    typeInKeyword (key) {
      this.keywords = key
      this.showSuggest = false
    },
    async searchInput () {
      if (this.keywords === '') {
        this.showSuggest = false
        return false
      }
      if (this.searchList.length > 0) {
        this.showSuggest = true
      }
      await this.search(this.keywords)
    }
  }
}
</script>
<style lang="scss" scoped>
.tcenter{
  text-align: center;
}
.List{
  width: 960px;
  margin: 0 auto;
  margin-top: 10px;
}
.syncBdBtn{
  display: inline-block;
  background: url('../../assets/img/bd.jpg') no-repeat center;
  width: 16px;
  height: 16px;
}
.unlink{
  background: url('../../assets/img/unlink.png') no-repeat center;
}
.syncBdBtnGray{
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
button{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // padding: 4px 6px;
}
input[name=search]{
  width: 90%;
  box-sizing: border-box;
  text-align: left;
}
.SearchSuggest{
  position: absolute;
  width: 805px;
  max-height: 200px;
  background: #fff;
  border: 1px solid #000;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  z-index: 1000;
  ul{
    width: 100%;
    overflow-y: scroll;
    max-height: 100px;
    &::-webkit-scrollbar {
      background-color: #fff;
      width: 6px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #000;
    }
    li{
      border-bottom: 1px solid #000;
      padding: 6px 10px;
      cursor: pointer;
      &:last-child{
        border: none;
      }
      &:hover{
        background: #2b2b2b;
        color: #faed7c;
      }
    }
  }
}
.routename, .tagname{
  margin-left: 10px;
  border: 1px solid #2b2b2b;
  padding: 0 2px;
  i{
    border-right: 1px solid #2b2b2b;
    padding-right: 3px;
  }
}
.tagname{
  margin-left: 0;
  margin-right: 10px;
  margin-top: 10px;
  // display: block
}
.top{
  color:#ff0000;
}
.topItem{
  background: #f0ebc0;
  cursor: pointer;
}
.pageItem{
  background: #e3eaf0;
  cursor: pointer;
}
</style>


