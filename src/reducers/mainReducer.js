import { combineReducers } from 'redux'
import userReducer from './userReducer'

const mainReducer = combineReducers({ user: userReducer })

export default mainReducer
