module.exports = class extends think.Model {
  get relation() {
    return {
      article: {
        type: think.Model.HAS_MANY,
        key: 'id',
        fKey: 'cateid',
        name: 'list',
        relation: false,
        where: {show: ['NOTIN', [0, 1, 2, 4]]},
        field: 'id,title,cateid'
      }
    };
  }
  async getlist() {
    const list = await this.select();
    return list;
  }
};
