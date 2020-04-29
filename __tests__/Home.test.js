import "babel-polyfill"
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render , fireEvent, waitFor, cleanup} from '@testing-library/react'
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

import Home from '../src/containers/Home'
import Header from '../src/components/Home/Header'

import theme from '../src/theme'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

composeWithDevTools(applyMiddleware(...middleware))
const store = createStore( 
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)


afterEach(cleanup)
  describe('default/', () => {
    HTMLCanvasElement.prototype.getContext = jest.fn()
    it('should take a snapshot', () => {
        const props = store.getState()
        props.user.info = {
            clientid: 0,
            company: "company",
            fname: "fname",
            lname: "lname",
            email: "e@mail.com",
            website: "www.website.com",
            timestamp: 112730034000,
            description: "description",
            password: "password",
            apitoken: "apiToken"
        }
      const { asFragment, getByText } = render(<Home 
        {...props}
        dataActions={dataActions}
        notifActions={notifActions}
        userActions={userActions}
      />)

      expect(asFragment(<Home {...props}/>)).toMatchSnapshot()
    })
    it('request if props missing', () => {
      const props = store.getState()
      props.user.info = null 
      const notif = () => { props.notif.all = [{type: 'test', message: 'test'}] }
      const user = () => {
        props.user.info = {
            clientid: 0,
            company: "company",
            fname: "fname",
            lname: "lname",
            email: "e@mail.com",
            website: "www.website.com",
            timestamp: 112730034000,
            description: "description",
            password: "password",
            apitoken: "apiToken"
        } 
      }
      const { container, getByText, getByPlaceholderText, getByTestId } = render(
      <Home {...props}
      dataActions={dataActions} 
      notifActions={notif()}
      userActions={user()}
      />
      )
    })
  })
  
  describe('events handlers /', () => {
    it('open/close menu', async () => {
      const props = store.getState()
      
      const renderComponent = ({ open, anchorEl }) =>
      render(
       <StateMock state={{  
         open,
          anchorEl }}>
          <Home 
          {...props} 
          dataActions={dataActions}
          notifActions={notifActions}
          userActions={userActions}/>
       </StateMock>
    );

    const { getByText, getByPlaceholderText , getByLabelText, getByRole} = renderComponent({  
      open: { user: false, notif: false },
      anchorEl: { user: null, notif: null },
    });
      
    expect(getByLabelText('show new notifications')).toBeInTheDocument();
    fireEvent.click(getByLabelText('show new notifications'));
    fireEvent.click(getByRole('presentation').firstChild);
    fireEvent.click(getByLabelText('account of current user'));
    fireEvent.click(getByRole('presentation').firstChild);
    })

        it('Logout', () => {
       const props = store.getState()
        props.user.info = {
            clientid: 0,
            company: "company",
            fname: "fname",
            lname: "lname",
            email: "e@mail.com",
            website: "www.website.com",
            timestamp: 112730034000,
            description: "description",
            password: "password",
            apitoken: "apiToken"
        }
      const { getByText } = render(<Home
      {...props}
      dataActions={dataActions}
      notifActions={notifActions}
      userActions={userActions}/>
    );
    expect(getByText('Log Out')).toBeInTheDocument(); 
    fireEvent.click(getByText('Log Out'));
    })

  })

