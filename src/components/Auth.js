import React, { Component } from 'react';
import axios from 'axios';
import helo_logo from './../images/helo_logo.png'
import './Auth.css';

class Auth extends Component {

  //Component did mount: If a user is logged in, route them automatically to the "Dashboard" component.
  componentDidMount() {
    axios.get('/api/checklogin').then( () => {
      this.props.history.push('/dashboard');
    }).catch( response => {
    })
  }

  render() {
    return (
      <div className="auth_background">

        <div className="containter_of_auth_elements">
          <img className="logo_auth_element" src={helo_logo} alt="Logo"/>
          <p className="title_auth_element">Helo</p>
          <div className="login_register_container">
            <a href={process.env.REACT_APP_LOGIN}>Login / Register</a>
          </div>
        </div>

      </div>
    )
  }
}

export default Auth;