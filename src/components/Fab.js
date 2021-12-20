import React from 'react';

import {View, Text, StyleSheet, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Fab = ({iconName, size, color, backgroundColor, onPress, disabled}) => {
  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        pressed ? styles.pressIn : {backgroundColor: backgroundColor},
        styles.fabStyle,
        disabled ? {backgroundColor: '#696969'} : null,
      ]}
      onPress={onPress}>
      <Icon name={iconName} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    padding: 20,
    borderRadius: 60,
    zIndex: 1,
    alignSelf: 'center',
    elevation: 10,
  },
  pressIn: {
    backgroundColor: '#ff6347',
  },
});

export default Fab;
