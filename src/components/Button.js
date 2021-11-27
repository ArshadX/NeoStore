import React from 'react';

import {Pressable, Text, StyleSheet} from 'react-native';

const Button = ({title, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        pressed ? styles.pressIn : styles.pressOut,
        styles.pressableStyle,
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressableStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 120,
    marginRight: 120,
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
  },
  pressIn: {
    backgroundColor: '#0000cd',
  },
  pressOut: {
    backgroundColor: '#4169e1',
  },
});
export default Button;
