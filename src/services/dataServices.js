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

const data = {
  bandwidth: routeBandwidth,
  audience: routeAudience,
  streams: routeStreams,
  countries: routeCountries,
  platforms: routePlatforms
}

var d = new Date()
d.setDate(d.getDate() - 15)
const from = Date.parse(d)
const to = Date.parse(new Date())

export const dataMethod = ({ token, dataType, aggregateType }) => {
  if (aggregateType) {
    return basicFetch(
      'POST',
      `${api}${data[dataType]}`,
      {},
      `session_token=${token}&from=${from}&to=${to}&aggregate=${aggregateType}`
    )
  } else {
    return basicFetch(
      'POST',
      `${api}${data[dataType]}`,
      {},
      `session_token=${token}&from=${from}&to=${to}`
    )
  }
}
