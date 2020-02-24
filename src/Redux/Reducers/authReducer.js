import { LOGIN, LOGOUT, REGISTER } from "../actionTypes";

const initialState = {
  user: {},
  registered: false
};

export const login = activeUser => {
  console.log("HIT LOGIN", activeUser);
  if (!activeUser.attributes) {
    activeUser.attributes = {};
  }
  activeUser.attributes.profilePic = `https://robohash.org/${activeUser.username}`;
  activeUser.attributes.loggedIn = true;
  return {
    type: LOGIN,
    payload: activeUser
  };
};

export const register = activeUser => {
  const user = {
    registered: true
  };

  return {
    type: REGISTER,
    payload: user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload
      };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };
    case REGISTER:
      return {
        ...state,
        user: payload
      };
    case LOGOUT:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}
