import React from 'react';

import {View, Text, StyleSheet, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FabRating = ({
  text,
  iconName,
  size,
  color,
  backgroundColor,
  onPress,
  top,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        pressed ? styles.pressIn : {backgroundColor: backgroundColor},
        styles.fabStyle,
        {top: top},
      ]}
      onPress={onPress}>
      <Icon name={iconName} size={size} color={color} />
      <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    flexDirection: 'row',
    right: 20,
    padding: 5,
    borderRadius: 60,
    zIndex: 1,
    alignSelf: 'center',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressIn: {
    backgroundColor: '#ff6347',
  },
  textStyle: {
    color: '#000000',
  },
});

export default FabRating;
