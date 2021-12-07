import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Appbar = ({
  title,
  leftIcon,
  backgroundColor,
  onPressIcon,
  rightIcon,
  onPressRightIcon,
  rightIconColor,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Icon name={leftIcon} size={30} color="#000000" onPress={onPressIcon} />
      <Text style={styles.appbartext}>{title}</Text>
      <Icon
        name={rightIcon}
        size={30}
        color={rightIconColor}
        onPress={onPressRightIcon}
        style={styles.right}
      />
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
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  appbartext: {
    fontFamily: 'serif',
    color: '#000000',
    fontSize: 20,
    marginLeft: 25,
  },
  right: {
    position: 'absolute',
    right: 10,
  },
});

export default Appbar;
