<template>
<div class="List">
  <table>
    <tr>
      <td style="position:relative" colspan="2">
        <input type="text" placeholder="keywords search" name="search" autocomplete="off" @input="searchInput" v-model="keywords">
        <div class="SearchSuggest" v-show="showSuggest">
          <ul>
            <li v-for="item in searchList" :class="item.show===0&&'topItem' || item.show===1&&'pageItem'" @click="typeInKeyword(item.title)">
              <span v-show="!item.show" class="top"><i class="iconfont">&#xe71e;</i></span>
              {{item.title}}
            </li>
          </ul>
        </div>
        <button :disabled="keywords.length<=0">
          <i class="iconfont">&#xe6dd;</i>
        </button>
      </td>
      <td colspan="2">
        <button :class="$route.query.filter === 'list'? 'greenBtn':'blackBtn'"
                @click="showList()">
                <i class="iconfont">&#xe684;</i>
        </button>
        <button class="blackBtn" @click="lodaData($route.query.page || 1)"><i class="iconfont">&#xe6ea;</i></button>
        <button @click="filterData(3)"
                :class="$route.query.filter === 'article'? 'greenBtn':'blackBtn'">
                <i class="iconfont">&#xe6a0;</i> 已发布
        </button>
        <button @click="filterData(2)"
                :class="$route.query.filter === 'drafs'? 'greenBtn':'blackBtn'">
                <i class="iconfont">&#xe6b6;</i> 草稿箱
        </button>
        <button @click="filterData(1)"
                :class="$route.query.filter === 'page'? 'greenBtn':'blackBtn'">
                <i class="iconfont">&#xe6b6;</i> 页面
        </button>
        <span v-show="loadingData" class="spinner spinnerBig"></span>
      </td>
    </tr>
    <!-- <tr>
      <td colspan="4">
        <Chart></Chart>
      </td>
    </tr> -->
    <tr>
      <th>Title | route | tags</th>
      <th width="10">Comment</th>
      <th width="180">Date</th>
      <th width="126">Action</th>
    </tr>
    <tr v-show="actMsg">
      <td colspan="4" align="center" style="background:#44b549;color:#fff;">
        数据删除成功
      </td>
    </tr>
    <tr v-if="dataList.count === 0">
      <td colspan="4" align="center" style="background:#faed7c;">
        还没有数据 <router-link tag="a" :to="{name:'Article'}">[发布第一条数据]</router-link>
      </td>
    </tr>
    <tr class="data" v-for="item in dataList.data" :class="item.show===0&&'topItem' || item.show===1&&'pageItem'">
      <router-link tag="td" :to="{name:'Article', query:{action:'edit',id:item.id}}">
        <span v-show="!item.show" class="top"><i class="iconfont">&#xe71e;</i></span>
        <strong>{{item.title}}</strong>
        <span class="routename"><i class="iconfont">&#xe616;</i> {{item.routename}}</span>
        <span class="tagname"><i class="iconfont">&#xe719;</i> {{item.tags.split('|').length}}</span>
      </router-link>
      <td class="tcenter">{{item.comment}}</td>
      <td class="tcenter">{{$moment.unix(item.date).format('llll')}}</td>
      <td class="tcenter">
        <router-link tag="button" :to="{name:'Article', query:{action:'edit',id:item.id}}">
          <i class="iconfont">&#xe6b9;</i>
          编辑
        </router-link>
        <button @click="showDelBoxFn(item.id)" class="cancelBtn">
          <i class="iconfont">&#xe6bb;</i>
          删除
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
      <td colspan="4">
        <zpagenav :page="dataList.currentPage"
          :page-size="dataList.pagesize"
          :total="dataList.count"
          :max-link="5"
          :page-handler="pageHandler"
          :create-url="createUrl"></zpagenav>
      </td>
    </tr>
  </table>
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
import { mapActions, mapState } from 'vuex'
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
      'delitem'
    ]),
    async lodaData (page) {
      this.loadingData = true
      await this.getList()
      this.loadingData = false
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
button{
  display: inline-block;
  width: auto;
  // padding: 4px 6px;
}
input[name=search]{
  width: 94.7%;
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
.top{
  color:#ff0000;
}
.topItem{
  background: #faed7c;
  cursor: pointer;
}
.pageItem{
  background: #dfeefb;
  cursor: pointer;
}
</style>


