import Vue from 'vue';
const ebAtomActions = Vue.prototype.$meta.module.get('a-base').options.mixins.ebAtomActions;
export default {
  meta: {
    global: false,
  },
  mixins: [ ebAtomActions ],
  props: {
    layoutManager: {
      type: Object,
    },
    layout: {
      type: Object,
    },
    blockConfig: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user.op;
    },
  },
  mounted() {
    this.$meta.eventHub.$on('atom:star', this.onStarChanged);
    this.$meta.eventHub.$on('atom:labels', this.onLabelsChanged);
    this.$meta.eventHub.$on('atom:action', this.onActionChanged);
  },
  beforeDestroy() {
    this.$meta.eventHub.$off('atom:star', this.onStarChanged);
    this.$meta.eventHub.$off('atom:labels', this.onLabelsChanged);
    this.$meta.eventHub.$off('atom:action', this.onActionChanged);
  },
  methods: {
    onItemClick(event, item) {
      return this.onAction(event, item, {
        module: item.module,
        atomClassName: item.atomClassName,
        name: 'read',
      });
    },
    onSwipeoutOpened(event, item) {
      if (item._actions) return;
      this.$api.post('/a/base/atom/actions', {
        key: { atomId: item.atomId },
        basic: true,
        bulk: false,
      }).then(data => {
        Vue.set(item, '_actions', data);
      });
    },
    onLabel(event, item) {
      // anonymous
      if (this.user.anonymous) {
        this.$view.dialog.confirm(this.$text('Please Sign In')).then(() => {
          // login
          this.$meta.vueLayout.openLogin();
        });
        return;
      }
      // navigate
      this.$view.navigate(`/a/base/atom/labels?atomId=${item.atomId}`, {
        target: '_self',
      });
      this.$meta.util.swipeoutClose(event.target);
    },
    onStarSwitch(event, item) {
      const star = item.star ? 0 : 1;
      return this._onStarSwitch(event, item, star, 'swipeoutClose');
    },
    onAction(event, item, action) {
      const _action = this.getAction(action);
      if (!_action) return;
      return this.$meta.util.performAction({ ctx: this, action: _action, item })
        .then(() => {
          this.$meta.util.swipeoutClose(event.target);
        });
    },
    onStarChanged(data) {
      const index = this.layout.items.findIndex(item => item.atomId === data.key.atomId);
      if (index !== -1) {
        this.layout.items[index].star = data.star;
      }
    },
    onLabelsChanged(data) {
      const index = this.layout.items.findIndex(item => item.atomId === data.key.atomId);
      if (index !== -1) {
        this.layout.items[index].labels = JSON.stringify(data.labels);
      }
    },
    onActionChanged(data) {
      const key = data.key;
      const action = data.action;
      // create
      if (action.menu === 1 && action.action === 'create') {
        // do nothing
        return;
      }
      // delete
      const index = this.layout.items.findIndex(item => item.atomId === key.atomId);
      if (action.name === 'delete') {
        if (index !== -1) {
          this.layout.items.splice(index, 1);
        }
        return;
      }
      // others
      if (index !== -1) {
        this.$api.post('/a/base/atom/read', {
          key,
        }).then(data => {
          Vue.set(this.layout.items, index, data);
        });
      }
    },
    _onStarSwitch(event, item, star, swipeoutAction) {
      // anonymous
      if (this.user.anonymous) {
        this.$view.dialog.confirm(this.$text('Please Sign In')).then(() => {
          // login
          this.$meta.vueLayout.openLogin();
        });
        return;
      }
      // key
      const key = {
        atomId: item.atomId,
        itemId: item.itemId,
      };
      //
      return this.$api.post('/a/base/atom/star', {
        key,
        atom: { star },
      }).then(data => {
        this.$meta.eventHub.$emit('atom:star', { key, star: data.star, starCount: data.starCount });
        this.$meta.util[swipeoutAction](event.target);
      });
    },
    _getItemMetaMedia(item) {
      const media = (item._meta && item._meta.media) || item.avatar || this.$meta.config.modules['a-base'].user.avatar.default;
      return this.$meta.util.combineImageUrl(media, 32);
    },
    _getItemMetaMediaLabel(item) {
      const mediaLabel = (item._meta && item._meta.mediaLabel) || item.userName;
      return mediaLabel;
    },
    _getItemMetaSummary(item) {
      const summary = (item._meta && item._meta.summary) || '';
      if (this.layoutManager.atomClass) {
        return summary;
      }
      const atomClass = this.layoutManager.getAtomClass({
        module: item.module,
        atomClassName: item.atomClassName,
      });
      if (!atomClass) return summary;
      return `${atomClass.titleLocale} ${summary}`;
    },
    _getItemMetaFlags(item) {
      const flags = (item._meta && item._meta.flags);
      if (!flags) return [];
      if (Array.isArray(flags)) return flags;
      return flags.split(',');
    },
    _getLabel(id) {
      if (!this.layoutManager.userLabels) return null;
      return this.layoutManager.userLabels[id];
    },
    _getActionColor(action, index) {
      if (index === 0) return 'orange';
      else if (index === 1) return 'red';
      return 'blue';
    },
    _getActionTitle(action, item) {
      const title = this.getActionTitle(action, item.atomStage);
      if (action.code === 3) return this.$device.desktop ? `✏️ ${title}` : '✏️';
      else if (action.code === 4) return this.$device.desktop ? `🗑️ ${title}` : '🗑️';
      return title;
    },
    _renderListItem(item) {
      // media
      const domMedia = (
        <div slot="media">
          <img class="avatar avatar32" src={this._getItemMetaMedia(item)} />
        </div>
      );
      // domHeader
      const domHeader = (
        <div slot="root-start" class="header">
          <div class="mediaLabel">
            <span>{this._getItemMetaMediaLabel(item)}</span>
          </div>
          <div class="date">
            {item.star > 0 && <span>⭐</span>}
            {item.attachmentCount > 0 && <span>🧷</span>}
            {item.attachmentCount > 1 && <span>{`${item.attachmentCount}`}</span>}
            {item.commentCount > 0 && <span>💬</span>}
            {item.commentCount > 1 && <span>{`${item.commentCount}`}</span>}
            <span>{this.$meta.util.formatDateTimeRelative(item.atomUpdatedAt)}</span>
          </div>
        </div>
      );
      // domTitle
      const domTitle = (
        <div slot="title" class="title">
          <div>{item.atomName}</div>
        </div>
      );
      // domSummary
      const domSummary = (
        <div slot="root-end" class="summary">
          { this._getItemMetaSummary(item) }
        </div>
      );
      // domAfter
      const domAfterMetaFlags = [];
      for (const flag of this._getItemMetaFlags(item)) {
        domAfterMetaFlags.push(
          <f7-badge key="flag">{flag}</f7-badge>
        );
      }
      const domAfterLabels = [];
      if (item.labels && this.layoutManager.userLabels) {
        for (const label of JSON.parse(item.labels)) {
          const _label = this._getLabel(label);
          domAfterLabels.push(
            <f7-badge key={label} style={ { backgroundColor: _label.color } }>{ _label.text}</f7-badge>
          );
        }
      }
      const domAfter = (
        <div slot="after" class="after">
          {domAfterMetaFlags}
          {domAfterLabels}
        </div>
      );
      // ok
      return (
        <eb-list-item class="item" key={item.atomId} link="#"
          propsOnPerform={event => this.onItemClick(event, item)}
          swipeout onSwipeoutOpened={event => { this.onSwipeoutOpened(event, item); } }
          onContextmenuOpened={event => { this.onSwipeoutOpened(event, item); } }
        >

          {domMedia}
          {domHeader}
          {domTitle}
          {domSummary}
          {domAfter}
          {this._renderListItemContextMenu(item)}
        </eb-list-item>
      );
    },
    _renderListItemContextMenu(item) {
      // domLeft
      let domLeft;
      if (item.atomStage === 1) {
        domLeft = (
          <div slot="left">
            <div color="teal" propsOnPerform={event => this.onStarSwitch(event, item)}>{this.$device.desktop ? `⭐ ${this.$text(item.star ? 'Unstar' : 'Star')}` : '⭐'}</div>
            <div color="blue" propsOnPerform={event => this.onLabel(event, item)}>{this.$device.desktop ? `🏷️ ${this.$text('Labels')}` : '🏷️'}</div>
          </div>
        );
      }
      // domRight
      const domActions = [];
      if (item._actions) {
        for (let index in item._actions) {
          index = parseInt(index);
          const action = item._actions[index];
          domActions.push(
            <div key={action.id} color={this._getActionColor(action, index)} propsOnPerform={event => this.onAction(event, item, action)}>{this._getActionTitle(action, item)}</div>
          );
        }
      }
      const domRight = (
        <div slot="right" ready={!!item._actions}>
          {domActions}
        </div>
      );

      return (
        <eb-context-menu>
          {domLeft}
          {domRight}
        </eb-context-menu>
      );
    },
    _renderList() {
      const items = this.layout.items;
      const children = [];
      for (const item of items) {
        children.push(this._renderListItem(item));
      }
      return (
        <f7-list>
          {children}
        </f7-list>
      );
    },
  },
  render() {
    return (
      <div>
        {this._renderList()}
      </div>
    );
  },
};
