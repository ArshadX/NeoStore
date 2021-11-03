import React from 'react';
import {View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer, Button} from 'react-native-paper';

import {styles} from '../../styles/styles';

const DrawerContentafter = ({navigation}) => {
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
            <Drawer.Item
              icon="account"
              label="My Account"
              onPress={() => navigation.navigate('MyAccount')}
            />
            <Drawer.Item
              icon="shopping-search"
              label="All Products"
              onPress={() => navigation.navigate('allProduct')}
            />
            <Drawer.Item
              icon="cart"
              label="Cart"
              onPress={() => navigation.navigate('Cart')}
            />
            <Drawer.Item
              icon="truck-fast-outline"
              label="My Orders"
              onPress={() => navigation.navigate('MyOrder')}
            />
            <Drawer.Item icon="map-marker-multiple" label="Store Locator" />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Item icon="logout" label="Sign out" />
    </View>
  );
};

export default DrawerContentafter;
