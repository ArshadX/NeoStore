import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Arrow = ({distance, arrowType}) => {
  return (
    <Icon
      name={arrowType}
      size={30}
      color="#000000"
      style={styles.rightStyle}
    />
  );
};

const styles = StyleSheet.create({
  rightStyle: {
    position: 'absolute',
    right: 5,
    top: 8,
    bottom: 0,
  },
});
export default Arrow;
