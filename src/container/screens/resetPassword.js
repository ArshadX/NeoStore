import React from 'react';

import {styles} from '../../styles/styles';
import {View, Text} from 'react-native';
import {TextInput, HelperText, Button} from 'react-native-paper';
import {
  changePassword,
  changeConfirmPassword,
} from '../../lib/validation/validation';

const resetPassword = () => {
  const [verifyCode, setverifyCode] = React.useState('');
  const [isValidCode, setValidCode] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isValidPassword, setValidPassword] = React.useState(true);
  const [isValidConfirmPassword, setValidConfirmPassword] =
    React.useState(true);
  return (
    <View style={styles.Container}>
      <View style={styles.resetView}>
        <TextInput
          label="Enter varification code"
          mode="flat"
          onPress={() => console.warn('pressed')}
          style={styles.textInputStyle}
        />
        <HelperText type="error" visible={!isValidCode}>
          Incorrect
        </HelperText>
        <TextInput
          label="Enter Password"
          mode="flat"
          error={!isValidPassword}
          onPress={() => console.warn('pressed')}
          style={styles.textInputStyle}
          onChangeText={text =>
            changePassword(text, setPassword, setValidPassword)
          }
        />
        <HelperText type="error" visible={!isValidPassword}>
          alphanumeric and min 8 chars!
        </HelperText>
        <TextInput
          label="Enter confirm password"
          mode="flat"
          error={!isValidConfirmPassword}
          onPress={() => console.warn('pressed')}
          style={styles.textInputStyle}
          onChangeText={text =>
            changeConfirmPassword(text, password, setValidConfirmPassword)
          }
        />
        <HelperText type="error" visible={!isValidConfirmPassword}>
          does not match!
        </HelperText>
        <Button
          mode="contained"
          onPress={() => console.warn('pressed')}
          style={styles.button2}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default resetPassword;
