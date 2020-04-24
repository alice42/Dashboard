import { basicFetch, api, routeAuth, routeLogout, routeMyInfo } from './utils'

export const authMethod = async ({ identifiant, password }) =>
  basicFetch(
    'POST',
    `${api}${routeAuth}`,
    {},
    `identifiant=${identifiant}&password=${password}`
  )

export const logoutMethod = token =>
  basicFetch('POST', `${api}${routeLogout}`, {}, `session_token=${token}`)

export const myInfoMethod = async token =>
  basicFetch('POST', `${api}${routeMyInfo}`, {}, `session_token=${token}`)
