export const api = 'http://localhost:3000/'
export const routeAuth = 'auth'

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
      message: textResponse,
      status: response.status
    }
    return result
  } catch (error) {
    return error
  }
}
