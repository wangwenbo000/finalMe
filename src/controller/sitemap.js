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
    const list = await this.modelInstance.where({show: ['!=', 2]}).order('`date` DESC').field('date,routename').select();
    this.assign('list', list);
    this.header('Content-Type', 'text/xml');
    return this.display('sitemap.xml');
  }
}
