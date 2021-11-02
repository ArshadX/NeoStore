import React from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Button, TextInput, RadioButton, HelperText} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {styles} from '../../styles/styles';
import {changeName, changePhone} from '../../lib/validation/validation';
import {changeEmail} from '../../lib/validation/validation';

const SignUpScreen = ({navigation}) => {
  //state
  const [checked, setChecked] = React.useState('first');
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

  //state end
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
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
                  changeName(text, setfirstName, setValidfirstName)
                }
              />
              <HelperText
                type="error"
                visible={!isValidfirstName}
                style={styles.helperText}>
                Invalid
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
                  changeName(text, setlastName, setValidlastName)
                }
              />
              <HelperText
                type="error"
                visible={!isValidlastName}
                style={styles.helperText}>
                Invalid
              </HelperText>
            </View>

            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Email"
                error={!isValidEmail}
                selectionColor="#e5e4e2"
                placeholder="Email Address..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeEmail(text, setEmail, setValidEmail)
                }
              />
              <HelperText
                type="error"
                visible={!isValidEmail}
                style={styles.helperText}>
                Invalid
              </HelperText>
            </View>

            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Phone number"
                error={false}
                selectionColor="#e5e4e2"
                placeholder="Ex. 12345..."
                dense={true}
                onChangeText={text =>
                  changePhone(text, setPhone, setValidPhone)
                }
                style={styles.textInputStyle}
              />
              <HelperText
                type="error"
                visible={!isValidPhone}
                style={styles.helperText}>
                Invalid
              </HelperText>
            </View>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Password"
                error={false}
                selectionColor="#e5e4e2"
                placeholder="password..."
                dense={true}
                style={styles.textInputStyle}
              />
              <HelperText
                type="error"
                visible={!isValidPassword}
                style={styles.helperText}>
                alphanumeric and min 8 char!
              </HelperText>
            </View>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Confirm Password"
                error={false}
                selectionColor="#e5e4e2"
                placeholder="password..."
                dense={true}
                style={styles.textInputStyle}
              />
              <HelperText
                type="error"
                visible={!isValidPassword}
                style={styles.helperText}>
                alphanumeric and min 8 char!
              </HelperText>
            </View>
            <View style={styles.checkbox}>
              <Text style={styles.checkboxText1}>Select Gender</Text>
              <Text style={styles.checkboxText2}>Male</Text>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <Text style={styles.checkboxText2}>Female</Text>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
            </View>
            <View style={styles.checkbox}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={styles.checkboxText2}>
                I agree the Term and Conditions
              </Text>
            </View>

            <View style={styles.section}>
              <Button
                onPress={() => navigation.navigate('SignIn')}
                mode="contained"
                style={styles.button}>
                SignUp
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default SignUpScreen;
