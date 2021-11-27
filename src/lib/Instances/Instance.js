import axios from 'axios';

// Set config defaults when creating the instance
export const instance = axios.create({
  baseURL: 'https://nameless-savannah-21991.herokuapp.com',
});

export const imageUrl =
  'https://nameless-savannah-21991.herokuapp.com/images/productImages/';
// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
export const profile_image =
  'https://nameless-savannah-21991.herokuapp.com/images/user/';
