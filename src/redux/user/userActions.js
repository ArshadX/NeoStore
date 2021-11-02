import axios from 'axios';

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SignOut,
  SignUp,
  fetch_Users_Signup_COMPLETE,
} from './userTypes';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
export const fetchUsersSignup = users => {
  return {
    type: SignUp,
    payload: users,
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
export const signOUT = () => {
  //remove this
  return {
    type: SignOut,
  };
};
const fetchUsersSignupComplete = () => {
  return {
    type: fetch_Users_Signup_COMPLETE,
  };
};

/**
 *
 * @param {login} data
 * @returns repsonse with data
 */
export const login = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .post('https://nameless-savannah-21991.herokuapp.com/login', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};
/**
 *
 * @param {register user} data
 * @returns response from api with data
 */
export const registerUser = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .post('https://nameless-savannah-21991.herokuapp.com/register', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSignup(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};

/**
 *
 * @param {data from sign in page} data
 * @returns response from api with data
 */
export const forgetPassword = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .post(
        'https://nameless-savannah-21991.herokuapp.com/forgotPassword',
        data,
      )
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};

/**
 *
 * @param {after forget password step} data
 * @returns send varification code and password to api
 */
export const recoverPassword = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .post(
        'https://nameless-savannah-21991.herokuapp.com/recoverPassword',
        data,
      )
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};
/**
 *
 * @action logout from drawer
 */
export const Logout = () => {
  return dispatch => {
    dispatch(signOUT());
  };
};

/**
 *
 * @action navigate automatically to signin screen
 */
export const SignupComplete = () => {
  return dispatch => {
    dispatch(fetchUsersSignupComplete());
  };
};
