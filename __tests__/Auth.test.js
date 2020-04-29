import "babel-polyfill"
import React from 'react'
import { render, fireEvent, waitFor, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StateMock } from '@react-mock/state';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import mainReducer from '../src/reducers/mainReducer'
import rootSaga from '../src/sagas/rootSaga'

import * as userActions from '../src/actions/userActions'
import * as notifActions from '../src/actions/notifActions'
import * as dataActions from '../src/actions/dataActions'

import Auth from '../src/containers/Auth'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

composeWithDevTools(applyMiddleware(...middleware))
const store = createStore( 
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

describe('AUTH /', () => {

   it('should take a snapshot', () => {
       const props = store.getState()
       const { asFragment, getByText } = render(<Auth {...props} />)
       expect(asFragment(<Auth />)).toMatchSnapshot()
    })

   it('should render an error', async () => {
      const props = store.getState()
      props.user.error = 'ERROR MESSAGE'
      const { getByText } = render(
      <Auth {...props}
      dataActions={dataActions}
      notifActions={notifActions}
      userActions={userActions}
      />
      )
      expect(getByText('ERROR MESSAGE')).toBeInTheDocument()
   })

   it('events handlers',  async () => {
      const props = store.getState()
      const renderComponent = ({ identifiant, password }) =>
      render(
         <StateMock state={{ identifiant, password }}>
            <Auth {...props} 
            dataActions={dataActions}
            notifActions={notifActions}
            userActions={userActions}/>
         </StateMock>
      );

      const { getByText, getByPlaceholderText } = renderComponent({ identifiant: '', password: '' });

      fireEvent.click(getByText('Sign In'));
      await waitFor(() => {
         expect(getByPlaceholderText('identifiant').value).toEqual('')
         expect(getByPlaceholderText('password').value).toEqual('')
         })
      fireEvent.change(getByPlaceholderText('identifiant'), {
         target: { value: 'identifiantTest' }
      })
      fireEvent.change(getByPlaceholderText('password'), {
         target: { value: 'passwordTest' }
      })
      await waitFor(() => {
         expect(getByPlaceholderText('identifiant').value).toEqual('identifiantTest')
         expect(getByPlaceholderText('password').value).toEqual('passwordTest')
         }
      );
      fireEvent.click(getByText('Sign In'));
   })
})