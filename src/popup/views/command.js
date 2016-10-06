var app = require('../app');
var MixIn = require('./mixin');
var _ = require('../../common');

module.exports = {
  mixins: [MixIn],
  mounted: function () {
    this.items.top.push({
      name: _.i18n('menuBack'),
      symbol: 'arrow-left',
      onClick: function () {
        app.navigate();
      },
    });
  },
  watch: {
    'store.commands': 'update',
  },
  methods: {
    updateView: function () {
      var _this = this;
      _this.items.bot = _this.store.commands.map(function (item) {
        return {
          name: item[0],
          symbol: 'right-hand',
          className: 'ellipsis',
          onClick: function (options) {
            chrome.tabs.sendMessage(_this.store.currentTab.id, {
              cmd: 'Command',
              data: options.name,
            });
          },
        };
      });
    },
  },
};
