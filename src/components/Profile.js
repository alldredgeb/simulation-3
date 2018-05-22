import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addInfo } from './../ducks/reducer';
import home_logo from './../images/home.png';
import search_logo from './../images/search.png';
import './Profile.css'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      u_pic_url: this.props.u_pic_url,
      u_first_name: this.props.u_first_name,
      u_last_name: this.props.u_last_name,
      u_gender: this.props.u_gender,
      u_hair_color: this.props.u_hair_color,
      u_eye_color: this.props.u_eye_color,
      u_hobby: this.props.u_hobby,
      u_birth_day: this.props.u_birth_day,
      u_birth_month: this.props.u_birth_month,
      u_birth_year: this.props.u_birth_year
    };
    this.updateFirstNameOnChange = this.updateFirstNameOnChange.bind(this);
    this.updateLastNameOnChange = this.updateLastNameOnChange.bind(this);
    this.updateGenderOnChange = this.updateGenderOnChange.bind(this);
    this.updateHairColorOnChange = this.updateHairColorOnChange.bind(this);
    this.updateEyeColorOnChange = this.updateEyeColorOnChange.bind(this);
    this.updateHobbyOnChange = this.updateHobbyOnChange.bind(this);
    this.updateBirthDayOnChange = this.updateBirthDayOnChange.bind(this);
    this.updateBirthMonthOnChange = this.updateBirthMonthOnChange.bind(this);
    this.updateBirthYearOnChange = this.updateBirthYearOnChange.bind(this);
    this.handleUpdateOnClick = this.handleUpdateOnClick.bind(this);
    this.handleCancelOnClick = this.handleCancelOnClick.bind(this);
  }

  //Component did mount: load current user info
  //Component did mount: If a user is NOT logged in, route them automatically to the "Auth" component.
  componentDidMount() {
    axios.get('/api/checklogin').then( response => {
      this.props.addInfo(response.data);
    }).catch( () => {
      this.props.history.push("/");
    })
  }

  //Method onChange: update this.state.u_first_name as it is altered
  updateFirstNameOnChange(event) {
    this.setState({
      u_first_name: event.target.value
    })
  }
  //Method onChange: update this.state.u_last_name as it is altered
  updateLastNameOnChange(event) {
    console.log('update_first_name_onChange', event.target.value);
    this.setState({
      u_last_name: event.target.value
    })
  }
  //Method onChange: update this.state.u_gender as it is altered
  updateGenderOnChange(event) {
    this.setState({
      u_gender: event.target.value
    })
  }
  //Method onChange: update this.state.u_hair_color as it is altered
  updateHairColorOnChange(event) {
    this.setState({
      u_hair_color: event.target.value
    })
  }
  //Method onChange: update this.state.u_eye_color as it is altered
  updateEyeColorOnChange(event) {
    this.setState({
      u_eye_color: event.target.value
    })
  }
  //Method onChange: update this.state.u_hobby as it is altered
  updateHobbyOnChange(event) {
    this.setState({
      u_hobby: event.target.value
    })
  }
  //Method onChange: update this.state.u_birth_day as it is altered
  updateBirthDayOnChange(event) {
    this.setState({
      u_birth_day: event.target.value
    })
  }
  //Method onChange: update this.state.u_birth_month as it is altered
  updateBirthMonthOnChange(event) {
    this.setState({
      u_birth_month: event.target.value
    })
  }
  //Method onChange: update this.state.u_birth_year as it is altered
  updateBirthYearOnChange(event) {
    this.setState({
      u_birth_year: event.target.value
    })
  }

  //Method onClick: When the "Update" button is clicked, update state and update the db with the newly entered information.
  handleUpdateOnClick(event) {
    if(this.state.u_birth_day === null || this.state.u_birth_month === null || this.state.u_birth_year === null)  {
      return alert("ERROR: All of the birthday fields must be filled out in order to update the profile.");
    }
      axios.put('/api/updateuser', {
        u_first_name: this.state.u_first_name,
        u_last_name: this.state.u_last_name,
        u_gender: this.state.u_gender,
        u_hair_color: this.state.u_hair_color,
        u_eye_color: this.state.u_eye_color,
        u_hobby: this.state.u_hobby,
        u_birth_day: this.state.u_birth_day,
        u_birth_month: this.state.u_birth_month,
        u_birth_year: this.state.u_birth_year
      }).then( () => {
        this.props.history.push('/dashboard');
      }).catch( error => {
        console.log('update_user_error', error)
      })
  }

  //Method onClick: When the "cancel" button is clicked, set state to the values that were originally pulled from the db when this component mounted
  handleCancelOnClick(event) {
    console.log('cancel_on_click', this.props);
    this.setState({
      u_pic_url: this.props.u_pic_url,
      u_first_name: this.props.u_first_name,
      u_last_name: this.props.u_last_name,
      u_gender: this.props.u_gender,
      u_hair_color: this.props.u_hair_color,
      u_eye_color: this.props.u_eye_color,
      u_hobby: this.props.u_hobby,
      u_birth_day: this.props.u_birth_day,
      u_birth_month: this.props.u_birth_month,
      u_birth_year: this.props.u_birth_year
    })
  }

  render() {
    
    let { u_pic_url, u_first_name, u_last_name } = this.props;

    return (
      <div className="profile_overall">

        <header className="app_header">
          <div className="header_helo_home_search_container">
            <h1 className="header_helo_title">Helo</h1>
            <Link to='/dashboard'><img id="one" className="header_home_icon" src={home_logo} alt="Home/Dashboard"/></Link>
            <Link to='/search'><img className="header_search_icon" src={search_logo} alt="Search"/></Link>
          </div>
          <div className="header_view_title_container">
            <p className="header_view_title">Profile</p>
          </div>
          <div className="header_logout_container">
            <a href={process.env.REACT_APP_LOGOUT} className="header_logout">Logout</a>
          </div>
        </header>



        <section className="profile_display_area">

          <div className="profile_user_info_and_update_cancel_buttons_container">
            <div className="profile_user_info_container">
              <img className="profile_user_info_image" src={u_pic_url} alt="Profile User"/>
              <div className="profile_user_info_name_container">
                {u_first_name ? <p className="profile_user_info_first_name">{u_first_name}</p> : 
                  <p>First Name</p>}
                {u_last_name ? <p className="profile_user_info_last_name">{u_last_name}</p> : 
                  <p>Last Name</p>}
              </div>
            </div>
            <div className="profile_user_info_update_and_cancel_buttons_container">
            <button className="profile_user_info_update_button" onClick={this.handleUpdateOnClick}>Update</button>
            <button className="profile_user_info_cancel_button" onClick={this.handleCancelOnClick}>Cancel</button>
            </div>
          </div>

          </section>
          <section className="app_display_area">

          <div className="edit_user_info_container">
            <div className="edit_user_info_first_column">
              <p className="edit_user_first_name">First Name</p>
                <input className="first_name_input" value={this.state.u_first_name} onChange={this.updateFirstNameOnChange}/>
              <p className="edit_user_last_name">Last Name</p>
                <input className="last_name_input" value={this.state.u_last_name} onChange={this.updateLastNameOnChange}/>
              <p className="edit_user_gender">Gender</p>
                <select value={this.state.u_gender} onChange={this.updateGenderOnChange}>
                  <option>null</option>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              <p className="edit_user_hair_color">Hair Color</p>
                <select value={this.state.u_hair_color} onChange={this.updateHairColorOnChange}>
                  <option>null</option>
                  <option>Black</option>
                  <option>Blonde</option>
                  <option>Brown</option>
                  <option>Red</option>
                </select>
              <p className="edit_user_eye_color">Eye Color</p>
                <select value={this.state.u_eye_color} onChange={this.updateEyeColorOnChange}>
                  <option>null</option>
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Brown</option>
                </select>
            </div>
            <div className="edit_user_info_second_column">
            <p className="edit_user_hobby">Hobby</p>
                <select value={this.state.u_hobby} onChange={this.updateHobbyOnChange}>
                  <option>null</option>
                  <option>Bike</option>
                  <option>Run</option>
                  <option>Swim</option>
                </select>
              <p className="edit_user_birthday_day">Birthday Day</p>
                <select value={this.state.u_birth_day} onChange={this.updateBirthDayOnChange}>
                  <option>null</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              <p className="edit_user_birthday_month">Birthday Month</p>
                <select value={this.state.u_birth_month} onChange={this.updateBirthMonthOnChange}>
                  <option>null</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                </select>
              <p className="edit_user_birthday_year">Birthday Year</p>
                <select value={this.state.u_birth_year} onChange={this.updateBirthYearOnChange}>
                  <option>null</option>
                  <option>1990</option>
                  <option>1991</option>
                  <option>1992</option>
                  <option>1993</option>
                  <option>1994</option>
                  <option>1995</option>
                </select>
            </div>
          </div>

        </section>

      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    u_pic_url: state.u_pic_url,
    u_first_name: state.u_first_name,
    u_last_name: state.u_last_name,
    u_gender: state.u_gender,
    u_hair_color: state.u_hair_color,
    u_eye_color: state.u_eye_color,
    u_hobby: state.u_hobby,
    u_birth_day: state.u_birth_day,
    u_birth_month: state.u_birth_month,
    u_birth_year: state.u_birth_year
  }
}

var outputActions = {
  addInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Profile);