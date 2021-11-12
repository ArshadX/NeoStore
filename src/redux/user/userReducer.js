import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_FAILURE2,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SignOut,
  SignUp,
  fetch_Users_task_COMPLETE,
} from './userTypes';

const initialState = {
  isloading: false,
  users: [],
  error: '',
  islogging: false,
  token: '',
  isSignup: false,
  showModal: false,
  userID: '',
  cartID: '',
  msg: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isloading: false,
        users: action.payload,
        error: '',
        islogging: true,
        token: action?.payload?.token,
        msg: action?.payload.message,
        userID: action?.payload.userId,
        cartID: action?.payload.cartId,
      };
    case FETCH_USERS_FAILURE:
      return {
        isloading: false,
        showModal: true,
        users: action?.payload,
        error: 'User does not exist',
      };
    case FETCH_USERS_FAILURE2:
      return {
        isloading: false,
        showModal: true,
        users: [],
        error: 'User already exist',
      };
    case SignOut: //remove this
      return {
        ...state,
        isloading: false,
        islogging: false,
        users: [],
        token: '',
      };
    case SignUp:
      return {
        ...state,
        isloading: false,
        isSignup: true,
        users: action?.payload,
        error: '',
        msg: action?.payload?.message,
        userID: action?.payload?.userId,
        cartID: action?.payload?.cartId,
        token: action?.payload?.token,
      };
    case fetch_Users_task_COMPLETE:
      return {
        ...state,
        isSignup: false,
        islogging: false,
        showModal: false,
      };

    default:
      return state;
  }
};
export default reducer;
