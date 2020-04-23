import React, { Component } from 'react'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Auth from '../components/Auth'

class App extends Component {
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <AuthConnected />
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

export default connect(mapStateToProps, actionsMapDispatchToProps)(App)
