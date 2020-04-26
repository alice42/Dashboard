import React, { Component } from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import theme from '../theme'
import {
  ThemeMixinsToolBar,
  StyledContainer,
  StyledMain,
  StyledPaper
} from './StyledHome'
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
      this.props.dataActions.dataRequest('bandwidth')
      this.props.dataActions.dataRequest('bandwidth', 'max')
    }
    if (!this.props.data.audience) {
      this.props.dataActions.dataRequest('audience')
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
          theme={theme}
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <StyledPaper>A</StyledPaper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <StyledPaper>B</StyledPaper>
              </Grid>
              <Grid item xs={12}>
                <StyledPaper>
                  {this.props.data.bandwidth &&
                    this.props.data.bandwidth.data &&
                    this.props.data.bandwidth.max && (
                      <BandwidthChart bandwidth={this.props.data.bandwidth} />
                    )}
                </StyledPaper>
              </Grid>
              <Grid item xs={12}>
                <StyledPaper>
                  {this.props.data.audience && (
                    <AudienceChart viewers={this.props.data.audience.data} />
                  )}
                </StyledPaper>
              </Grid>
              <Grid item xs={12}>
                <StyledPaper>
                  {this.props.data.bandwidth && (
                    <TestChart bandwidth={this.props.data.bandwidth.data} />
                  )}
                </StyledPaper>
              </Grid>
            </Grid>
          </StyledContainer>
        </StyledMain>
      </StylesProvider>
    )
  }
}

export default Home
