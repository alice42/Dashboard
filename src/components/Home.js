import React, { Component } from 'react'

class Home extends Component {
  componentDidMount() {
    if (!this.props.notif.all) {
      this.props.notifActions.notifRequest()
    }
  }
  handleLogout = () => {
    this.props.userActions.logoutRequest()
  }
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div>
          notifs
          <div>
            {this.props.notif.all &&
              this.props.notif.all.map((notif, index) => (
                <div key={index}>
                  <div>type: {notif.type}</div>
                  <div>message: {notif.message}</div>
                </div>
              ))}
          </div>
        </div>
        <div style={{ color: 'green' }}>
          Welcome {this.props.user.info.fname} {this.props.user.info.lname}
        </div>
        <div>
          All info
          <div>apitoken: {this.props.user.info.apitoken}</div>
          <div>clientid: {this.props.user.info.clientid}</div>
          <div>company: {this.props.user.info.company}</div>
          <div>description: {this.props.user.info.description}</div>
          <div>email: {this.props.user.info.email}</div>
          <div>timestamp: {this.props.user.info.timestamp}</div>
          <div>
            ({new Date(this.props.user.info.timestamp * 1000).toLocaleString()})
          </div>
          <div>website: {this.props.user.info.website}</div>
        </div>
        <button onClick={() => this.handleLogout()}>logout</button>
      </div>
    )
  }
}

export default Home
