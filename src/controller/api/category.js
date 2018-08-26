const Base = require('../adminBase.js');
module.exports = class extends Base {
  async getCateAction() {
    const list = await this.model('category').order('id DESC').select();
    return this.success(list);
  }
  async addCateAction() {
    const name = this.post('name');
    const describe = this.post('describe');
    const add = await this.model('category').add({
      name: name, describe: describe
    });
    return this.success(add);
  }
  async delCateAction() {
    const id = this.post('id');
    const del = await this.model('category').where({id: id}).delete();
    return this.success(del);
  }
  async updateCateAction() {
    const id = this.post('id');
    const name = this.post('name');
    const describe = this.post('describe');
    const update = await this.model('category').where({id: id}).update({
      name, describe
    });
    return this.success(update);
  }
};
