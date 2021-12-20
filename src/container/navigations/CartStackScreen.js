import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Cart from '../screens/Cart';

import ProceedToBuy from '../screens/Checkout/ProceedToBuy';

import OrderReview from '../screens/Checkout/OrderReview';
import EditAddfromPTB from '../screens/manage_profile/Addresses/EditAddfromPTB';
import AddAddressPTB from '../screens/manage_profile/Addresses/AddAddressPTB';
import CheckoutNavigation from './CheckoutNavigation';
const CartStack = createNativeStackNavigator();

const CartStackScreen = () => {
  return (
    <CartStack.Navigator initialRouteName="CartScreen">
      <CartStack.Screen
        name="CartScreen"
        component={Cart}
        options={{headerShown: false}}
      />
      <CartStack.Screen
        name="Checkout"
        component={CheckoutNavigation}
        options={{headerShown: false}}
      />
      {/* <CartStack.Screen
        name="OrderReview"
        component={OrderReview}
        options={{headerShown: false}}
      />
      <CartStack.Screen
        name="EditAddressPTB"
        component={EditAddfromPTB}
        options={{headerShown: false}}
      />
      <CartStack.Screen
        name="AddAddressPTB"
        component={AddAddressPTB}
        options={{headerShown: false}}
      /> */}
    </CartStack.Navigator>
  );
};

export default CartStackScreen;
