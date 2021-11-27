import React from 'react';

import {Alert} from 'react-native';

export const AlertBox = () =>
  Alert.alert('Warning!', "You haven't select the category", [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export const AlertProfileUpdate = data =>
  Alert.alert('Warning!', data, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
