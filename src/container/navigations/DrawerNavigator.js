import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStackScreen from './HomeStackScreen';
import DrawerContentafter from '../screens/DrawerContentafter';

import AllProduct from '../screens/AllProduct';
import AccountNavigation from './AccountNavigation';
import Cart from '../screens/Cart';
import MyOrders from '../screens/MyOrders';
import {connect} from 'react-redux';
//Will be move to StackScreens
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContentafter {...props} />}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />

      <Drawer.Screen
        name="MyAccount"
        component={AccountNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="allProduct"
        component={AllProduct}
        options={{
          title: 'Product List',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="MyOrder"
        component={MyOrders}
        options={{
          title: 'Orders',
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, null)(DrawerNavigator);
