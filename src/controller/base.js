import moment from 'moment';
module.exports = class extends think.Controller {
  async __before() {
    const articleM = this.model('article');
    const newTitle = await articleM.cache(3600)
      .where({show: ['NOTIN', [0, 1, 2]]})
      .field('title')
      .order('id DESC')
      .find();
    var isSupportBrowser = await this.ctx.post();
    isSupportBrowser = !think.isEmpty(isSupportBrowser) || false;
    return this.assign({
      newArticle: newTitle.title,
      isSupportBrowser: isSupportBrowser,
      version: think.version
    });
  }
  date(date, format = 'MM月DD, YYYY') {
    return think.datetime(date * 1000, format);
  }
  gatherPost(list) {
    const dateMap = {};

    list.forEach(post => {
      const key = moment(post.date).format('YYYY-MM');
      if (!dateMap[key]) {
        dateMap[key] = {
          date: post.date,
          list: []
        };
      }

      dateMap[key].list.push(post);
    });
    return Object.keys(dateMap).map(key => dateMap[key]);
  }
};
