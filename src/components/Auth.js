import React, { Component } from 'react'

class Auth extends Component {
  state = {
    identifiant: '',
    password: ''
  }
  handleSubmit = () => {
    const { identifiant, password } = this.state
    if (identifiant && password)
      this.props.userActions.authRequest({ identifiant, password })
  }
  handleChange = event => {
    const { target } = event
    const value = event.target.value
    const { name } = target
    this.setState({
      [name]: value
    })
  }
  render() {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div>
          identifiant
          <input
            type="text"
            name="identifiant"
            id="identifiant"
            placeholder="identifiant"
            value={this.state.identifiant}
            onChange={e => {
              this.handleChange(e)
            }}
          />
          password
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={e => {
              this.handleChange(e)
            }}
          />
          <button onClick={() => this.handleSubmit()}>login</button>
        </div>
      </div>
    )
  }
}

export default Auth
