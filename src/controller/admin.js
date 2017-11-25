const Base = require('./adminBase.js');

module.exports = class extends Base {
  async indexAction() {
    await this.display();
  }
};
