import React, { Component } from 'react'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Auth from '../components/Auth'
import Error from '../components/Error'
import Home from '../components/Home'

class App extends Component {
  render() {
    const token = window.localStorage.getItem('token')
    if (token && !this.props.user.token) {
      this.props.userActions.init(token)
    }
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        {this.props.user.error && <Error message={this.props.user.error} />}
        {this.props.user.token && this.props.user.info ? (
          <HomeConnected />
        ) : (
          <AuthConnected />
        )}
      </div>
    )
  }
}

const actionsMapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  }
}

const AuthConnected = connect(mapStateToProps, actionsMapDispatchToProps)(Auth)
const HomeConnected = connect(mapStateToProps, actionsMapDispatchToProps)(Home)

export default connect(mapStateToProps, actionsMapDispatchToProps)(App)
