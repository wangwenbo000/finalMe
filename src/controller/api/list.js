import axios from 'axios';
const Base = require('../adminBase.js');
const os = require('os');
module.exports = class extends Base {
  async getAction() {
    const page = this.post('page');
    const filter = this.post('filter');
    const list = await this.model('article')
      .where({
        show: filter
      })
      .order({
        show: 'ASC',
        id: 'DESC'
      })
      .page(page, 20)
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
    const uri = 'http://www.sojson.com/open/api/weather/json.shtml';
    const weather = await axios({
      url: uri,
      method: 'get',
      params: {
        city: '北京'
      }
    });
    return this.success(weather.data);
  }

  async delCacheAction() {
    await think.rmdir(think.ROOT_PATH + '/runtime', true);
  }
};