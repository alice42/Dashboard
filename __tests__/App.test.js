import 'babel-polyfill'
import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import mainReducer from '../src/reducers/mainReducer'
import rootSaga from '../src/sagas/rootSaga'

import * as userActions from '../src/actions/userActions'
import * as notifActions from '../src/actions/notifActions'
import * as dataActions from '../src/actions/dataActions'

import App from '../src/containers/App'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

composeWithDevTools(applyMiddleware(...middleware))
const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
describe('APP /', () => {
  afterEach(cleanup)

  it('default', () => {
    const { queryByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <App
          dataActions={dataActions}
          notifActions={notifActions}
          userActions={userActions}
        />
      </Provider>
    )
  })

  it('with token in sessionStorage', () => {
    let sessionStorageMock = (function() {
      let store = {
        token: 'a'
      }
      return {
        getItem: function(key) {
          return store[key]
        },
        setItem: function(key, value) {
          store[key] = value.toString()
        },
        clear: function() {
          store = {}
        },
        removeItem: function(key) {
          delete store[key]
        }
      }
    })()
    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock
    })

    const { queryByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <App
          token="test"
          dataActions={dataActions}
          notifActions={notifActions}
          userActions={userActions}
        />
      </Provider>
    )
  })

  it('with Info and Token', () => {
    const props = store.getState()
    props.user.info = []
    props.user.token = 'test'
    const { queryByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <App
          {...props}
          dataActions={dataActions}
          notifActions={notifActions}
          userActions={userActions}
        />
      </Provider>
    )
  })
})
