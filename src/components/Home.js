import React, { Component } from 'react'

class Home extends Component {
  handleLogout = () => {
    this.props.userActions.logoutRequest()
  }
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ color: 'green' }}>
          Welcome {this.props.user.info.fname} {this.props.user.info.lname}
        </div>
        <button onClick={() => this.handleLogout()}>logout</button>
      </div>
    )
  }
}

export default Home
