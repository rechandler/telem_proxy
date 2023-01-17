import { TelemetryService, getOptions } from './telemetry.class.js'

export * from './telemetry.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const telemetry = (app) => {
  // Register our service on the Feathers application
  app.use('telemetry', new TelemetryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'patch', 'remove', 'stream'],
    // You can add additional custom events to be sent to clients here
    events: ['telemetry']
  })
  // Initialize hooks
  app.service('telemetry').hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
