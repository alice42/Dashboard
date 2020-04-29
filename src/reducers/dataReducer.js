import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from '../actions/dataActions'
import { LOGOUT_SUCCESS } from '../actions/userActions'

const initialState = {
  bandwidth: null,
  audience: null,
  streams: null,
  countries: null,
  isps: null,
  platforms: null,
  error: null,
  fetching: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case DATA_SUCCESS:
      if (action.result.aggregateType) {
        return {
          ...state,
          [`${action.result.type}`]: {
            ...state[`${action.result.type}`],
            [`${action.result.aggregateType}`]: action.result.data
          },
          error: null,
          fetching: false
        }
      } else {
        return {
          ...state,
          [`${action.result.type}`]: {
            ...state[`${action.result.type}`],
            data: action.result.data
          },
          error: null,
          fetching: false
        }
      }
    case DATA_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default reducer
