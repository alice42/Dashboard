import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import {
  INIT,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  INFO_REQUEST,
  INFO_ERROR,
  INFO_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../actions/userActions'
import {
  authMethod,
  logoutMethod,
  myInfoMethod
} from '../services/userServices'

function* init(action) {
  const { token } = action
  if (token) {
    yield put({
      type: AUTH_SUCCESS,
      result: {
        session_token: token
      }
    })
  }
}

function* auth(action) {
  try {
    const { identifiant, password } = action.data
    const payload = {
      identifiant,
      password
    }
    const response = yield call(authMethod, payload)
    if (response.status === 200) {
      yield put({
        type: AUTH_SUCCESS,
        result: JSON.parse(response.data)
      })
    } else {
      if (response.status === 404) {
        response.data = 'Indentifiant or password not valid'
      }
      yield put({ type: AUTH_ERROR, error: response.data })
    }
  } catch (error) {
    yield put({ type: AUTH_ERROR, error: error.message })
  }
}

function* saveToken(action) {
  window.sessionStorage.setItem('token', action.result.session_token)
}

function* myInfo() {
  try {
    const token = yield select(state => state.user.token)
    const response = yield call(myInfoMethod, token)
    if (response.status === 200) {
      yield put({
        type: INFO_SUCCESS,
        result: JSON.parse(response.data)
      })
    } else {
      if (response.status === 404) {
        response.message = 'not found'
      }
      yield put({ type: INFO_ERROR, error: response.message })
    }
  } catch (error) {
    yield put({ type: INFO_ERROR, error })
  }
}

function* logout() {
  try {
    const token = yield select(state => state.user.token)
    const response = yield call(logoutMethod, token)
    if (response.status === 200) {
      window.sessionStorage.clear()
      yield put({
        type: LOGOUT_SUCCESS
      })
    }
  } catch (error) {
    yield put({ type: LOGOUT_ERROR, error })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(INIT, init)],
    [yield takeEvery(AUTH_REQUEST, auth)],
    [yield takeEvery(AUTH_SUCCESS, saveToken)],
    [yield takeEvery(AUTH_SUCCESS, myInfo)],
    [yield takeEvery(LOGOUT_REQUEST, logout)]
  )
}
