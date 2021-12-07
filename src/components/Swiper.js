import React from 'react';

import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';

import {imageUrl} from '../lib/Instances/Instance';

const Swiper = ({image}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl + image}} style={styles.imageStyle} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: 333,
  },
  imageStyle: {
    width: Dimensions.get('window').width - 294,
    height: 225,
    marginVertical: 10,
  },
});
export default Swiper;
