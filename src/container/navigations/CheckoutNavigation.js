import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderReview from '../screens/Checkout/OrderReview';
import EditAddfromPTB from '../screens/manage_profile/Addresses/EditAddfromPTB';
import AddAddressPTB from '../screens/manage_profile/Addresses/AddAddressPTB';
import ProceedToBuy from '../screens/Checkout/ProceedToBuy';
const checkOut = createNativeStackNavigator();

const CheckoutNavigation = ({route}) => {
  const {id} = route.params;
  return (
    <checkOut.Navigator initialRouteName="ProceedToBuy">
      <checkOut.Screen
        name="ProceedToBuy"
        component={ProceedToBuy}
        options={{headerShown: false}}
        initialParams={{id}}
      />
      <checkOut.Screen
        name="OrderReview"
        component={OrderReview}
        options={{headerShown: false}}
      />
      <checkOut.Screen
        name="EditAddressPTB"
        component={EditAddfromPTB}
        options={{headerShown: false}}
      />
      <checkOut.Screen
        name="AddAddressPTB"
        component={AddAddressPTB}
        options={{headerShown: false}}
      />
    </checkOut.Navigator>
  );
};

export default CheckoutNavigation;
