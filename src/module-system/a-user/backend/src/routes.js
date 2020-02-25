const user = require('./controller/user.js');
const public2 = require('./controller/public.js');

module.exports = app => {
  const routes = [
    // user
    { method: 'post', path: 'user/save', controller: user, middlewares: 'validate',
      meta: { validate: { module: 'a-base', validator: 'user' } },
    },
    { method: 'post', path: 'user/saveAvatar', controller: user },
    { method: 'post', path: 'user/agent', controller: user },
    { method: 'post', path: 'user/agentsBy', controller: user },
    { method: 'post', path: 'user/userByMobile', controller: user },
    { method: 'post', path: 'user/addAgent', controller: user },
    { method: 'post', path: 'user/removeAgent', controller: user },
    { method: 'post', path: 'user/switchAgent', controller: user },
    { method: 'post', path: 'user/switchOffAgent', controller: user },
    { method: 'post', path: 'user/functions', controller: user },
    { method: 'post', path: 'user/authentications', controller: user },
    { method: 'post', path: 'user/authenticationDisable', controller: user },
    { method: 'post', path: 'user/themeLoad', controller: user },
    { method: 'post', path: 'user/themeSave', controller: user },
    // public
    { method: 'post', path: 'public/profile', controller: public2 },
  ];
  return routes;
};
