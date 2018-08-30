import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addInfo } from './../ducks/reducer';
import home_logo from './../images/home.png';
import search_logo from './../images/search.png';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      u_first_name: this.props.u_first_name,
      u_last_name: this.props.u_last_name,
      u_gender: this.props.u_gender,
      u_hair_color: this.props.u_hair_color,
      u_eye_color: this.props.u_eye_color,
      u_hobby: this.props.u_hobby,
      u_birth_day: this.props.u_birth_day,
      u_birth_month: this.props.u_birth_month,
      u_birth_year: this.props.u_birth_year,
      friend_ids: [],
      all_other_users: [],
      sorted_users: [],
      search_criteria: '--',
      search_text: '',
      pages_array: [],
      page_number: 1,
      searching: false,
      filtered_pages_set: false
    };
    this.getFriendIds = this.getFriendIds.bind(this);
    this.checkNumberOfPages = this.checkNumberOfPages.bind(this);
    this.checkNumberOfFilteredPages = this.checkNumberOfFilteredPages.bind(this);
    this.getOtherUsers = this.getOtherUsers.bind(this);
    this.adjustSortCriteriaOnChange = this.adjustSortCriteriaOnChange.bind(this);
    this.adjustSearchTextOnChange = this.adjustSearchTextOnChange.bind(this);
    this.getFilteredUsers = this.getFilteredUsers.bind(this);
    this.handleResetOnClick = this.handleResetOnClick.bind(this);
    this.handleRemoveFriendOnClick = this.handleRemoveFriendOnClick.bind(this);
    this.handleAddFriendOnClick = this.handleAddFriendOnClick.bind(this);
    this.changePages = this.changePages.bind(this);
  }

  //Component did mount: If a user is NOT logged in, route them automatically to the "Auth" component.
  //Component did mount: load first 10 members (not including the user that is logged in)
  componentDidMount() {
    axios.get('/api/checklogin').then( response => {
      this.props.addInfo(response.data);
      this.getFriendIds();
      this.checkNumberOfPages();
      this.getOtherUsers();
    }).catch( () => {
      this.props.history.push("/");
    })
  }

  getFriendIds() {
    axios.get('/api/get_friend_ids').then( response => {
      let newArray = response.data.map( obj => {
        return obj.friend_id
      })
      this.setState({
        friend_ids: newArray
      })
    })
  }

  checkNumberOfPages() {
    axios.get('/api/check_number_of_pages').then( response => {
      let pageArray = [];
      for (var i = 1; i <= Math.ceil(response.data[0].count / 10); i++) {
        pageArray.push(i);
      }
      this.setState({
        pages_array: pageArray
      })
    })
  }

  checkNumberOfFilteredPages() {
    axios.get(`/api/check_number_of_filtered_pages?search_criteria=${this.state.search_criteria}&search_text=${this.state.search_text}`).then( response => {
      let pageArray = [];
      for (var i = 1; i <= Math.ceil(response.data[0].count / 10); i++) {
        pageArray.push(i);
      }
      this.setState({
        pages_array: pageArray,
        filtered_pages_set: true
      })
    })
  }

  //Method onClick: when "2" or "3" or "4" is clicked, load the next four "other" users
  getOtherUsers() {
    let offset = (this.state.page_number - 1) * 10;
    axios.get(`/api/get_other_users/${offset}`).then( response => {
      this.setState({
        all_other_users: response.data,
        sorted_users: response.data
      })
    }).catch( error => {
      console.log('get other users error', error )
    })
  }

  //Method onChange: update this.state.search_criteria as it is altered
  adjustSortCriteriaOnChange(event) {
    this.setState({
      search_criteria: event.target.value,
      searching: true
    })
  }

  //Method onChange: update this.state.search_box_content as it is typed
  adjustSearchTextOnChange(event) {
    this.setState({
      search_text: event.target.value,
      searching: true
    })
  }

  getFilteredUsers() {
    if(this.state.filtered_pages_set === false) {
      this.checkNumberOfFilteredPages();
    }
    let offset = (this.state.page_number - 1) * 10;
    axios.get(`/api/get_other_filtered_users/${offset}?search_criteria=${this.state.search_criteria}&search_text=${this.state.search_text}`)
    .then( response => {
      this.setState({
        all_other_users: response.data,
        sorted_users: response.data
      })
    }).catch( error => {
      console.log('get filtered users error', error )
    })
  }

  //Method onClick: when "Reset" is clicked, set this.state.all_other_users to the values that were originally pulled from the db when this component mounted
  handleResetOnClick(event) {
    this.setState({
      search_criteria: '--',
      search_text: '',
      searching: false,
      filtered_pages_set: false
    },()=>{
      this.checkNumberOfPages();
      this.getOtherUsers();
    })
  }

  handleRemoveFriendOnClick(remove_friend_id) {
    axios.delete(
      `/api/remove_friend/${remove_friend_id}`
    ).then( response => {
      this.getFriendIds();
    }).catch( error => {
      console.log('remove friend error', error )
    })
  }

  handleAddFriendOnClick(add_friend_id) {
    axios.post('/api/add_friend', {
      friend_id: add_friend_id
    }).then ( response => {
      this.getFriendIds();
    }).catch( error => {
      console.log('add friend error', error )
    })
  }

  changePages(new_page_number) {
    this.setState({
      page_number: new_page_number
    }, () => {
      if(this.state.searching === false) {
        this.getOtherUsers();
      }
      if(this.state.searching === true) {
        this.getFilteredUsers();
      }
    });
  }

  render() {
    return (
      <div className="search_overall">

        <section className="search_display_area">

        <header className="app_header">
          <div className="header_helo_home_search_container">
            <h1 className="header_helo_title">Helo</h1>
            <Link to='/dashboard'><img id="two" className="header_home_icon" src={home_logo} alt="Home/Dashboard"/></Link>
            <Link to='/search'><img className="header_search_icon" src={search_logo} alt="Search"/></Link>
          </div>
          <div className="header_view_title_container">
            <p className="header_view_title">Search</p>
          </div>
          <div className="header_logout_container">
            <a href={process.env.REACT_APP_LOGOUT} className="header_logout">Logout</a>
          </div>
        </header>

        </section>
        <section className="app_display_area">
          
          <div className="search_elements_container">
            <select value={this.state.search_criteria} onChange={this.adjustSortCriteriaOnChange} className="search_criteria_drop_down">
              <option value='--' >--</option>
              <option value='u_first_name' >First Name</option>
              <option value='u_last_name' >Last Name</option>
            </select>
            <input value={this.state.search_text} onChange={this.adjustSearchTextOnChange} className="search_input_box" />
            {this.state.search_criteria !== '--' && this.state.search_text !== '' ? 
              <button onClick={this.getFilteredUsers} className="search_button">Search</button> :
              <button className="search_button">Search</button>}
            <button onClick={this.handleResetOnClick} className="reset_search_button">Reset</button>
          </div>

          <div className="search_results_container">

          {this.state.sorted_users.map( obj => {
            return (
              <div key={obj.id} className="matched_search_friend_info_container">
                <img className="matched_search_friend_image" src={obj.u_pic_url} alt="Matched Friend"/>
                <div>
                  <p className="matched_search_friend_first_name">{obj.u_first_name}</p>
                  <p className="matched_search_friend_last_name">{obj.u_last_name}</p>
                </div>
                {this.state.friend_ids.indexOf(obj.id) >= 0 ? 
                  <button onClick={ () => this.handleRemoveFriendOnClick(obj.id) } className="search_remove_friend_button">Remove Friend</button> : 
                  <button onClick={ () => this.handleAddFriendOnClick(obj.id) }className="search_add_friend_button">Add Friend</button>}
              </div>
            )
          })}

          </div>

          <div className="container_of_page_links_container">
            <div className="page_links_container">

            {this.state.pages_array.map( num => {
              if (num === this.state.page_number) {
                return (
                  <div key={num} className="current_page_indicator">
                   <p className="current_page_number">Page {num}</p>
                  </div>
                )
              } else {
                return (
                  <div key={num} className="page_indicator" onClick={ () => this.changePages(num) }>
                   <p className="page_number">{num}</p>
                  </div>
                )
              }
            })}
              
            </div>
          </div>

        </section>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
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

export default connectedApp(Search);