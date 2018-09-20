import axios from 'axios';
const Base = require('../adminBase.js');
module.exports = class extends Base {
  /**
   * 百度翻译接口
   * 根据文章标题翻译路由名称
   */
  async tranRouteAction() {
    const keyWord = this.post('key');

    const q = keyWord;
    const key = 'NblJ36jLqoL8mKEsevzh';
    const from = 'auto';
    const to = 'en';
    const appid = '20160218000012560';
    const salt = (new Date()).getTime();
    const sign = think.md5(appid + q + salt + key);

    const tran = await axios({
      url: 'http://fanyi-api.baidu.com/api/trans/vip/translate',
      method: 'get',
      params: {
        q: q,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      }
    });
    return this.success(tran.data.trans_result[0]);
  }
  async postArticleAction() {
    const data = this.post();
    const timeStamp = parseInt(Date.now() / 1000);
    var removeMd = require('remove-markdown');
    data.summary = removeMd(this.post('content').split('[===]')[0]).replace(/\n/g, '');
    const dataJSON = {
      title: data.title,
      routename: data.routename,
      cateid: data.cate,
      content: data.content,
      html: data.html,
      summary: data.summary,
      show: data.show,
      tags: data.tags.join('|'),
      date: timeStamp,
      lastdate: timeStamp
    };
    const pushUrl = `http://www.wangwenbo.me/article/${dataJSON.routename}.html`;
    if (think.isEmpty(data.id)) {
      await this.model('article').add(dataJSON);
      await this.pushBaiDuUrl('add', pushUrl);
    } else {
      delete dataJSON.date;
      await this.model('article').where({id: data.id}).update(dataJSON);
      await this.pushBaiDuUrl('update', pushUrl);
    }

    return this.success();
  }
  async updateArticleAction() {
    const id = this.post('id');
    const data = await this.model('article').where({id: parseInt(id)}).find();
    return this.success(data);
  }
  // 百度链接实时手动推送接口
  async pushBaiDuUrl(action, url) {
    const site = 'www.wangwenbo.me';
    const token = 'Bypwxwk1t804JAxQ';
    if (action === 'add') {
      await axios({
        url: `http://data.zz.baidu.com/urls?site=${site}&token=${token}`,
        method: 'post',
        data: url
      });
    }
    if (action === 'update') {
      await axios({
        url: `http://data.zz.baidu.com/update?site=${site}&token=${token}`,
        method: 'post',
        data: url
      });
    }
  }
};
