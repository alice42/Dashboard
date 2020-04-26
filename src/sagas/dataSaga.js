import { put, takeEvery, all, call, select } from 'redux-saga/effects'
import { DATA_REQUEST, DATA_SUCCESS, DATA_ERROR } from '../actions/dataActions'
import { dataMethod } from '../services/dataServices'

function* data(action) {
  try {
    const { dataType, aggregateType } = action
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      dataType,
      aggregateType
    }
    const response = yield call(dataMethod, payload)
    if (response.status === 200) {
      yield put({
        type: DATA_SUCCESS,
        result: {
          type: dataType,
          aggregateType: aggregateType,
          data: JSON.parse(response.data)
        }
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

export default function* rootSaga() {
  yield all([yield takeEvery(DATA_REQUEST, data)])
}
