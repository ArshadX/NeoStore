import React from 'react';

import {View, Text} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer} from 'react-native-paper';

import {styles} from '../../styles/styles';

const DrawerContentbefore = ({navigation}) => {
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
              icon="login"
              label="Log in"
              onPress={() => navigation.navigate('Login')}
            />
            <Drawer.Item
              icon="account-plus"
              label="Sign up"
              onPress={() => navigation.navigate('Signup')}
            />
            <Drawer.Item
              icon="shopping-search"
              label="All products"
              onPress={() => navigation.navigate('allProduct')}
            />
            <Drawer.Item icon="map-marker-multiple" label="Store Locator" />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContentbefore;
