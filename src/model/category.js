module.exports = class extends think.Model {
  get relation() {
    return {
      article: {
        type: think.Model.HAS_MANY,
        key: 'id',
        fKey: 'cateid',
        name: 'list',
        relation: false
        // field: 'id,title,category'
      }
    };
  }
  async getlist() {
    const list = await this.select();
    return list;
  }
};
