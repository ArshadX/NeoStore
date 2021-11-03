import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import forgotPassword from '../screens/forgotPassword';
import resetPassword from '../screens/resetPassword';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator initialRouteName="SignIn">
      <RootStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Sign up',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <RootStack.Screen
        name="forgotPassword"
        component={forgotPassword}
        options={{
          title: 'Forgot Password',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: true,
        }}
      />
      <RootStack.Screen
        name="resetPassword"
        component={resetPassword}
        options={{
          title: 'Reset Password',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShadowVisible: true,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
