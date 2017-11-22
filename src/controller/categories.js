const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }
  async indexAction() {
    var list = await this.model('category').getlist();
    this.assign('count', list.length);
    this.assign('cate_list', list);
    this.display();
    return this.display();
  }
};
