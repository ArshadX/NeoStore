import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = ({name, size, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        pressed ? styles.pressIn : styles.pressOut,
        styles.icon,
      ]}>
      <Icon name={name} size={size} color="#ffffff" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressIn: {
    backgroundColor: '#6495ed',
  },
  pressOut: {
    backgroundColor: '#353839',
  },
  icon: {
    padding: 1,
    borderRadius: 20,
  },
});
export default IconButton;
