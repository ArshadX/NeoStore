import axios from 'axios';
import {instance} from '../../lib/Instances/Instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_FAILURE2,
  FETCH_USERS_FAILURESplash,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SignOut,
  SignUp,
  fetch_Users_task_COMPLETE,
  Product_List,
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
export const fetchUsersFailure2 = error => {
  return {
    type: FETCH_USERS_FAILURE2,
    payload: error,
  };
};
export const fetchUsersFailureSplash = () => {
  return {
    type: FETCH_USERS_FAILURESplash,
  };
};
export const signOUT = () => {
  //remove this
  return {
    type: SignOut,
  };
};
const fetchUsersTaskComplete = () => {
  return {
    type: fetch_Users_task_COMPLETE,
  };
};
const fetchProduct = list => {
  return {
    type: Product_List,
    payload: list,
  };
};

/**
 *
 * @param {login} data
 * @returns repsonse with data
 */
export const login = (data, screen) => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    instance
      .post('/login', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};
export const loginfromSplash = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    instance
      .post('/login', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error;
        dispatch(fetchUsersFailureSplash());
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
    instance
      .post('/register', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSignup(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure2(errorMsg));
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
  const removeFew = async () => {
    const keys = ['Email', 'Password'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log(e);
    }
  };
  removeFew();
  return dispatch => {
    dispatch(signOUT());
  };
};

/**
 *
 * @action navigate automatically to signin screen
 */
export const taskComplete = () => {
  return dispatch => {
    dispatch(fetchUsersTaskComplete());
  };
};

/**Product list */

export const productList = () => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    instance
      .get(`/login`, data)
      .then(response => {
        const list = response.data;
        dispatch(fetchProduct(list));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error?.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};
