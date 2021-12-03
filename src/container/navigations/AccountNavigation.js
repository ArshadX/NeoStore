import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import updateProfile from '../screens/manage_profile/updateProfile';

import MyAccount from '../screens/MyAccount';
import Cart from '../screens/Cart';

import MyOrders from '../screens/MyOrders';

import MyAddresses from '../screens/manage_profile/Addresses/MyAddresses';

import ResetPasswordfromAccount from '../screens/manage_profile/ResetPasswordfromAccount';

import AddAddresses from '../screens/manage_profile/Addresses/AddAddresses';
import EditAddress from '../screens/manage_profile/Addresses/EditAddress';
const RootStack = createNativeStackNavigator();

const AccountNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName="myAccount">
      <RootStack.Screen
        name="myAccount"
        component={MyAccount}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="updateProfile"
        component={updateProfile}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="cartfromAccount"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="ordersfromAccount"
        component={MyOrders}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Address"
        component={MyAddresses}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="addAdress"
        component={AddAddresses}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="resetPasswordfromAccount"
        component={ResetPasswordfromAccount}
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

export default AccountNavigation;
