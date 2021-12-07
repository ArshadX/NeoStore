import React from 'react';

import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonWithIcon = ({
  leftIcon,
  iconName,
  size,
  color,
  title,
  backgroundColor,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        pressed ? styles.pressIn : {backgroundColor: backgroundColor},
        styles.pressableStyle,
      ]}>
      {leftIcon ? <Icon name={iconName} size={size} color={color} /> : null}
      <Text style={{color: color}}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressableStyle: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  pressIn: {
    backgroundColor: '#ff6347',
  },
});

export default ButtonWithIcon;
