import { NOTIF_SUCCESS, NOTIF_ERROR } from '../actions/notifActions'
import { LOGOUT_SUCCESS } from '../actions/userActions'

const initialState = {
  all: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIF_SUCCESS:
      return {
        ...state,
        all: action.result,
        error: null
      }
    case NOTIF_ERROR:
      return {
        ...state,
        error: action.error
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default reducer
