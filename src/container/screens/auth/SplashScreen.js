import React from 'react';

import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {taskComplete, loginfromSplash} from '../../../redux/user/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
const SplashScreen = ({navigation, loginfromSplash, userData}) => {
  React.useEffect(() => {
    const getData = async () => {
      try {
        const emailValue = await AsyncStorage.getItem('Email');
        const passwordValue = await AsyncStorage.getItem('Password');
        if (emailValue !== null) {
          loginfromSplash({
            email: emailValue,
            password: passwordValue,
          });
          console.log(emailValue);
        } else {
          navigation.navigate('SignIn');
        }
      } catch (e) {
        // error reading value
        console.log('heelo');
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#214fc6"
        translucent={false}
        barStyle="light-content"
      />
      <Image source={require('../../../assets/logo.png')} />
      {userData.isloading ? (
        <ActivityIndicator size={20} color="#ffffff" animating={true} />
      ) : (
        <ButtonWithIcon
          leftIcon={false}
          size={17}
          color="#000000"
          title="Sign In"
          backgroundColor="#ff2e2e"
          onPress={() => navigation.navigate('SignIn')}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#214fc6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginfromSplash: data => dispatch(loginfromSplash(data)),
    taskComplete: () => dispatch(taskComplete()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
