import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addInfo } from './../ducks/reducer';
import home_logo from './../images/home.png';
import search_logo from './../images/search.png';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommended_friends: [],
      sorted_friends: []
    };
    this.handleSortOnChange = this.handleSortOnChange.bind(this);
    this.handleAddOnClick = this.handleAddOnClick.bind(this);
  }

  //Component did mount: load current user info
  //Component did mount: Load everyone who is not currently the user's friend
  //Component did mount: If a user is NOT logged in, route them automatically to the "Auth" component.
  componentDidMount() {
    axios.get('/api/checklogin').then( response => {
      this.props.addInfo(response.data)
      axios.get(`/api/recommended_friends`).then( response => {
        this.setState({
          recommended_friends: response.data,
          sorted_friends: response.data
        })
      })
    }).catch( () => {
      this.props.history.push("/");
    })
  }

  //Method: Update the sorting criteria as soon as it is changed
  //Method: Sort everyone who is not currently the user's friend by the sorting criteria provided
  handleSortOnChange(event) {
    if(event.target.value === '--') {
      this.setState({sorted_friends: this.state.recommended_friends})
    }
    if(event.target.value === 'First Name') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_first_name === this.props.u_first_name );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Last Name') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_last_name === this.props.u_last_name );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Gender') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_gender === this.props.u_gender );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Hair Color') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_hair_color === this.props.u_hair_color );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Eye Color') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_eye_color === this.props.u_eye_color );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Hobby') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_hobby === this.props.u_hobby );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Birth Day') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_birth_day === this.props.u_birth_day );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Birth Month') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_birth_month === this.props.u_birth_month );
      this.setState({sorted_friends: sortedArray})
    }
    if(event.target.value === 'Birth Year') {
      let sortedArray = this.state.recommended_friends.filter( friend => friend.u_birth_year === this.props.u_birth_year );
      this.setState({sorted_friends: sortedArray})
    }
  }

  //Add friend when the "add friend" button is clicked
  handleAddOnClick(new_friend_id) {
    axios.post('/api/add_friend', {
      friend_id: new_friend_id
    }).then ( response => {
      //pull the recommended_friends from the db again
      axios.get(`/api/recommended_friends`).then( response => {
        this.setState({
          recommended_friends: response.data,
          sorted_friends: response.data
        })
      })
    })
  }


  render() {

    let { u_pic_url, u_first_name, u_last_name } = this.props;

    return (
      <div className="dashboard_overall">

        <header className="app_header">
          <div className="header_helo_home_search_container">
            <p className="header_helo_title">Helo</p>
            <img className="header_home_icon" src={home_logo} alt="Home/Dashboard"/>
            <Link to='/search'>
            <img className="header_search_icon" src={search_logo} alt="Search"/>
            </Link>
          </div>
          <div className="header_view_title_container">
            <p className="header_view_title">Dashboard</p>
          </div>
          <div className="header_logout_container">
            <a href={process.env.REACT_APP_LOGOUT} className="header_logout">Logout</a>
          </div>
        </header>



        <section className="dashboard_display_area">

          <div className="dashboard_user_info_and_welcome_text_container">
            <div className="dashboard_user_info_container">
              <img className="dashboard_user_info_img" src={u_pic_url} alt="Dashboard User"/>
              <div className="dashboard_user_name_and_edit_button_container">
                {this.props.u_first_name ? <p className="dashboard_user_first_name">{u_first_name}</p> : 
                  <p>First Name</p>}
                {this.props.u_last_name ? <p className="dashboard_user_last_name">{u_last_name}</p> : 
                  <p>Last Name</p>}
                <Link to='/profile'>
                <button className="dashboard_user_info_edit_button">Edit Profile</button>
                </Link>
              </div>
            </div>
            <div className="dashboard_welcome_container">
              <p className="dashboard_welcome_text">Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
            </div>
          </div>

        </section>


        <section className="app_display_area">

            <div className="recommended_friends_header">
              <p className="recommended_friends_header_title">Recommended Friends</p>
              <div className="recommended_friends_header_sorting_container">
                <p className="recommended_friends_header_sorting_title">Sorted by</p>
                <select onChange={this.handleSortOnChange} className="recommended_friends_header_sorting_selector">
                  <option>--</option>
                  <option>First Name</option>
                  <option>Last Name</option>
                  <option>Gender</option>
                  <option>Hair Color</option>
                  <option>Eye Color</option>
                  <option>Hobby</option>
                  <option>Birth Day</option>
                  <option>Birth Month</option>
                  <option>Birth Year</option>
                </select>
              </div>
            </div>

            <div className="no_recommended_friends_text_container">
              {!this.state.sorted_friends[0] ? <p className="no_recommended_friends_text">No recommendations</p> : 
               <p></p>}
            </div>
            

            <div className="actual_recommended_friends_container">

              {this.state.sorted_friends.map( obj => {
                return (
                  <div key={obj.id} className="recommended_friend_info_container">
                    <img className="recommended_friend_image" src={obj.u_pic_url} alt="Recommended Friend"/>
                    <div className="recommended_friend_name_container">
                      <p className="recommended_friend_first_name">{obj.u_first_name}</p>
                      <p className="recommended_friend_last_name">{obj.u_last_name}</p>
                    </div>
                    <button onClick={ () => this.handleAddOnClick(obj.id) } className="add_recommended_friend_button">Add Friend</button>
                  </div> 
                )
              })}

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
    u_birth_year: state.u_birth_year,
  }
}

var outputActions = {
  addInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Dashboard);