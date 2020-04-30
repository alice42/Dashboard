export const INIT = 'INIT'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

export const INFO_SUCCESS = 'INFO_SUCCESS'
export const INFO_REQUEST = 'INFO_REQUEST'
export const INFO_ERROR = 'INFO_ERROR'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const init = token => {
  return {
    type: INIT,
    token
  }
}

export const authRequest = data => {
  return {
    type: AUTH_REQUEST,
    data
  }
}

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}
