import { basicFetch, api, routeNotif } from './utils'

export const notifMethod = token =>
  basicFetch('POST', `${api}${routeNotif}`, {}, `session_token=${token}`)
