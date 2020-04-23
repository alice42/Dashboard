import { put, takeEvery, all, call } from 'redux-saga/effects'
import { AUTH_SUCCESS, AUTH_ERROR, AUTH_REQUEST } from '../actions/userActions'
import { authMethod } from '../services/userServices'

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
        response: response.message
      })
    } else {
      if (response.status === 404) {
        response.message = 'Indentifiant or password not valid'
      }
      yield put({ type: AUTH_ERROR, error: response.message })
    }
  } catch (error) {
    yield put({ type: AUTH_ERROR, error })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(AUTH_REQUEST, auth)])
}
