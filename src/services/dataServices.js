import {
  basicFetch,
  api,
  routeBandwidth,
  routeAudience,
  routeStreams,
  routeCountries,
  routeIsps,
  routePlatforms
} from './utils'

// - `session_token` - Session token from authentication.
// - `from` - Unix timestamp from which to extract data.
// - `to` - Unix timestamp to which to extract data.
// - `aggregate` - optional - `sum`, `average`, `max` or `min`
// - Instead of returning data, return an aggregated value.
//  Or an error if there is not data in this time scope.
function toTimestamp(strDate) {
  var datum = Date.parse(strDate)
  return datum
}
const from = toTimestamp('Wed Apr 08 2020 06:53:30')
const to = toTimestamp('Thu Apr 23 2020 17:53:30')

export const dataMethod = token => {
  return basicFetch(
    'POST',
    `${api}${routeBandwidth}`,
    {},
    `session_token=${token}&from=${from}&to=${to}`
  )
}

export const dataMethodA = token => {
  return basicFetch(
    'POST',
    `${api}${routeAudience}`,
    {},
    `session_token=${token}&from=${from}&to=${to}`
  )
}
