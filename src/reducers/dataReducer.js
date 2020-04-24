import {
  DATA_SUCCESS,
  DATA_ERROR,
  DATA_SUCCESSA,
  DATA_ERRORA
} from '../actions/dataActions'
import { LOGOUT_SUCCESS } from '../actions/userActions'

const initialState = {
  bandwidth: null,
  audience: null,
  streams: null,
  countries: null,
  isps: null,
  platforms: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_SUCCESS:
      return {
        ...state,
        bandwidth: action.result,
        error: null
      }
    case DATA_ERROR:
      return {
        ...state,
        error: action.error
      }
    case DATA_SUCCESSA:
      return {
        ...state,
        audience: action.result,
        error: null
      }
    case DATA_ERRORA:
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
