module.exports = class extends think.Model {
  get relation() {
    return {
      category: {
        type: think.Model.HAS_ONE,
        key: 'cateid',
        fKey: 'id',
        name: 'cateName',
        relation: false
        // field: 'id name',
      }
    };
  }
  async getlist(pn, listrows, pnPosition) {
    const list = await this.setRelation('category').where({'show': ['NOTIN', [1, 2]]})
      .order({'show': 'ASC', 'id': 'DESC'})
      .page(pn, listrows)
      .countSelect(pnPosition);
    return list;
  }
};
