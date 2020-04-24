import React, { Component } from 'react'

import BandwidthChart from './BandwidthChart'
import AudienceChart from './AudienceChart'

import TestChart from './TestChart'
import Test2Chart from './Test2Chart'

class Home extends Component {
  componentDidMount() {
    if (!this.props.notif.all) {
      this.props.notifActions.notifRequest()
    }
    if (!this.props.data.bandwidth) {
      this.props.dataActions.dataRequest()
    }
    if (!this.props.data.audience) {
      this.props.dataActions.dataRequestA()
    }
  }
  handleLogout = () => {
    this.props.userActions.logoutRequest()
  }
  render() {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
            ({new Date(this.props.user.info.timestamp).toLocaleString()})
          </div>
          <div>website: {this.props.user.info.website}</div>
        </div>
        <button onClick={() => this.handleLogout()}>logout</button>
        <div>
          DATA
          <div>bandwidth in Bits per second</div>
          <div>
            {this.props.data.bandwidth && (
              <BandwidthChart bandwidth={this.props.data.bandwidth} />
            )}
          </div>
          <div>audience in number of viewers</div>
          <div>
            {this.props.data.audience && (
              <AudienceChart viewers={this.props.data.audience} />
            )}
          </div>
          <div>
            {this.props.data.bandwidth && (
              <TestChart bandwidth={this.props.data.bandwidth} />
            )}
          </div>
          <div>
            {this.props.data.bandwidth && (
              <Test2Chart bandwidth={this.props.data.bandwidth} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
