import { all, fork } from 'redux-saga/effects'
import userSaga from './userSaga'
import notifSaga from './notifSaga'

function* rootSaga() {
  yield all([fork(userSaga), fork(notifSaga)])
}
export default rootSaga
