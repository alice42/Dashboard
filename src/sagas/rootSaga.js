import { all, fork } from 'redux-saga/effects'
import userSaga from './userSaga'
import notifSaga from './notifSaga'
import dataSaga from './dataSaga'

function* rootSaga() {
  yield all([fork(userSaga), fork(notifSaga), fork(dataSaga)])
}
export default rootSaga
