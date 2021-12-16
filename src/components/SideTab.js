import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SideTab = ({
  backgroundColor,
  isactive,
  text,
  iconName,
  iconColor,
  textColor,
  activeColor,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.textstyle,
        pressed
          ? null
          : isactive
          ? [styles.active, {backgroundColor: '#ffffff'}]
          : {backgroundColor: backgroundColor},
      ]}
      android_ripple={{color: '#d3d3d3', radius: 100}}>
      <Icon name={iconName} color={iconColor} size={20} />
      <Text style={{color: textColor}}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  textstyle: {
    marginVertical: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  active: {
    borderLeftWidth: 5,
    borderColor: '#4169e1',
  },
});
export default SideTab;
