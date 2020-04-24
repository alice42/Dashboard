import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  INFO_SUCCESS,
  INFO_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../actions/userActions'

const initialState = {
  token: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.result.session_token,
        error: null
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error
      }
    case INFO_SUCCESS:
      return {
        ...state,
        info: action.result,
        error: null
      }
    case INFO_ERROR:
      return {
        ...state,
        error: action.error
      }
    case LOGOUT_SUCCESS:
      return initialState
    case LOGOUT_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default reducer
