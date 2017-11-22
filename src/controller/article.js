const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }
  async itemAction(http) {
    const routename = this.get('routename');
    var list = await this.modelInstance.where({'routename': routename}).select();
    var hljs = require('highlight.js');
    var md = require('markdown-it')({
      html: true,
      linkify: false,
      typography: true,
      breaks: true,
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) {
          }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
    md.use(require('markdown-it-imsize'), {autofill: true});
    md.use(require('markdown-it-emoji'));
    md.use(require('markdown-it-toc-and-anchor').default);
    list[0].content = md.render(list[0].content.replace('[===]', ''));
    list[0].content = list[0].content.replace(/img([\s\S]*?)src=/g, 'img class="lazyload" data-src=');
    this.assign({
      'article': list[0],
      'suggestList': await this.suggestlist(list[0].cateid, list[0].id),
      'p': await this.pagination({'>': list[0].id}, 'ID ASC'),
      'n': await this.pagination({'<': list[0].id}, 'ID DESC')
    });
    return this.display();
  }
  async suggestlist(cateid, id) {
    var suggest = await this.modelInstance.where({
      'cateid': cateid,
      'id': {'!=': id},
      show: ['NOTIN', [0, 1, 2]]
    }).field('title,date,routename').page(0, 5).select();
    return suggest;
  }
  async pagination(action, order) {
    const data = await this.modelInstance.where({
      id: action
    })
      .field('title,routename')
      .order(order)
      .limit(1)
      .countSelect();
    return data.count ? data.data[0] : false;
  }
  async tagAction() {
    var tag = decodeURIComponent(this.get('tag'));
    var articleListForTags = await this.modelInstance
      .where({
        tags: ['like', '%' + tag + '%'],
        show: ['NOTIN', [0, 2, 4]]
      })
      .countSelect();
    this.assign({
      'articleListForTag': articleListForTags,
      'tagName': tag
    });
    return this.display();
  }
};
