import { combineReducers } from 'redux'
import userReducer from './userReducer'
import notifReducer from './notifReducer'

const mainReducer = combineReducers({ user: userReducer, notif: notifReducer })

export default mainReducer
