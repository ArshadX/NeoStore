import React from 'react';

import {Text, View, ActivityIndicator} from 'react-native';
import {
  Button,
  HelperText,
  TextInput,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper';

import {styles} from '../../../styles/styles';
import {e} from '../../../lib/reg exp/email';
import {instance} from '../../../lib/Instances/Instance';

const forgotPassword = ({navigation}) => {
  const [email, setemail] = React.useState('');
  const [isValidEmail, setisValidEmail] = React.useState(true);
  const [Code, setCode] = React.useState('');
  const [Message, setMessage] = React.useState('');
  const [Emailstatus, setEmailstatus] = React.useState('');
  const [isloading, setisloading] = React.useState(false);
  const [visibleError, setVisibleError] = React.useState(false);

  const changeEmail = text => {
    let temp = text.trim();

    setisValidEmail(e.test(temp));
    setemail(temp);
  };
  const getData = async Data => {
    try {
      setisloading(true);
      const response = await instance.post('/forgotPassword', Data);
      const code = response?.data?.code;
      const message = response?.data?.message;
      const emailStatus = response?.data?.emailStatus;
      setCode(code);
      setMessage(message);
      setEmailstatus(emailStatus);
      console.log(code);
      console.log(message);
      setisloading(false);
      navigation.navigate('resetPassword');
    } catch (e) {
      // error reading value
      setisloading(false);
      const failedres = e?.error;
      setMessage('Email does not exist!');
      setVisibleError(true);
    }
  };
  const submitHandle = () => {
    const data = {
      email: email,
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
            <Text style={styles.textStyle}>{Message}</Text>
          </Modal>
        </Portal>
        <View style={styles.header}>
          <Text style={styles.textStyle}>
            Verification code will sent to your email id.
          </Text>
          <Text style={styles.textStyle}>Check your email after submit...</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.textInputViewStyle}>
            <TextInput
              mode="flat"
              label="Email"
              error={!isValidEmail}
              left={<TextInput.Icon name="email" />}
              style={styles.textInputStyle}
              onChangeText={text => changeEmail(text)}
            />
            <HelperText type="error" visible={!isValidEmail}>
              Invalid
            </HelperText>
          </View>
          <View style={styles.textInputViewStyle}>
            <Button onPress={() => submitHandle()} mode="contained">
              Submit
            </Button>
          </View>
        </View>
      </Provider>
    </View>
  );
};

export default forgotPassword;
