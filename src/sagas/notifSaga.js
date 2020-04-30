import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import {
  NOTIF_REQUEST,
  NOTIF_SUCCESS,
  NOTIF_ERROR
} from '../actions/notifActions'
import { notifMethod } from '../services/notifServices'

function* notif() {
  try {
    const token = yield select(state => state.user.token)
    const response = yield call(notifMethod, token)
    if (response.status === 200) {
      yield put({
        type: NOTIF_SUCCESS,
        result: JSON.parse(response.data)
      })
    } else {
      if (response.status === 404) {
        response.data = 'Something went wrong'
      }
      yield put({ type: NOTIF_ERROR, error: response.data })
    }
  } catch (error) {
    yield put({ type: NOTIF_ERROR, error: error.message })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(NOTIF_REQUEST, notif)])
}
