import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import RootStackScreen from './RootStackScreen';
import HomeStackScreen from './HomeStackScreen';
import DrawerContentbefore from '../screens/DrawerContentbefore';
import DrawerContentafter from '../screens/DrawerContentafter';
import SignUpScreen from '../screens/SignUpScreen';
import AllProduct from '../screens/AllProduct';
import MyAccount from '../screens/MyAccount';
import Cart from '../screens/Cart';
import MyOrders from '../screens/MyOrders';

//Will be move to StackScreens
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton, Colors} from 'react-native-paper';
const SignupStack = createNativeStackNavigator();
const SignupStackScreen = ({navigation}) => {
  return (
    <SignupStack.Navigator>
      <SignupStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Sign up',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
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
    </SignupStack.Navigator>
  );
};
////end temp StackScreens

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props =>
        true ? (
          <DrawerContentbefore {...props} />
        ) : (
          <DrawerContentafter {...props} />
        )
      }>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen
        name="Login"
        component={RootStackScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Signup"
        component={SignupStackScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: 'My Account',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="allProduct"
        component={AllProduct}
        options={{
          title: 'Product List',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="MyOrder"
        component={MyOrders}
        options={{
          title: 'Orders',
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
