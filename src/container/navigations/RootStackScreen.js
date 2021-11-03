import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IconButton, Colors} from 'react-native-paper';

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
          title: 'Sign In',
          headerShown: true,
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              color={Colors.red500}
              size={20}
              onPress={() => navigation.navigate('Home')}
            />
          ),
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
