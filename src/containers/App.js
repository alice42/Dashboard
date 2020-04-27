import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StylesProvider } from '@material-ui/core/styles'

import * as userActions from '../actions/userActions'
import * as notifActions from '../actions/notifActions'
import * as dataActions from '../actions/dataActions'

import Auth from './Auth'
import Error from '../components/Error'
import Home from './Home'

class App extends Component {
  render() {
    const token = window.localStorage.getItem('token')
    if (token && !this.props.user.token) {
      this.props.userActions.init(token)
    }
    return (
      <StylesProvider injectFirst>
        {this.props.user.error && <Error message={this.props.user.error} />}
        {this.props.user.token && this.props.user.info ? (
          <HomeConnected />
        ) : (
          <AuthConnected />
        )}
      </StylesProvider>
    )
  }
}

const actionsMapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    notifActions: bindActionCreators(notifActions, dispatch),
    dataActions: bindActionCreators(dataActions, dispatch)
  }
}

const mapStateToProps = state => {
  const { user, notif, data } = state
  return {
    user,
    notif,
    data
  }
}

const AuthConnected = connect(mapStateToProps, actionsMapDispatchToProps)(Auth)
const HomeConnected = connect(mapStateToProps, actionsMapDispatchToProps)(Home)

export default connect(mapStateToProps, actionsMapDispatchToProps)(App)
