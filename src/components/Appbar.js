import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar} from 'react-native-paper';
const Appbar = ({
  title,
  leftIcon,
  backgroundColor,
  onPressIcon,
  rightIcon,
  onPressRightIcon,
  rightIconColor,
  showSearchbar,
  navigation,
  Contentcolor,
  onPressSearch,
}) => {
  return (
    <View style={[styles.bar, {backgroundColor: backgroundColor}]}>
      <View style={[styles.container]}>
        <Icon
          name={leftIcon}
          size={30}
          color={Contentcolor}
          onPress={onPressIcon}
        />
        <Text style={[styles.appbartext, {color: Contentcolor}]}>{title}</Text>
        <Icon
          name={rightIcon}
          size={30}
          color={rightIconColor}
          onPress={onPressRightIcon}
          style={styles.right}
        />
      </View>
      {showSearchbar ? (
        <Searchbar
          placeholder="Search"
          icon="magnify"
          style={styles.searchbar}
          onFocus={onPressSearch}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  appbartext: {
    fontFamily: 'serif',
    fontSize: 20,
    marginLeft: 25,
  },
  right: {
    position: 'absolute',
    right: 10,
  },
  searchbar: {
    width: Dimensions.get('window').width - 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Appbar;
