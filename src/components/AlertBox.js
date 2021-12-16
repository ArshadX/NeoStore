import React from 'react';

import {Alert} from 'react-native';

export const AlertBox = () =>
  Alert.alert('Warning!', "You haven't select the category", [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export const AlertProfileUpdate = (title, details) =>
  Alert.alert(title, details, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
export const AlertProfileUpdate2 = (title, details, onPress) =>
  Alert.alert(title, details, [{text: 'OK', onPress: onPress}]);
