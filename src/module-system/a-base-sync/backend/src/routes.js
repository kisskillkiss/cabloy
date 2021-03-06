module.exports = app => {
  const routes = [
    // base
    { method: 'post', path: 'base/modules', controller: 'base' },
    { method: 'post', path: 'base/locales', controller: 'base' },
    { method: 'post', path: 'base/resourceTypes', controller: 'base' },
    { method: 'post', path: 'base/atomClasses', controller: 'base' },
    { method: 'post', path: 'base/actions', controller: 'base' },
    { method: 'get', path: 'base/performAction', controller: 'base', middlewares: 'jsonp', meta: { auth: { enable: false } } },
    { method: 'get', path: 'base/qrcode', controller: 'base', meta: { auth: { enable: false } } },
    { method: 'post', path: 'base/themes', controller: 'base' },
    // atom
    { method: 'post', path: 'atom/preferredRoles', controller: 'atom' },
    { method: 'post', path: 'atom/create', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 1 } },
    },
    { method: 'post', path: 'atom/read', controller: 'atom',
      meta: { right: { type: 'atom', action: 2 } },
    },
    { method: 'post', path: 'atom/select', controller: 'atom' },
    { method: 'post', path: 'atom/count', controller: 'atom' },
    { method: 'post', path: 'atom/write', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 3, stage: 'draft' } },
    },
    { method: 'post', path: 'atom/openDraft', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 3 } },
    },
    { method: 'post', path: 'atom/submit', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 3, stage: 'draft' } },
    },
    { method: 'post', path: 'atom/writeSubmit', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 3, stage: 'draft' } },
    },
    { method: 'post', path: 'atom/delete', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 4 } },
    },
    { method: 'post', path: 'atom/clone', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 5 } },
    },
    { method: 'post', path: 'atom/enable', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 6 } },
    },
    { method: 'post', path: 'atom/disable', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 7 } },
    },
    {
      method: 'post', path: 'atom/deleteBulk', controller: 'atom', middlewares: 'transaction',
      meta: { right: { type: 'atom', action: 35 } },
    },
    {
      method: 'post', path: 'atom/exportBulk', controller: 'atom',
      meta: { right: { type: 'atom', action: 36 } },
    },
    { method: 'post', path: 'atom/star', controller: 'atom',
      meta: {
        auth: { user: true },
        right: { type: 'atom', action: 2 },
      },
    },
    { method: 'post', path: 'atom/readCount', controller: 'atom',
      meta: { right: { type: 'atom', action: 2, checkFlow: true } },
    },
    { method: 'post', path: 'atom/stats', controller: 'atom' },
    { method: 'post', path: 'atom/labels', controller: 'atom',
      meta: {
        auth: { user: true },
        right: { type: 'atom', action: 2 },
      },
    },
    { method: 'post', path: 'atom/actions', controller: 'atom' },
    { method: 'post', path: 'atom/actionsBulk', controller: 'atom' },
    { method: 'post', path: 'atom/schema', controller: 'atom' },
    { method: 'post', path: 'atom/validator', controller: 'atom' },
    { method: 'post', path: 'atom/checkRightAction', controller: 'atom' },
    // comment
    { method: 'post', path: 'comment/all', controller: 'comment' },
    { method: 'post', path: 'comment/list', controller: 'comment',
      meta: { right: { type: 'atom', action: 2, checkFlow: true } },
    },
    { method: 'post', path: 'comment/item', controller: 'comment',
      meta: { right: { type: 'atom', action: 2, checkFlow: true } },
    },
    { method: 'post', path: 'comment/save', controller: 'comment', middlewares: 'transaction',
      meta: {
        auth: { user: true },
        right: { type: 'atom', action: 2, checkFlow: true },
      },
    },
    { method: 'post', path: 'comment/delete', controller: 'comment', middlewares: 'transaction',
      meta: {
        auth: { user: true },
        right: { type: 'atom', action: 2, checkFlow: true },
      },
    },
    { method: 'post', path: 'comment/heart', controller: 'comment', middlewares: 'transaction',
      meta: {
        auth: { user: true },
        right: { type: 'atom', action: 2, checkFlow: true },
      },
    },
    // user
    { method: 'post', path: 'user/getLabels', controller: 'user' },
    { method: 'post', path: 'user/setLabels', controller: 'user' },
    // resource
    { method: 'post', path: 'resource/select', controller: 'resource' },
    { method: 'post', path: 'resource/check', controller: 'resource' },
    { method: 'post', path: 'resource/resourceRoles', controller: 'resource',
      meta: { right: { type: 'atom', action: 25 } },
    },
    { method: 'post', path: 'resource/resourceRoleRemove', controller: 'resource',
      meta: { right: { type: 'atom', action: 25 } },
    },
    { method: 'post', path: 'resource/resourceRoleAdd', controller: 'resource',
      meta: { right: { type: 'atom', action: 25 } },
    },
    // atomClass
    { method: 'post', path: 'atomClass/validatorSearch', controller: 'atomClass' },
    { method: 'post', path: 'atomClass/checkRightCreate', controller: 'atomClass' },
    { method: 'post', path: 'atomClass/atomClass', controller: 'atomClass' },
    // auth
    { method: 'post', path: 'auth/echo', controller: 'auth', meta: { auth: { enable: false } } },
    { method: 'post', path: 'auth/check', controller: 'auth', meta: { auth: { user: true } } },
    { method: 'post', path: 'auth/logout', controller: 'auth', meta: { auth: { enable: false } } },
    // cors
    { method: 'options', path: /.*/ },
    // jwt
    { method: 'post', path: 'jwt/create', controller: 'jwt' },
    // layoutConfig
    { method: 'post', path: 'layoutConfig/load', controller: 'layoutConfig' },
    { method: 'post', path: 'layoutConfig/save', controller: 'layoutConfig' },
    { method: 'post', path: 'layoutConfig/saveKey', controller: 'layoutConfig' },
    // category
    { method: 'post', path: 'category/child', controller: 'category' }, // not set function right
    { method: 'post', path: 'category/children', controller: 'category' }, // not set function right
    { method: 'post', path: 'category/add', controller: 'category', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },
    { method: 'post', path: 'category/delete', controller: 'category', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },
    { method: 'post', path: 'category/move', controller: 'category', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },
    { method: 'post', path: 'category/item', controller: 'category', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },
    { method: 'post', path: 'category/save', controller: 'category', middlewares: 'validate', meta: {
      validate: { module: 'a-base', validator: 'category' },
      right: { type: 'resource', module: 'a-settings', name: 'settings' },
    } },
    { method: 'post', path: 'category/tree', controller: 'category' }, // not set function right
    { method: 'post', path: 'category/relativeTop', controller: 'category' }, // not set function right
    // tag
    { method: 'post', path: 'tag/list', controller: 'tag' },
    { method: 'post', path: 'tag/add', controller: 'tag', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },
    { method: 'post', path: 'tag/save', controller: 'tag', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },
    { method: 'post', path: 'tag/delete', controller: 'tag', meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } } },

  ];
  return routes;
};
