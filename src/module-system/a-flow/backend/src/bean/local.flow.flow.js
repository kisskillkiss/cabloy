const VarsFn = require('../common/vars.js');
const UtilsFn = require('../common/utils.js');

module.exports = ctx => {
  const moduleInfo = ctx.app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class FlowInstance {

    constructor({ flowDef }) {
      // context
      this.context = ctx.bean._newBean(`${moduleInfo.relativeName}.local.context.flow`, {
        flowDef,
      });
      // listener
      this._flowListener = ctx.bean._newBean(`${moduleInfo.relativeName}.local.flow.listener`, {
        flowInstance: this, context: this.context,
      });
    }

    get modelAtom() {
      return ctx.model.module('a-base').atom;
    }
    get modelFlow() {
      return ctx.model.module(moduleInfo.relativeName).flow;
    }
    get modelFlowHistory() {
      return ctx.model.module(moduleInfo.relativeName).flowHistory;
    }
    get modelFlowNode() {
      return ctx.model.module(moduleInfo.relativeName).flowNode;
    }
    get modelFlowNodeHistory() {
      return ctx.model.module(moduleInfo.relativeName).flowNodeHistory;
    }
    get constant() {
      return ctx.constant.module(moduleInfo.relativeName);
    }

    async start({ flowName, flowAtomId, flowVars, flowUserId, startEventId }) {
      if (!flowVars) flowVars = {};
      if (flowUserId === undefined) flowUserId = 0;
      // create flow
      const flowId = await this._createFlow({ flowName, flowAtomId, flowVars, flowUserId });
      // context init
      await this._contextInit({ flowId });
      // raise event: onFlowStart
      await this._flowListener.onFlowStart({ flowVars, flowUserId, startEventId });
      await this._saveFlowVars();
      // node: startEvent
      const nodeInstanceStartEvent = await this._findNodeInstanceStartEvent({ startEventId });
      if (!nodeInstanceStartEvent) throw new Error(`startEvent not found: ${this.context._flowDef.atomStaticKey}.${startEventId || 'startEventNone'}`);
      // node enter
      const finished = await nodeInstanceStartEvent.enter();
      if (!finished) {
        // notify
        this._notifyFlowInitiateds(flowUserId);
        // console.log(`--------flow break: ${flowId}`);
      }
    }

    async _load({ flow, history }) {
      // context init
      await this._contextInit({ flowId: flow.id, history });
    }

    async nextEdges({ contextNode }) {
      const edgeInstances = await this._findEdgeInstancesNext({ nodeRefId: contextNode._nodeRef.id, contextNode });
      if (edgeInstances.length === 0) return true;
      for (const edgeInstance of edgeInstances) {
        // check if end
        if (this.context._flow.flowStatus !== this.constant.flow.status.flowing) {
          return true;
        }
        // enter
        const res = await edgeInstance.enter();
        if (res) {
          return true;
        }
      }
      return false;
    }

    async nextNode({ contextEdge }) {
      const nodeInstanceNext = await this._findNodeInstanceNext({
        nodeRefId: contextEdge._edgeRef.target,
        flowNodeIdPrev: contextEdge.contextNode._flowNodeId,
      });
      // enter
      return await nodeInstanceNext.enter();
    }

    async _contextInit({ flowId, history }) {
      // flowId
      this.context._flowId = flowId;
      // flow
      if (!history) {
        this.context._flow = await this.modelFlow.get({ id: flowId });
      }
      this.context._flowHistory = await this.modelFlowHistory.get({ flowId });
      // flowVars
      this.context._flowVars = new (VarsFn())();
      this.context._flowVars._vars = this.context._flowHistory.flowVars ? JSON.parse(this.context._flowHistory.flowVars) : {};
      // atom
      if (!this.context._atom && this.context._flowHistory.flowAtomId) {
        this.context._atom = await this._contextInit_atom({ atomId: this.context._flowHistory.flowAtomId });
      }
      // utils
      this.context._utils = new (UtilsFn({ ctx, flowInstance: this }))({
        context: this.context,
      });
    }

    async _contextInit_atom({ atomId }) {
      return await ctx.bean.atom.read({ key: { atomId } });
    }

    async _saveFlowVars() {
      if (!this.context._flowVars._dirty) return;
      // flow
      this.context._flow.flowVars = JSON.stringify(this.context._flowVars._vars);
      await this.modelFlow.update(this.context._flow);
      // flow history
      this.context._flowHistory.flowVars = this.context._flow.flowVars;
      await this.modelFlowHistory.update(this.context._flowHistory);
      // done
      this.context._flowVars._dirty = false;
    }

    async _endFlow(options) {
      const flowId = this.context._flowId;
      const flowStatus = this.constant.flow.status.end;
      const flowRemark = (options && options.flowRemark) || null;
      const timeEnd = new Date();
      // check if end
      if (this.context._flow.flowStatus === flowStatus) {
        ctx.throw.module(moduleInfo.relativeName, 1008, flowId);
      }
      ctx.tail(async () => {
        // need not in transaction
        // flow: update fields for onFlowEnd
        this.context._flow.flowStatus = flowStatus;
        this.context._flow.flowRemark = flowRemark;
        this.context._flow.timeEnd = timeEnd;
        await this.modelFlow.delete({ id: flowId });
        // flow history
        this.context._flowHistory.flowStatus = flowStatus;
        this.context._flowHistory.flowRemark = flowRemark;
        this.context._flowHistory.timeEnd = timeEnd;
        await this.modelFlowHistory.update(this.context._flowHistory);
        // raise event: onFlowEnd
        await this._flowListener.onFlowEnd(options);
        // clear nodes
        await this._clearNodeRemains();
        // log
        // console.log(`--------flow end: ${flowId}`);
      });
      // notify
      this._notifyFlowInitiateds(this.context._flow.flowUserId);
    }

    async _clearNodeRemains() {
      const flowId = this.context._flowId;
      const flowNodes = await this.modelFlowNode.select({
        where: { flowId },
      });
      for (const flowNode of flowNodes) {
        const flowNodeInstance = await this._loadNodeInstance({ flowNode });
        await flowNodeInstance._clearRemains();
      }
    }

    async _createFlow({ flowName, flowAtomId, flowVars, flowUserId }) {
      // flowName
      if (!flowName && flowAtomId) {
        this.context._atom = await this._contextInit_atom({ atomId: flowAtomId });
        flowName = this.context._atom.atomName;
      }
      if (!flowName) {
        flowName = this.context._flowDef.atomName;
      }
      // flow
      const data = {
        flowDefId: this.context._flowDef.atomId,
        flowDefKey: this.context._flowDef.atomStaticKey,
        flowDefRevision: this.context._flowDef.atomRevision,
        flowStatus: this.constant.flow.status.flowing,
        flowName,
        flowAtomId,
        flowVars: JSON.stringify(flowVars),
        flowUserId,
      };
      const res = await this.modelFlow.insert(data);
      const flowId = res.insertId;
      // flowHistory
      data.flowId = flowId;
      await this.modelFlowHistory.insert(data);
      // atom
      await this.modelAtom.update({
        id: flowAtomId,
        atomFlowId: flowId,
      });
      // ok
      return flowId;
    }

    _createNodeInstance2({ nodeRef }) {
      const node = ctx.bean._newBean(`${moduleInfo.relativeName}.local.flow.node`, {
        flowInstance: this, context: this.context, nodeRef,
      });
      return node;
    }

    async _loadNodeInstance({ flowNode, history }) {
      const nodeRef = this._findNodeRef({ nodeRefId: flowNode.flowNodeDefId });
      if (!nodeRef) ctx.throw.module(moduleInfo.relativeName, 1005, flowNode.flowNodeDefId);
      const node = this._createNodeInstance2({ nodeRef });
      await node._load({ flowNode, history });
      return node;
    }

    async _createNodeInstance({ nodeRef, flowNodeIdPrev }) {
      const node = this._createNodeInstance2({ nodeRef });
      await node.init({ flowNodeIdPrev });
      return node;
    }

    async _createEdgeInstance({ edgeRef, contextNode }) {
      const edge = ctx.bean._newBean(`${moduleInfo.relativeName}.local.flow.edge`, {
        flowInstance: this, context: this.context, contextNode, edgeRef,
      });
      await edge.init();
      return edge;
    }

    _findNodeRef({ nodeRefId }) {
      const nodeRef = this.context._flowDefContent.process.nodes.find(node => {
        return nodeRefId === node.id;
      });
      return nodeRef;
    }

    async _findNodeInstanceNext({ nodeRefId, flowNodeIdPrev }) {
      const nodeRef = this._findNodeRef({ nodeRefId });
      if (!nodeRef) return null;
      return await this._createNodeInstance({ nodeRef, flowNodeIdPrev });
    }

    async _findNodeInstanceStartEvent({ startEventId }) {
      const nodeRef = this.context._flowDefContent.process.nodes.find(node => {
        return (startEventId && startEventId === node.id) || (!startEventId && node.type === 'startEventNone');
      });
      if (!nodeRef) return null;
      return await this._createNodeInstance({ nodeRef });
    }

    async _findEdgeInstancesNext({ nodeRefId, contextNode }) {
      const edges = [];
      for (const edgeRef of this.context._flowDefContent.process.edges) {
        if (edgeRef.source === nodeRefId) {
          const edge = await this._createEdgeInstance({ edgeRef, contextNode });
          edges.push(edge);
        }
      }
      return edges;
    }

    // find from history
    async _findFlowNodeHistoryPrevious({ flowNodeId, cb }) {
      let flowNode = await this.modelFlowNodeHistory.get({ flowNodeId });
      while (flowNode && flowNode.flowNodeIdPrev !== 0) {
        flowNode = await this.modelFlowNodeHistory.get({ flowNodeId: flowNode.flowNodeIdPrev });
        if (!flowNode) return null;
        if (!cb) return flowNode;
        // nodeRef
        const nodeRef = this._findNodeRef({ nodeRefId: flowNode.flowNodeDefId });
        if (cb({ flowNode, nodeRef })) return flowNode;
      }
      return null;
    }

    async _parseAssignees({ users, roles, vars }) {
      // init
      let assignees = [];

      // 1. users
      const _users = this._ensureIntArray(users);
      if (_users) {
        assignees = assignees.concat(_users);
      }

      // 2. roles
      const _roles = this._ensureArray(roles);
      if (_roles) {
        for (let roleId of _roles) {
          if (isNaN(roleId)) {
            const role = await ctx.bean.role.get({ roleName: roleId });
            if (!role) ctx.throw.module(moduleInfo.relativeName, 1007, roleId);
            roleId = role.id;
          }
          const list = await ctx.bean.role.usersOfRoleParent({ roleId, disabled: 0, removePrivacy: true });
          assignees = assignees.concat(list.map(item => item.id));
        }
      }

      // 3. vars
      const _vars = this._ensureArray(vars);
      if (_vars) {
        for (const _var of _vars) {
          const userId = await this._parseUserVar({ _var });
          if (userId) {
            assignees.push(userId);
          }
        }
      }

      // unique
      assignees = Set.unique(assignees);

      // ok
      return assignees;
    }

    async _parseUserVar({ _var }) {
      if (_var === 'flowUser') {
        return this.context._flow.flowUserId;
      }
    }

    _getOpUser() {
      let user = ctx.state.user && ctx.state.user.op;
      if (!user || user.anonymous === 1) {
        user = { id: this.context._flow.flowUserId };
      }
      return user;
    }

    _ensureIntArray(str) {
      if (!str) return null;
      if (!Array.isArray(str)) {
        str = str.toString().split(',');
      }
      return str.map(item => parseInt(item));
    }

    _ensureArray(str) {
      if (!str) return null;
      if (!Array.isArray(str)) {
        str = str.toString().split(',');
      }
      return str;
    }

    _notifyFlowInitiateds(flowUserId) {
      if (flowUserId) {
        ctx.bean.stats.notify({
          module: moduleInfo.relativeName,
          name: 'flowInitiateds',
          user: { id: flowUserId },
        });
      }
    }

  }

  return FlowInstance;
};
