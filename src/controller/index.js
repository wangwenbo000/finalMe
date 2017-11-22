const Base = require('./base.js');

module.exports = class extends Base {
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }
  async indexAction() {
    const pn = this.get('pn');
    const listrows = this.config('pagesize');
    const pnTotal = await this.modelInstance
      .where({show: ['NOTIN', [0, 1, 2]]})
      .count();
    const pnPosition = !(pn > Math.ceil(pnTotal / listrows));
    const data = await this.model('article').getlist(pn, listrows, pnPosition);
    this.assign({
      articleList: data
    });
    return this.display();
  }
};
