import React from 'react';
import {styles} from '../../styles/styles';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import {HelperText, TextInput, Button} from 'react-native-paper';

import {e} from '../../lib/reg exp/email';
import {p} from '../../lib/reg exp/password';
import {emailValidation} from '../../lib/validation/validation';
import {passwordValidation} from '../../lib/validation/validation';

const SignInScreen = ({navigation}) => {
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [isValidEmail, setisValidEmail] = React.useState(true);
  const [isValidPassword, setisValidPassword] = React.useState(true);
  //validation starts here
  const changeEmail = text => {
    let temp = text.trim();

    setisValidEmail(e.test(temp));
    setemail(temp);
  };

  const changePassword = text => {
    const temp = text.trim();

    setisValidPassword(p.test(temp));
    setpassword(temp);
  };

  //ends here 'validation'

  return (
    <View style={styles.Container}>
      <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} />
      </View>
      <View style={styles.footer}>
        <View style={styles.section}>
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
          <HelperText type="error" visible={!isValidEmail}>
            Invalid
          </HelperText>
        </View>
        <View style={styles.section}>
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            error={!isValidPassword}
            placeholder="password..."
            onChangeText={text => changePassword(text)}
            onBlur={() => passwordValidation(setisValidPassword, password)}
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
            secureTextEntry={false}
            style={styles.textInputStyle}
          />
          <HelperText type="error" visible={!isValidPassword}>
            alphanumeric and min 8 char!
          </HelperText>
        </View>
        <View style={styles.section}>
          <Button
            icon="login"
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={styles.button}>
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
  );
};

export default SignInScreen;
