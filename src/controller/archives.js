const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }
  async indexAction() {
    const archiveslist = await this.modelInstance.where({show: ['NOTIN', [0, 1, 2]]}).order('date DESC').select();
    this.assign('archiveList', this.gatherPost(archiveslist));
    const tags = await this.modelInstance.where({tags: ['!=', ''], show: ['NOTIN', [0, 1, 2]]}).field('tags').select();
    let tagArr = [];
    const tagsRes = [];
    const dataMap = [];
    for (const t in tags) {
      tagArr = tagArr.concat(tags[t].tags.split('|'));
    }
    for (const t in tagArr) {
      var tagJson = {};
      if (tagsRes.indexOf(tagArr[t]) === -1) {
        tagJson = {
          name: tagArr[t],
          count: 1
        };
        tagsRes.push(tagArr[t]);
        dataMap.push(tagJson);
      } else {
        for (var ta in dataMap) {
          if (dataMap[ta].name === tagArr[t]) {
            dataMap[ta].count++;
          }
        }
      }
    }
    this.assign({
      tagsList: dataMap,
      tagsLength: dataMap.length
    });
    return this.display();
  }
};
