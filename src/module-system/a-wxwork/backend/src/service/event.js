const require3 = require('require3');
const extend = require3('extend2');

module.exports = app => {

  class Event extends app.Service {

    async loginInfo({ /* event,*/ data }) {
      const info = data.info;
      const provider = info.user && info.user.provider;
      if (provider && provider.module === 'a-wxwork') {
        info.config = extend(true, info.config, {
          modules: {
            'a-base': {
              account: {
                needActivation: false,
              },
            },
          },
        });
      }
    }

    async accountMigration({ data }) {
      // aWxworkMember
      await this.ctx.model.query(
        'update aWxworkMember a set a.userId=? where a.iid=? and a.userId=?',
        [ data.userIdTo, this.ctx.instance.id, data.userIdFrom ]
      );
    }

  }

  return Event;
};
