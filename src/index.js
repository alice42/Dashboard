import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import mainReducer from './reducers/mainReducer'
import rootSaga from './sagas/rootSaga'
import AppContainer from './containers/App'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
