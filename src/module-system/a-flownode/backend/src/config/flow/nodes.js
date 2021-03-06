const defaults = require('./defaults.js');

const nodes = {
  // events
  startEventNone: {
    title: 'StartEventNone',
    group: 'startEvent',
    bean: 'startEventNone',
    icon: '/api/static/a/flownode/bpmn/events/start-event-none.svg',
  },
  startEventTimer: {
    title: 'StartEventTimer',
    group: 'startEvent',
    bean: 'startEventTimer',
    icon: '/api/static/a/flownode/bpmn/events/start-event-timer.svg',
  },
  endEventNone: {
    title: 'EndEventNone',
    group: 'endEvent',
    bean: 'endEventNone',
    icon: '/api/static/a/flownode/bpmn/events/end-event-none.svg',
  },
  // activities
  activityNone: {
    title: 'ActivityNone',
    group: 'activity',
    bean: 'activityNone',
    icon: '/api/static/a/flownode/bpmn/activities/activity-none.svg',
  },
  activityService: {
    title: 'ActivityService',
    group: 'activity',
    bean: 'activityService',
    icon: '/api/static/a/flownode/bpmn/activities/activity-service.svg',
  },
};

for (const key in nodes) {
  const node = nodes[key];
  node.options = {};
  if (defaults[key]) {
    node.options.default = defaults[key];
  }
}

module.exports = nodes;
