module.exports = app => {
  // const schemas = require('./config/validation/schemas.js')(app);
  const meta = {
    base: {
      atoms: {
      },
    },
    validation: {
      validators: {
      },
      keywords: {},
      schemas: {
      },
    },
    event: {
      implementations: {
        'a-wxwork:wxworkMessage': 'wxworkMessage',
        'a-base:loginInfo': 'loginInfo',
      },
    },
  };
  return meta;
};
