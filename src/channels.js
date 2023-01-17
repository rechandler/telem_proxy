import '@feathersjs/transport-commons'
import { logger } from './logger.js'

export const channels = (app) => {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  logger.warn(
    'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'
  )

  app.on('connection', (connection) => {
    // On a new real-time connection, add it to the anonymous channel
    if (connection.userId) app.channel(connection.userId).join(connection)
  })

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection)

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection)
    }
  })

  // eslint-disable-next-line no-unused-vars
  app.publish((data, context) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`
    // console.log(data)
    // e.g. to publish all service events to all authenticated users use
    return app.channel(JSON.parse(data).userId)
  })
}
