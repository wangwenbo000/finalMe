const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }
  async indexAction() {
    // var archiveslist = await this.modelInstance.where({show: ['NOTIN', [0, 2, 4]]}).order('date DESC').select();
    var list = await this.model('category').getlist();
    // this.assign('categoriesList',this.gatherCategories(archiveslist));
    console.log(list);
    this.assign('count', list.length);
    this.assign('cate_list', list);
    this.display();
    return this.display();
  }
};
