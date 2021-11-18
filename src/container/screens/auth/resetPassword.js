import React from 'react';

import {styles} from '../../../styles/styles';
import {View, Text, ActivityIndicator} from 'react-native';
import {instance} from '../../../lib/Instances/Instance';
import {
  TextInput,
  HelperText,
  Button,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';
import {
  changePassword,
  changeConfirmPassword,
} from '../../../lib/validation/validation';

const resetPassword = ({navigation}) => {
  const [verifyCode, setverifyCode] = React.useState('');
  const [isValidCode, setValidCode] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isValidPassword, setValidPassword] = React.useState(true);
  const [ConfirmPassword, setConfirmPassword] = React.useState('');
  const [isValidConfirmPassword, setValidConfirmPassword] =
    React.useState(true);
  const [isloading, setisloading] = React.useState(false);
  const [visibleError, setVisibleError] = React.useState(false);
  const [isSecureTextEntry, setisSecureTextEntry] = React.useState(true);
  const [isSecureTextEntry1, setisSecureTextEntry1] = React.useState(true);
  const [Message, setMessage] = React.useState('');
  const getData = async Data => {
    try {
      setisloading(true);
      const response = await instance.post('/recoverPassword', Data);
      const data = response?.data?.message;

      console.log(data);
      setMessage(data);
      setisloading(false);
      setverifyCode('');
      setPassword('');
      setConfirmPassword('');
      navigation.navigate('SignIn');
    } catch (e) {
      // error reading value
      setisloading(false);
      setMessage('Email does not exist!');
      setVisibleError(true);
    }
  };
  const submitHandle = () => {
    const data = {
      verificationCode: verifyCode,
      password: password,
    };
    getData(data);
  };
  return (
    <View style={styles.Container}>
      <Provider>
        <Portal>
          <Modal
            visible={isloading}
            contentContainerStyle={styles.containerStyle}>
            <ActivityIndicator
              style={{justifyContent: 'space-around', color: '#000000'}}
            />
            <Text style={styles.textStyle}>loading...</Text>
          </Modal>
          <Modal
            visible={visibleError}
            contentContainerStyle={styles.containerStyle}
            onDismiss={() => setVisibleError(false)}>
            <Text style={styles.textStyle}>Invalid Code</Text>
          </Modal>
        </Portal>
        <View style={styles.resetView}>
          <TextInput
            label="Enter varification code"
            mode="flat"
            style={styles.textInputStyle}
            onChangeText={text => setverifyCode(text)}
          />
          <HelperText type="error" visible={!isValidCode}>
            Incorrect
          </HelperText>
          <TextInput
            label="Enter Password"
            mode="flat"
            error={!isValidPassword}
            style={styles.textInputStyle}
            onChangeText={text =>
              changePassword(text, setPassword, setValidPassword)
            }
            secureTextEntry={isSecureTextEntry}
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
          <HelperText type="error" visible={!isValidPassword}>
            alphanumeric and min 8 chars!
          </HelperText>
          <TextInput
            label="Enter confirm password"
            mode="flat"
            error={!isValidConfirmPassword}
            style={styles.textInputStyle}
            secureTextEntry={isSecureTextEntry1}
            onChangeText={text =>
              changeConfirmPassword(
                text,
                password,
                setValidConfirmPassword,
                setConfirmPassword,
              )
            }
            right={
              isSecureTextEntry1 ? (
                <TextInput.Icon
                  name="eye-off"
                  onPress={() => {
                    setisSecureTextEntry1(false);
                  }}
                />
              ) : (
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    setisSecureTextEntry1(true);
                  }}
                />
              )
            }
          />
          <HelperText type="error" visible={!isValidConfirmPassword}>
            does not match!
          </HelperText>
          <Button
            mode="contained"
            onPress={() => submitHandle()}
            style={styles.button2}>
            Submit
          </Button>
        </View>
      </Provider>
    </View>
  );
};

export default resetPassword;
