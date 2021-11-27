import React from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Appbar from '../../../../components/Appbar';
import Arrow from '../../../../components/Arrow';
const MyAddresses = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6495ed" />
      <Appbar
        title="Back"
        leftIcon="arrow-left"
        backgroundColor="#d3d3d3"
        onPressIcon={() => navigation.goBack()}
      />
      <View style={styles.contentView}>
        <Text style={styles.title}>Your Addresses</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('addAdress')}>
          <Text style={styles.textStyle}>Add a new address</Text>
          <Arrow />
        </Pressable>
        <View style={styles.ViewAddress}>
          <Text style={styles.titleMedium}>Personal Addresses</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleMedium: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentView: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  button: {
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#a9a9a9',
  },
  textStyle: {
    color: '#000000',
    fontFamily: 'serif',
  },
  ViewAddress: {
    marginTop: 10,
  },
});

export default MyAddresses;
