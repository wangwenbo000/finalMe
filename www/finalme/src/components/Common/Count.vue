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
        <span>Thinkjs Vesion</span>
        <h2>{{count.thinkV}}</h2>
      </li>
      <li>
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
        <button class="yellowBtn cleanRunTime" @click="showCacheBoxFn">清除缓存</button>
      </li>
      <li>
        <span>Backup</span>
        <div class="backSQL">
          <i class="iconfont">&#xe69b;</i>
        </div>
      </li>
    </ul>
    <ul class="left">
      <li class="weather">
        <span>Weather</span>
        <h2>{{weather.data.wendu}}℃</h2>
      </li>
      <li class="weatherInfo">
        <div><strong>pm2.5: {{weather.data.pm25}}</strong></div>
        <div>湿度: {{weather.data.shidu}}</div>
        <div>空气质量:
          <span :style="weather.data.quality==='重度污染'&&'color:#ff0000;'">
            <span v-text="weather.data.quality==='重度污染'?'😷':''"></span>
            {{weather.data.quality}}
          </span>
        </div>
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
    await this.getWeather()
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
  width: 1200px;
  margin: 0 auto;
  display: flex;
  .left{
    display: flex;
    margin-right: 6px;
    li{
      padding: 10px 10px 8px 10px;
      background: #efefef;
      height: 52px;
      border: 2px solid #000;
      margin-left: -2px;
      &:first-child{
        margin: 0;
      }
      h2{
        font-size: 38px;
        margin: 0;
        padding: 0;
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
    }
    .weatherInfo{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

</style>


