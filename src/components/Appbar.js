import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Appbar = ({title, leftIcon, backgroundColor, onPressIcon}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Icon name={leftIcon} size={30} color="#000000" onPress={onPressIcon} />
      <Text style={styles.appbartext}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    elevation: 1,
    width: Dimensions.get('window').width,
  },
  appbartext: {
    fontFamily: 'serif',
    color: '#000000',
    fontSize: 20,
    marginLeft: 25,
  },
});

export default Appbar;
