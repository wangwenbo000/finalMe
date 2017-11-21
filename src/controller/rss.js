import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }

  async indexAction() {
    var rssConfig = think.config('rss');

    if (!rssConfig.rss_on) {
      return this._404Action();
    }
    const list = await this.modelInstance
      .limit(0, rssConfig.rss_show_num)
      .order('`date` DESC')
      .select();

    const updateTime = await this.modelInstance
      .order('`lastdate` DESC')
      .getField('lastdate', 1);

    this.assign('list', list);
    this.assign('updateTime', updateTime);

    this.header('Content-Type', 'text/xml');
    return this.display('rss_index.xml');
  }
}
