import { LOGIN_USER } from "../actions";
const INICIAL_STATE = {
  email: '',
};

const userReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER :
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
