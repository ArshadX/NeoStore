import React from 'react';
import {View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer, Button} from 'react-native-paper';

import {styles} from '../../styles/styles';
import {connect} from 'react-redux';
import {Logout} from '../../redux/user/userActions';
const DrawerContentafter = ({navigation, Logout, userData}) => {
  return (
    <View style={styles.Container}>
      <DrawerContentScrollView>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>NeoStore</Text>
        </View>
        <View style={styles.footer}>
          <Drawer.Section>
            <Drawer.Item
              icon="home"
              label="Home"
              onPress={() => navigation.navigate('Home')}
            />
            {userData.islogging ? (
              <Drawer.Item
                icon="account"
                label="My Account"
                onPress={() => navigation.navigate('MyAccount')}
              />
            ) : (
              <Drawer.Item
                icon="login"
                label="Log in"
                onPress={() => navigation.navigate('Login')}
              />
            )}
            {userData.islogging ? (
              <Drawer.Item
                icon="cart"
                label="Cart"
                onPress={() => navigation.navigate('Cart')}
              />
            ) : (
              <Drawer.Item
                icon="account-plus"
                label="Sign up"
                onPress={() => navigation.navigate('Signup')}
              />
            )}
            <Drawer.Item
              icon="shopping-search"
              label="All Products"
              onPress={() => navigation.navigate('allProduct')}
            />

            {userData.islogging ? (
              <Drawer.Item
                icon="truck-fast-outline"
                label="My Orders"
                onPress={() => navigation.navigate('MyOrder')}
              />
            ) : null}
            <Drawer.Item icon="map-marker-multiple" label="Store Locator" />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {userData.islogging ? (
        <Drawer.Item
          icon="logout"
          label="Sign out"
          onPress={() => {
            Logout();
            return navigation.navigate('Home');
          }}
        />
      ) : null}
    </View>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Logout: () => dispatch(Logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContentafter);
