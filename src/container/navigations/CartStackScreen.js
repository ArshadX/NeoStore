import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Cart from '../screens/Cart';

import ProceedToBuy from '../screens/Checkout/ProceedToBuy';

import OrderReview from '../screens/Checkout/OrderReview';
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
        name="ProceedToBuy"
        component={ProceedToBuy}
        options={{headerShown: false}}
      />
      <CartStack.Screen
        name="OrderReview"
        component={OrderReview}
        options={{headerShown: false}}
      />
    </CartStack.Navigator>
  );
};

export default CartStackScreen;
