export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

export const authRequest = data => {
  return {
    type: AUTH_REQUEST,
    data
  }
}
