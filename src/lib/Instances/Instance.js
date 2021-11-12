import axios from 'axios';

// Set config defaults when creating the instance
export const instance = axios.create({
  baseURL: 'https://nameless-savannah-21991.herokuapp.com',
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
