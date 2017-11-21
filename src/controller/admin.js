const Base = require('./adminBase.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
};
