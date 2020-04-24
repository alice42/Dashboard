import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_ERROR,
  DATA_REQUESTA,
  DATA_SUCCESSA,
  DATA_ERRORA
} from '../actions/dataActions'
import { dataMethod, dataMethodA } from '../services/dataServices'

function* data() {
  try {
    const token = yield select(state => state.user.token)
    const response = yield call(dataMethod, token)
    if (response.status === 200) {
      yield put({
        type: DATA_SUCCESS,
        result: JSON.parse(response.data)
      })
    } else {
      if (response.status === 404) {
        response.data = 'Something went wrong'
      }
      yield put({ type: DATA_ERROR, error: response.data })
    }
  } catch (error) {
    yield put({ type: DATA_ERROR, error: error.message })
  }
}

function* dataA() {
  try {
    const token = yield select(state => state.user.token)
    const response = yield call(dataMethodA, token)
    if (response.status === 200) {
      yield put({
        type: DATA_SUCCESSA,
        result: JSON.parse(response.data)
      })
    } else {
      if (response.status === 404) {
        response.data = 'Something went wrong'
      }
      yield put({ type: DATA_ERRORA, error: response.data })
    }
  } catch (error) {
    yield put({ type: DATA_ERRORA, error: error.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery(DATA_REQUEST, data)],
    [yield takeEvery(DATA_REQUESTA, dataA)]
  )
}
