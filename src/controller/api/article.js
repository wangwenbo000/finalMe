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
    const pushUrl = `https://www.wangwenbo.me/article/${dataJSON.routename}.html`;
    if (think.isEmpty(data.id)) {
      await this.model('article').add(dataJSON);
      // await this.pushBaiDuUrl('add', pushUrl);
    } else {
      delete dataJSON.date;
      await this.model('article').where({id: data.id}).update(dataJSON);
      // await this.pushBaiDuUrl('update', pushUrl);
    }

    return this.success();
  }
  async updateArticleAction() {
    const id = this.post('id');
    const data = await this.model('article').where({id: parseInt(id)}).find();
    return this.success(data);
  }
  async pushUrlForBdAction() {
    const o = this.post();
    const bAction = o.action;
    const routename = o.url;
    const id = o.id;
    const action = bAction ? 'add' : 'update';
    const url = `https://www.wangwenbo.me/article/${routename}.html`;
    const res = await this.pushBaiDuUrl(action, url);
    if (res.hasOwnProperty('error')) {
      let message = '';
      switch (res.message) {
        case 'site error':
          message = '站点未在站长平台验证';
          break;
        case 'empty content':
          message = 'post内容为空';
          break;
        case 'only 2000 urls are allowed once':
          message = '每次最多只能提交2000条链接';
          break;
        case 'over quota':
          message = '超过每日配额了，超配额后再提交都是无效的';
          break;
        case 'token is not valid':
          message = 'token错误';
          break;
        case 'not found':
          message = '接口地址填写错误';
          break;
        case 'internal error, please try later':
          message = '服务器偶然异常，通常重试就会成功';
          break;
      }
      return this.success(res, message);
    } else {
      await this.model('article').updateSync(id);
      return this.success(res, `今日还可以推送${res.remain}条`);
    }
  }
  // 百度链接实时手动推送接口
  async pushBaiDuUrl(action, url) {
    const site = 'www.wangwenbo.me';
    const token = 'Bypwxwk1t804JAxQ';
    let pushData = null;
    if (action === 'add') {
      pushData = await axios({
        url: `http://data.zz.baidu.com/urls?site=${site}&token=${token}`,
        method: 'post',
        data: url
      }).catch(err => {
        return err.response.data;
      });
    }
    if (action === 'update') {
      pushData = await axios({
        url: `http://data.zz.baidu.com/update?site=${site}&token=${token}`,
        method: 'post',
        data: url
      }).catch(err => {
        return err.response.data;
      });
    }
    return pushData.data;
  }
};
