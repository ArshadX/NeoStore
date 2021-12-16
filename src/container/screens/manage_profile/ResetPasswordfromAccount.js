import React from 'react';

import {Text, View, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  changePassword,
  changePasswordnew,
  changeConfirmPassword,
} from '../../../lib/validation/validation';
import {HelperText} from 'react-native-paper';
import Button from '../../../components/Button';
import {instance} from '../../../lib/Instances/Instance';
import CustomModal from '../../../components/CustomModal';
import {connect} from 'react-redux';
import {AlertProfileUpdate} from '../../../components/AlertBox';
import Appbar from '../../../components/Appbar';
const ResetPasswordfromAccount = ({userData, navigation}) => {
  const [currentPassword, setPassword] = React.useState('');
  const [newPassword, setnewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  /** Validation */
  const [isValidPassword, setValidPassword] = React.useState(true);
  const [isValidNewPassword, setValidNewPassword] = React.useState(true);
  const [isValidConfirmPassword, setValidConfirmPassword] =
    React.useState(true);

  /**Checking Blank */
  const [isBlankPassword, setisBlankPassword] = React.useState(false);
  const [isBlankNewPassword, setisBlankNewPassword] = React.useState(false);
  const [isBlankConfirmPassword, setisBlankConfirmPassword] =
    React.useState(false);
  //Secure Text Entry

  const [hidePassword, setHidePassword] = React.useState(true);
  const [hideNewPassword, setHideNewPassword] = React.useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = React.useState(true);
  //isLoading
  const [isloading, setisloading] = React.useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    if ((currentPassword && newPassword && confirmPassword) == '') {
      setisBlankPassword(true);
      setisBlankNewPassword(true);
      setisBlankConfirmPassword(true);
    } else {
      setisloading(true);
      let data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      instance
        .post('/changePassword', data, {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const res = response?.data;
          console.log(res);
          setisloading(false);
          AlertProfileUpdate('Successful!', 'your password is reset');
        })
        .catch(error => {
          console.log(error?.message);
          setisloading(false);
          AlertProfileUpdate('Request failed!', 'try again!');
        });
    }
  };
  return (
    <View style={styles.container}>
      <CustomModal
        loadingIndicator={true}
        visible={isloading}
        animatedType="fade"
        text="loading..."
      />
      <Appbar
        leftIcon="arrow-left"
        title="back"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Current Password</Text>
        {/**Current Password*/}
        <View style={styles.textInputView}>
          <Icon name="lock" color="#000000" size={16} />
          <TextInput
            placeholder="Ex. John@123"
            onChangeText={text =>
              changePassword(
                text,
                setPassword,
                setValidPassword,
                setisBlankPassword,
              )
            }
            style={styles.textInput}
            secureTextEntry={hidePassword}
          />
          {hidePassword ? (
            <Icon
              name="eye-off-outline"
              color="#000000"
              size={25}
              onPress={() => setHidePassword(false)}
            />
          ) : (
            <Icon
              name="eye-outline"
              color="#000000"
              size={25}
              onPress={() => setHidePassword(true)}
            />
          )}
        </View>
        <HelperText type="error" visible={!isValidPassword || isBlankPassword}>
          {isBlankPassword ? 'Required' : 'alphanumeric and min 8 char!'}
        </HelperText>

        {/**New Password */}
        <Text style={styles.footerTitle}>New Password</Text>
        <View style={styles.textInputView}>
          <Icon name="lock" color="#000000" size={16} />
          <TextInput
            value={newPassword}
            placeholder="Ex. John@123"
            onChangeText={text =>
              changePasswordnew(
                text,
                setnewPassword,
                setValidNewPassword,
                setisBlankNewPassword,
                confirmPassword,
                setValidConfirmPassword,
              )
            }
            style={styles.textInput}
            secureTextEntry={hideNewPassword}
          />
          {hideNewPassword ? (
            <Icon
              name="eye-off-outline"
              color="#000000"
              size={25}
              onPress={() => setHideNewPassword(false)}
            />
          ) : (
            <Icon
              name="eye-outline"
              color="#000000"
              size={25}
              onPress={() => setHideNewPassword(true)}
            />
          )}
        </View>
        <HelperText
          type="error"
          visible={!isValidNewPassword || isBlankNewPassword}>
          {isBlankNewPassword ? 'Required' : 'alphanumeric and min 8 char!'}
        </HelperText>

        {/**Confirm Password */}

        <Text style={styles.footerTitle}>Confirm Password</Text>
        <View style={styles.textInputView}>
          <Icon name="lock" color="#000000" size={16} />
          <TextInput
            placeholder="Ex. John@123"
            onChangeText={text =>
              changeConfirmPassword(
                text,
                newPassword,
                setValidConfirmPassword,
                setConfirmPassword,
                setisBlankConfirmPassword,
              )
            }
            style={styles.textInput}
            secureTextEntry={hideConfirmPassword}
          />
          {hideConfirmPassword ? (
            <Icon
              name="eye-off-outline"
              color="#000000"
              size={25}
              onPress={() => setHideConfirmPassword(false)}
            />
          ) : (
            <Icon
              name="eye-outline"
              color="#000000"
              size={25}
              onPress={() => setHideConfirmPassword(true)}
            />
          )}
        </View>
        <HelperText
          type="error"
          visible={!isValidConfirmPassword || isBlankConfirmPassword}>
          {isBlankConfirmPassword ? 'Required' : 'Does not match!'}
        </HelperText>

        <Button title="Reset" onPress={e => handleSubmit(e)} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 4,
    marginHorizontal: 10,
  },
  headerTitle: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 30,
  },
  footerTitle: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 15,
  },
  textInput: {
    width: Dimensions.get('window').width - 60,
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'flex-start',
    width: Dimensions.get('window').width - 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(ResetPasswordfromAccount);
