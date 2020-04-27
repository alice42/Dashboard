import React, { Component } from 'react'
import { Grid, Button } from '@material-ui/core'
import theme from '../theme'
import {
  ThemeMixinsToolBar,
  StyledContainer,
  StyledMain,
  StyledPaper
} from './styles/StyledHome'
import BandwidthChart from '../components/Charts/BandwidthChart'
import AudienceChart from '../components/Charts/AudienceChart'
import CountriesChart from '../components/Charts/CountriesChart'
import PlatformsChart from '../components/Charts/PlatformsChart'
import TimeSerieChart from '../components/Charts/TimeSerieChart'
import Header from '../components/Home/Header'

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
    if (!this.props.data.countries) {
      this.props.dataActions.dataRequest('countries')
    }
    if (!this.props.data.platforms) {
      this.props.dataActions.dataRequest('platforms')
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
      <StyledContainer
        maxWidth="lg"
        themespacing={theme.spacing(4)}
        spacing={4}
      >
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
          <ThemeMixinsToolBar theme={theme.mixins.toolbar} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <StyledPaper>
                {this.props.data.countries && (
                  <CountriesChart countries={this.props.data.countries.data} />
                )}
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <StyledPaper>
                {this.props.data.platforms && (
                  <PlatformsChart platforms={this.props.data.platforms.data} />
                )}
              </StyledPaper>
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
                {this.props.data.audience && this.props.data.bandwidth && (
                  <TimeSerieChart
                    bandwidth={this.props.data.bandwidth.data}
                    viewers={this.props.data.audience.data}
                  />
                )}
              </StyledPaper>
            </Grid>
          </Grid>
        </StyledMain>
      </StyledContainer>
    )
  }
}

export default Home
