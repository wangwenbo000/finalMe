<template>
  <div class="Count">
    <ul class="left">
      <li>
        <span>Articles</span>
        <h2>{{count.aricleTotal}}</h2>
      </li>
      <li>
        <span>Drafts</span>
        <h2>{{count.draftsTotal}}</h2>
      </li>
      <li>
        <span>Cates</span>
        <h2>{{count.cateTotal}}</h2>
      </li>
    </ul>
    <ul class="left">
      <li>
        <span>Node Vesion</span>
        <h2>{{count.nodeV}}</h2>
      </li>
      <li>
        <span>Think Vesion</span>
        <h2>{{count.thinkV}}</h2>
      </li>
      <li class="upTime">
        <span>UpTime</span>
        <h2>{{parseInt(count.OSi.uptime/60/60)}}h</h2>
      </li>
      <li class="memery">
        <div class="memeryText">
           Free: {{(count.OSi.totalmem/1024/1024/1024).toFixed(2)}}GB
        </div>
        <div class="memeryBar">
          <span :style="{width:memCount+'%'}">
            {{(count.OSi.totalmem/1024/1024/1024-count.OSi.freemem/1024/1024/1024).toFixed(2)}}GB
          </span>
        </div>
      </li>
    </ul>
    <ul class="left">
      <li>
        <span>Cache</span>
        <div class="spinner" v-show="showCacheLoad"></div>
        <button class="yellowBtn cleanRunTime" @click="showCacheBoxFn">
          <img src="../../assets/img/clear.png" alt="">
        </button>
      </li>
      <li>
        <span>Backup</span>
        <!-- <div class="backSQL">
          <i class="iconfont">&#xe69b;</i>
        </div> -->
        <button class="yellowBtn cleanRunTime" @click="showCacheBoxFn">
          <img src="../../assets/img/sql.png" alt="">
        </button>
      </li>
    </ul>
    <ul class="left lastCountBox">
      <li class="weather">
        <span>Weather</span>
        <h2>{{weather.now.tmp}}℃</h2>
      </li>
      <li class="weatherInfo">
        <div><strong>{{weather.now.cond_txt}}</strong></div>
        <div>体感温度: {{weather.now.fl}}℃</div>
        <div>湿度: {{weather.now.hum}}</div>
        <!-- <div>空气质量:
          <span :style="weather.data.quality==='重度污染'&&'color:#ff0000;'">
          <span v-text="weather.data.quality==='重度污染'?'😷':''"></span>
            {{weather.data.quality}}
          </span>
        </div> -->
      </li>
    </ul>

    <MsgBox :show="showCacheBox"
          @close="closeCacheBox"
          @submit= "cleanSubmit"
          title="清理缓存"
          :content="`<strong style='font-size:22px;'>确定清理运行缓存？</strong><div style='margin-top:8px;color:#666;'>清理缓存需要重新登录</div>`">
    </MsgBox>
  </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'
import MsgBox from './MessageBox'
export default {
  name: 'Count',
  data () {
    return {
      showCacheLoad: false,
      showCacheBox: false
    }
  },
  components: {
    MsgBox
  },
  async created () {
    await this.getCount()
    if (process.env.NODE_ENV !== 'development') {
      await this.getWeather()
    }
  },
  computed: {
    ...mapState({
      count: state => state.Count.count,
      weather: state => state.Count.weather
    }),
    memCount () {
      return parseInt((this.count.OSi.totalmem - this.count.OSi.freemem) / this.count.OSi.totalmem * 100)
    }
  },
  methods: {
    ...mapActions([
      'getCount',
      'getWeather',
      'delCache'
    ]),
    showCacheBoxFn () {
      this.showCacheBox = true
    },
    closeCacheBox () {
      this.showCacheBox = false
    },
    async cleanSubmit () {
      await this.cleanCache()
      this.showCacheBox = false
      alert('缓存清理成功')
    },
    async cleanCache () {
      this.showCacheLoad = true
      await this.delCache()
      this.showCacheLoad = false
    }
  }
}
</script>
<style lang="scss" scoped>
.Count{
  width: 960px;
  margin: 0 auto;
  display: flex;

  .left{
    display: flex;
    margin-right: 6px;
    .upTime{
      width: 100px;
    }

    li{
      padding: 10px 10px 8px 10px;
      background: #fff;
      height: 52px;
      border: 1px solid #efefef;
      margin-left: -2px;
      &:first-child{
        margin: 0;
      }
      h2{
        font-size: 32px;
        margin: 0;
        padding: 0;
        padding: 6px 0;
        text-align: center;
        font-weight: normal;
      }
    }
    .memery{
      padding: 0;
      width: 100px;
      height: 70px;
      display: flex;
      flex-direction: column;
      .memeryText{
        padding: 10px 0 0 10px;
      }
      .memeryBar{
        background: #e1efe6;
        background-image:linear-gradient(45deg, #d5e7da 50%, transparent 0);
        background-size: 11px 11px;
        height: 42px;
        margin-top: 4px;
        border-top: 1px solid #42b649;
        span{
          display: flex;
          width: 0;
          align-items: center;
          justify-content: center;
          color: #fff;
          height: 42px;
          background: #44b549;
          transition: width .6s;
          overflow: hidden;
        }
      }
    }
    .backSQL{
      font-size: 38px;
      margin-top: 4px;
      cursor: pointer;
      &:hover{
        color: #000;
      }
    }
    .cleanRunTime{
      display: block;
      margin-top: 12px;
    }
    .weather{
      background: url('../../assets/img/sky.jpg') no-repeat center;
      background-size: cover;
      color: #fff;
      width: 44%;
    }
    .weatherInfo{
      display: flex;
      width: 56%;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .lastCountBox{
    margin-right: 0;
    width: 100%;
  }
}

</style>


