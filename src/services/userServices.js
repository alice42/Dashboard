import { basicFetch, api, routeAuth } from './utils'

export const authMethod = async ({ identifiant, password }) =>
  basicFetch(
    'POST',
    `${api}${routeAuth}`,
    {},
    `identifiant=${identifiant}&password=${password}`
  )
