import axios from 'axios';
const Base = require('../adminBase.js');
const os = require('os');
module.exports = class extends Base {
  async getAction() {
    const page = this.post('page');
    const filter = this.post('filter');
    const listrows = this.config('adminPageSize');
    const list = await this.model('article')
      .where({
        show: filter
      })
      .order({
        show: 'ASC',
        id: 'DESC'
      })
      .page(page, listrows)
      .countSelect();
    return this.success(list);
  }
  async delAction() {
    const id = this.post('id');
    const del = await this.model('article').where({id: id}).delete();
    return this.success(del);
  }
  async searchAction() {
    const key = this.post('key');
    const search = await this.model('article').where({title: ['like', `%${key}%`]}).field('title,show').select();
    return this.success(search);
  }
  /**
   * 0置顶文章
   * 1页面
   * 2草稿
   * 3已发布
   */ 
  async getCountAction() {
    const aricleTotal = await this.model('article').count();
    const draftsTotal = await this.model('article').where({show: 2}).count();
    const cateTotal = await this.model('category').count();
    const thinkV = think.version;
    const nodeV = process.version;
    const OSi = {
      type: os.type(),
      arch: os.arch(),
      release: os.release(),
      uptime: os.uptime(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus()
    };
    return this.success({
      aricleTotal,
      draftsTotal,
      cateTotal,
      thinkV,
      nodeV,
      OSi
    });
  }

  async getWeatherAction() {
    const uri = 'https://free-api.heweather.com/s6/weather/now';
    const weather = await axios({
      url: uri,
      method: 'get',
      params: {
        location: '北京',
        key: '61f141a54cae490bbac449cb5070c6af'
      }
    });
    return this.success(weather.data);
    // console.log(weather.data);
  }

  async delCacheAction() {
    await think.rmdir(think.ROOT_PATH + '/runtime', true);
  }
};
