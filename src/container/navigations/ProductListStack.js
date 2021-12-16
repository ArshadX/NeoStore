import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllProduct from '../screens/AllProduct';
import FilterScreen from '../screens/FilterScreen';
const ProductStack = createNativeStackNavigator();

const ProductListStack = () => {
  return (
    <ProductStack.Navigator initialRouteName="commonProducts">
      <ProductStack.Screen
        name="commonProducts"
        component={AllProduct}
        options={{headerShown: false}}
      />
      <ProductStack.Screen
        name="filter"
        component={FilterScreen}
        options={{headerShown: false}}
      />
    </ProductStack.Navigator>
  );
};

export default ProductListStack;
