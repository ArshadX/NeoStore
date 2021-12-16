import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';

import ProductDetail from '../screens/ProductDetail';
import Searchbar from '../../components/Searchbar';
import SearchedProducts from '../screens/SearchedProducts';
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="productDetails"
        component={ProductDetail}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="search"
        component={Searchbar}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="searchedProducts"
        component={SearchedProducts}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
