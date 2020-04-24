//api
export const api = 'http://localhost:3000/'
//user
export const routeAuth = 'auth'
export const routeMyInfo = 'myinfo'
export const routeLogout = 'logout'
//notif
export const routeNotif = 'notifications'
//data
export const routeBandwidth = 'bandwidth'
export const routeAudience = 'audience'
export const routeStreams = 'streams'
export const routeCountries = 'countries'
export const routeIsps = 'isps'
export const routePlatforms = 'platforms'

//BASIC FETCH API METHOD
export const basicFetch = async (method, url, config, data) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    })
    const textResponse = await response.text()
    const result = {
      data: textResponse,
      status: response.status
    }
    return result
  } catch (error) {
    return error
  }
}
