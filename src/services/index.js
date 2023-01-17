import { telemetry } from './telemetry/telemetry.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(telemetry)

  app.configure(user)

  // All services will be registered here
}
