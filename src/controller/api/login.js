const Base = require('../adminBase.js');
var PasswordHash = require('phpass').PasswordHash;
var passwordHash = new PasswordHash();

module.exports = class extends Base {
  async loginAction() {
    const userName = this.post('userName');
    const passWord = this.post('passWord');
    const loginInfo = await this.model('admin').where({username: userName}).find();
    if (think.isEmpty(loginInfo)) {
      this.ctx.throw(401, 'access_denied');
    }
    const success = passwordHash.checkPassword(passWord, loginInfo.password);
    if (loginInfo.username === userName && success) {
      await this.session('userInfo', {username: userName, password: passWord});
      return this.success({
        username: userName,
        id: loginInfo.id
      });
    } else {
      this.ctx.throw(401, 'access_denied');
    }
  }
};
