//TYPES
const ADD_INFO = "ADD_INFO";

//ACTION BUILDERS
export function addInfo(user_info) {
  return {
    type: ADD_INFO,
    payload: user_info
  }
}

const initialState = {
  id: 0,
  u_pic_url: '',
  u_first_name: '',
  u_last_name: '',
  u_gender: '',
  u_hair_color: '',
  u_eye_color: '',
  u_hobby: '',
  u_birth_day: 0,
  u_birth_month: 0,
  u_birth_year: 0
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {

  switch(action.type) {

    case ADD_INFO:
      return Object.assign( {}, state, 
        action.payload
      );

    default:
      return state;

  }
}