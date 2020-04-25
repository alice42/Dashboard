import React, { Component } from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import theme from '../theme'
import { ThemeMixinsToolBar, StyledContainer, StyledMain } from './StyledHome'
import BandwidthChart from './BandwidthChart'
import AudienceChart from './AudienceChart'
import TestChart from './TestChart'
import Header from './Home/Header'

class Home extends Component {
  state = {
    open: { user: false, notif: false },
    anchorEl: { user: null, notif: null }
  }

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

  handleMenu = (event, type) => {
    this.setState({
      open: { ...this.state.open, [`${type}`]: true },
      anchorEl: { ...this.state.anchorEl, [`${type}`]: event.currentTarget }
    })
  }

  handleClose = type => {
    this.setState({
      open: { ...this.state.open, [`${type}`]: false },
      anchorEl: { ...this.state.anchorEl, [`${type}`]: null }
    })
  }

  render() {
    return (
      <StylesProvider injectFirst>
        <Header
          handleLogout={this.handleLogout}
          handleClose={this.handleClose}
          handleMenu={this.handleMenu}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          notifs={this.props.notif.all}
          info={this.props.user.info}
        />

        <StyledMain>
          <StyledContainer
            maxWidth="lg"
            themespacing={theme.spacing(4)}
            spacing={3}
          >
            <ThemeMixinsToolBar theme={theme.mixins.toolbar} />
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
          </StyledContainer>
        </StyledMain>
      </StylesProvider>
    )
  }
}

export default Home
