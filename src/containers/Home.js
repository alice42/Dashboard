import React, { Component } from 'react'
import theme from '../theme'
import {
  ThemeMixinsToolBar,
  StyledContainer,
  StyledMain
} from './styles/StyledHome'

import Header from '../components/Home/Header'
import Content from '../components/Home/Content'

class Home extends Component {
  state = {
    open: { user: false, notif: false },
    anchorEl: { user: null, notif: null },
    value: 0
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

  handleMenu = (e, type) => {
    this.setState({
      open: { ...this.state.open, [`${type}`]: true },
      anchorEl: { ...this.state.anchorEl, [`${type}`]: e.currentTarget }
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
          <Content
            fetching={this.props.data.fetching}
            bandwidth={this.props.data.bandwidth}
            audience={this.props.data.audience}
            countries={this.props.data.countries}
            platforms={this.props.data.platforms}
          />
        </StyledMain>
      </StyledContainer>
    )
  }
}

export default Home
