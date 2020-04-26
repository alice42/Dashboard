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
  audience: routeAudience
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate)
  return datum
}
const from = toTimestamp('Wed Apr 08 2020 06:53:30')
const to = toTimestamp('Thu Apr 23 2020 17:53:30')

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
