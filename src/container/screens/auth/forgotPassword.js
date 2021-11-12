import React from 'react';

import {Text, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';

import {styles} from '../../../styles/styles';
import {e} from '../../../lib/reg exp/email';

const forgotPassword = ({navigation}) => {
  const [email, setemail] = React.useState('');
  const [isValidEmail, setisValidEmail] = React.useState(true);
  const changeEmail = text => {
    let temp = text.trim();

    setisValidEmail(e.test(temp));
    setemail(temp);
  };
  return (
    <View style={styles.Container}>
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
          <Button
            onPress={() => navigation.navigate('resetPassword')}
            mode="contained">
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

export default forgotPassword;
