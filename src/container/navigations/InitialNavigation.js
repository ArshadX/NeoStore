import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './RootStackScreen';

import DrawerNavigator from './DrawerNavigator';
import {connect} from 'react-redux';

const InitialNavigation = ({userData}) => {
  return (
    <NavigationContainer>
      {userData.islogging ? <DrawerNavigator /> : <RootStackScreen />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, null)(InitialNavigation);
