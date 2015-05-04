define(function (require, exports, module) {
  const $ = require('jquery');
  const { View } = require('backbone');
  const MetaView = require('plug/views/users/profile/MetaView');
  const Style = require('extplug/util/Style');

  const ProfileView = View.extend({
    className: 'user-content profile',
    render: function () {
      this.meta = new MetaView({ model: this.model });
      this.$container = $('<div />').addClass('container');
      this.$container.append(this.meta.$el);
      this.$el.append(this.$container);
      this.meta.render();
      this.$container.jScrollPane();
      this.scrollPane = this.$container.data('jsp');
      return this;
    },
    onResize: function (e) {
    },
    remove: function () {
      this.scrollPane && this.scrollPane.destroy();
      this.meta.destroy();
      this.$container.remove();
      this.scrollPane = null;
      this.meta = null;
      this.$container = null;
      this._super();
    }
  });

  ProfileView._style = new Style({
    '#extplug-user-profiles .profile': {
      '.container': {
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',

        // hide Points and Subscribe buttons, since
        // they always show the current user's data
        '.meta .points': { 'display': 'none' }
      }
    }
  });

  module.exports = ProfileView;

});