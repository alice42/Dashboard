import { combineReducers } from 'redux'
import userReducer from './userReducer'
import notifReducer from './notifReducer'
import dataReducer from './dataReducer'

const mainReducer = combineReducers({
  user: userReducer,
  notif: notifReducer,
  data: dataReducer
})

export default mainReducer
