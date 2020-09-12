module.exports = ctx => {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class AtomClass extends ctx.app.meta.BeanModuleBase {

    constructor(moduleName) {
      super(ctx, 'atomClass');
      this.moduleName = moduleName || ctx.module.info.relativeName;
    }

    get model() {
      return ctx.model.module(moduleInfo.relativeName).atomClass;
    }

    async atomClass(atomClass) {
      atomClass = await this.top(atomClass);
      return ctx.bean.base.atomClass({ module: atomClass.module, atomClassName: atomClass.atomClassName });
    }

    async top(atomClass) {
      while (true) {
        if (atomClass.atomClassIdParent === 0) break;
        atomClass = await this.get({ id: atomClass.atomClassIdParent });
      }
      return atomClass;
    }

    async get({ id, module, atomClassName, atomClassIdParent = 0 }) {
      module = module || this.moduleName;
      const data = id ? { id } : { module, atomClassName, atomClassIdParent };
      const res = await this.model.get(data);
      if (res) return res;
      if (!module || !atomClassName) throw new Error('Invalid arguments');
      // queue
      return await ctx.app.meta.queue.pushAsync({
        subdomain: ctx.subdomain,
        module: moduleInfo.relativeName,
        queueName: 'registerAtomClass',
        data: { module, atomClassName, atomClassIdParent },
      });
    }

    async register({ module, atomClassName, atomClassIdParent }) {
      // get
      const res = await this.model.get({ module, atomClassName, atomClassIdParent });
      if (res) return res;
      // data
      const atomClass = ctx.bean.base.atomClass({ module, atomClassName });
      if (!atomClass) throw new Error(`atomClass ${module}:${atomClassName} not found!`);
      const data = {
        module,
        atomClassName,
        atomClassIdParent,
        public: atomClass.public,
        flow: atomClass.flow,
      };
      // insert
      const res2 = await this.model.insert(data);
      data.id = res2.insertId;
      return data;
    }

    async getByAtomId({ atomId }) {
      const res = await this.model.query(`
        select a.* from aAtomClass a
          left join aAtom b on a.id=b.atomClassId
            where b.iid=? and b.id=?
        `, [ ctx.instance.id, atomId ]);
      return res[0];
    }

    async getTopByAtomId({ atomId }) {
      const atomClass = await this.getByAtomId({ atomId });
      return await this.top(atomClass);
    }

    async validator({ atomClass, user }) {
      // maybe empty
      user = user || ctx.state.user.op;
      // event
      return await ctx.bean.event.invoke({
        module: moduleInfo.relativeName,
        name: 'atomClassValidator',
        data: {
          atomClass, user,
        },
        next: async (context, next) => {
          // default
          if (context.result === undefined) {
            const _module = ctx.app.meta.modules[atomClass.module];
            const validator = _module.main.meta.base.atoms[atomClass.atomClassName].validator;
            context.result = validator ? {
              module: atomClass.module,
              validator,
            } : null;
          }
          await next();
        },
      });
    }

    async validatorSearch({ atomClass }) {
      const _module = ctx.app.meta.modules[atomClass.module];
      const validator = _module.main.meta.base.atoms[atomClass.atomClassName].search.validator;
      return validator ? {
        module: atomClass.module,
        validator,
      } : null;
    }

  }

  return AtomClass;
};