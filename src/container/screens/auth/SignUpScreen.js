import React from 'react';

import {
  ScrollView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {Button, TextInput, RadioButton, HelperText} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {styles} from '../../../styles/styles';
import {connect} from 'react-redux';
import {registerUser, taskComplete} from '../../../redux/user/userActions';
import {
  changeName,
  changePhone,
  changePassword,
  changeConfirmPassword,
} from '../../../lib/validation/validation';
import {changeEmail} from '../../../lib/validation/validation';
import Appbar from '../../../components/Appbar';
import {AlertProfileUpdate3} from '../../../components/AlertBox';
import CustomModal from '../../../components/CustomModal';
const SignUpScreen = ({navigation, registerUser, userData, taskComplete}) => {
  //state
  const [checked, setChecked] = React.useState('male');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [firstName, setfirstName] = React.useState('');
  const [isValidfirstName, setValidfirstName] = React.useState(true);
  const [lastName, setlastName] = React.useState('');
  const [isValidlastName, setValidlastName] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [isValidEmail, setValidEmail] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isValidPassword, setValidPassword] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  const [isValidPhone, setValidPhone] = React.useState(true);
  const [confirmPassword, setconfirmPassword] = React.useState('');
  const [isValidConfirmPassword, setValidConfirmPassword] =
    React.useState(true);
  //SignUp handling
  const [isBlankfname, setisBlankfname] = React.useState(false);
  const [isBlanklname, setisBlanklname] = React.useState(false);
  const [isBlankphone, setisBlankphone] = React.useState(false);
  const [isBlankemail, setisBlankemail] = React.useState(false);
  const [isBlankpassword, setisBlankpassword] = React.useState(false);
  const [isBlankConfPassword, setisBlankConfPassword] = React.useState(false);
  const [isNotmarkedtc, setisNotmarkedtc] = React.useState(false);
  const [isSecureTextEntry, setisSecureTextEntry] = React.useState(true);
  const [isSecureTextEntry2, setisSecureTextEntry2] = React.useState(true);

  //state end
  const redirect = () => {
    setfirstName('');
    setlastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setconfirmPassword('');
    setToggleCheckBox(false);
    taskComplete();
    return navigation.goBack();
  };
  const Signuphandle = e => {
    e.preventDefault();
    if (firstName == '') {
      setisBlankfname(true);
    }
    if (lastName == '') {
      setisBlanklname(true);
    }
    if (email == '') {
      setisBlankemail(true);
    }
    if (phone == '') {
      setisBlankphone(true);
    }
    if (password == '') {
      setisBlankpassword(true);
    }
    if (confirmPassword == '') {
      setisBlankConfPassword(true);
    }
    if (toggleCheckBox == false) {
      setisNotmarkedtc(true);
    }
    if (
      firstName != '' &&
      lastName != '' &&
      email != '' &&
      phone != '' &&
      password != '' &&
      confirmPassword != '' &&
      toggleCheckBox == true
    ) {
      const form = new FormData();
      form.append('firstName', firstName);
      form.append('secondName', lastName);
      form.append('contactNo', phone);
      form.append('email', email);
      form.append('password', password);
      form.append('gender', checked);

      registerUser(form);
    }
  };
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="#214fc6" barStyle="light-content" />
      <CustomModal
        loadingIndicator={true}
        text="loading..."
        animatedType="fade"
        visible={userData?.isloading}
      />
      <Appbar
        title="Create Account"
        leftIcon="arrow-left"
        onPressIcon={async () => await redirect()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <CustomModal
        loadingIndicator={false}
        visible={userData?.isSignup}
        text="User Registered Successfully"
        onShow={() =>
          setTimeout(async () => {
            await taskComplete();
            navigation.goBack();
          }, 1000)
        }
      />
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.footer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={50}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="First Name"
                value={firstName}
                error={!isValidfirstName}
                selectionColor="#e5e4e2"
                placeholder="Ex. John..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeName(
                    text,
                    setfirstName,
                    setValidfirstName,
                    setisBlankfname,
                  )
                }
              />
              <HelperText
                type="error"
                visible={!isValidfirstName || isBlankfname}
                style={styles.helperText}>
                {isBlankfname ? 'Required' : 'Invalid'}
              </HelperText>
            </View>

            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Last Name"
                value={lastName}
                error={!isValidlastName}
                selectionColor="#e5e4e2"
                placeholder="Ex. Wright..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeName(
                    text,
                    setlastName,
                    setValidlastName,
                    setisBlanklname,
                  )
                }
              />
              <HelperText
                type="error"
                visible={!isValidlastName || isBlanklname}
                style={styles.helperText}>
                {isBlanklname ? 'Required' : 'Invalid'}
              </HelperText>
            </View>

            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Email"
                value={email}
                error={!isValidEmail}
                selectionColor="#e5e4e2"
                placeholder="Email Address..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeEmail(text, setEmail, setValidEmail, setisBlankemail)
                }
              />
              <HelperText
                type="error"
                visible={!isValidEmail || isBlankemail}
                style={styles.helperText}>
                {isBlankemail ? 'Required' : 'Invalid'}
              </HelperText>
            </View>

            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Phone number"
                value={phone}
                error={!isValidPhone}
                selectionColor="#e5e4e2"
                placeholder="Ex. 12345..."
                dense={true}
                onChangeText={text =>
                  changePhone(text, setPhone, setValidPhone, setisBlankphone)
                }
                style={styles.textInputStyle}
              />
              <HelperText
                type="error"
                visible={!isValidPhone || isBlankphone}
                style={styles.helperText}>
                {isBlankphone ? 'Required' : 'Invalid'}
              </HelperText>
            </View>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Password"
                value={password}
                error={!isValidPassword}
                selectionColor="#e5e4e2"
                placeholder="password..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changePassword(
                    text,
                    setPassword,
                    setValidPassword,
                    setisBlankpassword,
                  )
                }
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
              />
              <HelperText
                type="error"
                visible={!isValidPassword || isBlankpassword}
                style={styles.helperText}>
                {isBlankpassword ? 'Required' : 'alphanumeric and min 8 char!'}
              </HelperText>
            </View>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Confirm Password"
                value={confirmPassword}
                error={!isValidConfirmPassword}
                selectionColor="#e5e4e2"
                placeholder="password..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeConfirmPassword(
                    text,
                    password,
                    setValidConfirmPassword,
                    setconfirmPassword,
                    setisBlankConfPassword,
                  )
                }
                secureTextEntry={isSecureTextEntry2}
                left={<TextInput.Icon name="lock" />}
                right={
                  isSecureTextEntry2 ? (
                    <TextInput.Icon
                      name="eye-off"
                      onPress={() => {
                        setisSecureTextEntry2(false);
                      }}
                    />
                  ) : (
                    <TextInput.Icon
                      name="eye"
                      onPress={() => {
                        setisSecureTextEntry2(true);
                      }}
                    />
                  )
                }
              />
              <HelperText
                type="error"
                visible={!isValidConfirmPassword || isBlankConfPassword}
                style={styles.helperText}>
                {isBlankConfPassword ? 'Required' : 'does not match!'}
              </HelperText>
            </View>
            <View style={styles.checkbox}>
              <Text style={styles.checkboxText1}>Select Gender</Text>
              <Text style={styles.checkboxText2}>Male</Text>
              <RadioButton
                value="male"
                status={checked === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('male')}
              />
              <Text style={styles.checkboxText2}>Female</Text>
              <RadioButton
                value="female"
                status={checked === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('female')}
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onChange={() =>
                  AlertProfileUpdate3(
                    'Terms and Conditions',
                    () => setToggleCheckBox(true),
                    () => setToggleCheckBox(false),
                  )
                }
              />

              <HelperText
                type={isNotmarkedtc ? 'error' : 'info'}
                visible={true}
                style={styles.checkboxText3}>
                I agree the Term and Conditions
              </HelperText>
            </View>

            <View style={styles.section}>
              <Button
                onPress={e => Signuphandle(e)}
                mode="contained"
                style={styles.button}>
                SignUp
              </Button>
              <Text style={styles.textStyle}>Already have an acoount?</Text>
              <Text style={styles.linkText} onPress={() => redirect()}>
                Log In
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerUser: data => dispatch(registerUser(data)),
    taskComplete: () => dispatch(taskComplete()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
