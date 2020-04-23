import { AUTH_SUCCESS, AUTH_ERROR } from '../actions/userActions'
const initialState = {
  token: null,
  error: null
}

const reducer = (state = initialState, action) => {
  let response
  switch (action.type) {
    case AUTH_SUCCESS:
      response = JSON.parse(action.response)
      return {
        ...state,
        token: response.session_token,
        error: null
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default reducer
