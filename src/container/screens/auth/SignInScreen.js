import React from 'react';
import {styles} from '../../../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  HelperText,
  TextInput,
  Button,
  Modal,
  Portal,
  Provider,
  Appbar,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {login, taskComplete} from '../../../redux/user/userActions';

import {e} from '../../../lib/reg exp/email';
import {p} from '../../../lib/reg exp/password';
import {emailValidation} from '../../../lib/validation/validation';
import {passwordValidation} from '../../../lib/validation/validation';

const SignInScreen = ({navigation, login, userData, taskComplete}) => {
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [isValidEmail, setisValidEmail] = React.useState(true);
  const [isValidPassword, setisValidPassword] = React.useState(true);
  const [isBlankemail, setisBlankemail] = React.useState(false);
  const [isBlankpassword, setisBlankpassword] = React.useState(false);
  const [isSecureTextEntry, setisSecureTextEntry] = React.useState(true);

  const redirect = async () => {
    const firstPair = ['Email', email];
    const secondPair = ['Password', password];
    try {
      await AsyncStorage.multiSet([firstPair, secondPair]);
    } catch (e) {
      //save error
      console.log(e);
    }
    getData();
    navigation.navigate('Home');
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Email');
      if (value !== null) {
        console.log(value);
      } else {
        console.log(value);
      }
    } catch (e) {
      // error reading value
      console.log('heelo');
    }
  };

  //validation starts here
  const changeEmail = text => {
    let temp = text.trim();

    setisValidEmail(e.test(temp));
    setemail(temp);
    setisBlankemail(false);
  };

  const changePassword = text => {
    const temp = text.trim();

    setisValidPassword(p.test(temp));
    setpassword(temp);
    setisBlankpassword(false);
  };

  /**
   * Sign In Handliing
   * Posting Data To Api for Authentication
   */
  const signinHandle = e => {
    e.preventDefault();
    if (email == '') {
      setisBlankemail(true);
    }
    if (password == '') {
      setisBlankpassword(true);
    }
    if (email != '' && password != '') {
      const form = new FormData();
      form.append('email', email);
      form.append('password', password);
      login(
        {
          email: email,
          password: password,
        },
        redirect,
      );
      console.log('login');
    }
  };

  //ends here 'validation'
  return (
    <Provider>
      <View style={styles.Container}>
        <StatusBar
          translucent={false}
          barStyle="dark-content"
          backgroundColor="#ffffff"
        />

        <Portal>
          <Modal
            visible={userData?.isloading}
            contentContainerStyle={styles.containerStyle}>
            <ActivityIndicator
              style={{justifyContent: 'space-around', color: '#000000'}}
            />
            <Text style={styles.textStyle}>loading...</Text>
          </Modal>
          <Modal
            visible={userData?.showModal}
            onDismiss={() => taskComplete()}
            contentContainerStyle={styles.containerStyle}>
            <Text style={styles.textStyle}>{userData.error}</Text>
          </Modal>
        </Portal>
        <Appbar.Header style={styles.statusBar}>
          <Appbar.BackAction
            onPress={() => {
              setemail('');
              setpassword('');
              setisValidEmail(true);
              setisValidPassword(true);
              return navigation.goBack();
            }}
          />
          <Appbar.Content title="Go back!" />
        </Appbar.Header>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.sectionSignIn}>
            <TextInput
              mode="outlined"
              label="Email Id"
              value={email}
              error={!isValidEmail}
              placeholder="Email Address..."
              onChangeText={text => changeEmail(text)}
              onBlur={() => emailValidation(setisValidEmail, email)}
              left={<TextInput.Icon name="email" />}
              style={styles.textInputStyle}
            />
            <HelperText type="error" visible={!isValidEmail || isBlankemail}>
              {isBlankemail ? 'Required' : 'Invlalid'}
            </HelperText>
          </View>
          <View style={styles.sectionSignIn}>
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              value={password}
              error={!isValidPassword}
              placeholder="password..."
              onChangeText={text => changePassword(text)}
              onBlur={() => passwordValidation(setisValidPassword, password)}
              secureTextEntry={isSecureTextEntry}
              left={<TextInput.Icon name="lock" />}
              right={
                isSecureTextEntry ? (
                  <TextInput.Icon
                    name="eye-off"
                    onPress={() => {
                      setisSecureTextEntry(false);
                    }}
                  />
                ) : (
                  <TextInput.Icon
                    name="eye"
                    onPress={() => {
                      setisSecureTextEntry(true);
                    }}
                  />
                )
              }
              style={styles.textInputStyle}
            />
            <HelperText
              type="error"
              visible={!isValidPassword || isBlankpassword}>
              {isBlankpassword ? 'Required' : 'Must be alphanumeric'}
            </HelperText>
          </View>
          <View style={styles.section}>
            <Button
              icon="login"
              mode="contained"
              onPress={e => signinHandle(e)}>
              Sign IN
            </Button>
          </View>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('forgotPassword')}>
            Forgot Password?
          </Text>
          <Text style={styles.textStyle}>New user?</Text>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('SignUp')}>
            Create an acoount
          </Text>
        </View>
      </View>
    </Provider>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (data, redirect) => dispatch(login(data, redirect)),
    taskComplete: () => dispatch(taskComplete()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
