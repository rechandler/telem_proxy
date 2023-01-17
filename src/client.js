// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
const telemetryServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

const userServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

/**
 * Returns a  client for the telem_proxy app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))

  client.use('users', connection.service('users'), {
    methods: userServiceMethods
  })

  client.use('telemetry', connection.service('telemetry'), {
    methods: telemetryServiceMethods
  })

  return client
}
