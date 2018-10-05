const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    super.__before();
    this.modelInstance = this.model('article');
  }
  async itemAction(http) {
    const routename = this.get('routename');
    var list = await this.modelInstance.where({'routename': routename}).select();
    // var hljs = require('highlight.js');
    const Prism = require('prismjs');
    const loadLanguages = require('prismjs/components/');
    loadLanguages(['javascript', 'bash', 'objectivec', 'swift']);
    var md = require('markdown-it')({
      html: true,
      linkify: false,
      typography: true,
      breaks: true,
      highlight(str, lang) {
        let hl;
        try {
          hl = Prism.highlight(str, Prism.languages[lang], lang);
        } catch (error) {
          console.error(error);
          hl = md.utils.escapeHtml(str);
        }
        return `<pre class="language-${lang}"><b class="name">${lang}</b><code class="language-${lang}">${hl}</code></pre>`;
      }
    });
    md.use(require('markdown-it-for-inline'), 'url_new_win', 'link_open', function(tokens, idx) {
      tokens[idx].attrPush([ 'target', '_blank' ]);
    });
    md.use(require('markdown-it-for-inline'), 'lazyload', 'image', function(tokens, idx) {
      tokens[idx].attrPush([ 'class', 'lazyload' ]);
      tokens[idx].attrPush([ 'data-src', tokens[idx].attrs[0][1] ]);
      tokens[idx].attrs[0][1] = '';
    });
    md.use(require('markdown-it-for-inline'), 'replace_sign_line', 'text', function(tokens, idx) {
      tokens[idx].content = tokens[idx].content.replace('[===]', '');
    });
    md.use(require('markdown-it-imsize'), {autofill: true});
    md.use(require('markdown-it-toc-and-anchor').default, {
      anchorLinkSymbol: '',
      tocFirstLevel: 2,
      anchorLinkSpace: true
    });
    // md.use(require('markdown-it-prism'), {});

    list[0].content = md.render(list[0].content);
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
      id: action,
      show: ['NOTIN', [0, 1, 2]]
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
