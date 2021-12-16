import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TextInput, HelperText, RadioButton, Title} from 'react-native-paper';
import Button from '../../../components/Button';
import {AlertProfileUpdate} from '../../../components/AlertBox';
import {instance, profile_image} from '../../../lib/Instances/Instance';
import {styles} from '../../../styles/styles';
import {changeName, changePhone} from '../../../lib/validation/validation';
import CustomModal from '../../../components/CustomModal';
import Appbar from '../../../components/Appbar';
const updateProfile = ({route, userData, navigation}) => {
  const {firstname, lastname, Phone, Gender} = route?.params;
  const [fname, setfname] = React.useState(firstname);
  const [lname, setlname] = React.useState(lastname);
  const [gender, setgender] = React.useState(Gender);
  const [phone, setPhone] = React.useState(`${Phone}`);
  const [disable, setDisable] = React.useState(true);
  //Validation State
  const [requesting, setRequesting] = React.useState(false);
  const [isValidfname, setisValidfname] = React.useState(true);
  const [isValidlname, setisValidlname] = React.useState(true);
  const [isValidphone, setisValidphone] = React.useState(true);
  //Blank check
  const [isBlankfname, setisBlankfname] = React.useState(false);
  const [isBlanklname, setisBlanklname] = React.useState(false);
  const [isBlankphone, setisBlankphone] = React.useState(false);
  //end Validation State
  const updateprofile = data => {
    setRequesting(true);
    instance
      .post('/updateprofile', data, {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(response => {
        const data = response?.data;
        AlertProfileUpdate('Updated Succesfully!');
        setRequesting(false);
      })
      .catch(error => {
        console.log(error.message);
        setRequesting(false);
        if (error.message === 'Request failed with status code 503') {
          AlertProfileUpdate('Service Unavailable!');
        } else if (error.message === 'Request failed with status code 403') {
          AlertProfileUpdate('Try again!');
        }
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (fname == '') {
      setisBlankfname(true);
    }
    if (lname == '') {
      setisBlanklname(true);
    }
    if (phone == '') {
      setisBlankphone(true);
    }
    if (fname != '' && lname != '' && phone != '') {
      updateprofile({
        profileDetails: {
          firstName: fname,
          secondName: lname,
          gender: gender,
          mobile: phone,
        },
      });
    }
  };
  return (
    <View style={Profilestyles.Container}>
      <CustomModal
        loadingIndicator={true}
        text="loading..."
        visible={requesting}
        animatedType="fade"
      />
      <Appbar
        leftIcon="arrow-left"
        title="back"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <View style={Profilestyles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={Profilestyles.headerImage}
        />
        <Text style={Profilestyles.headertext}>Edit Profile</Text>
      </View>
      <View style={Profilestyles.footer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={50}>
          <View style={Profilestyles.ContentStyle}>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="First Name"
                value={fname}
                error={!isValidfname}
                selectionColor="#e5e4e2"
                placeholder="Ex. John..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeName(text, setfname, setisValidfname, setisBlankfname)
                }
                onFocus={() => setDisable(false)}
              />
              <HelperText
                type="error"
                visible={!isValidfname || isBlankfname}
                style={styles.helperText}>
                {isBlankfname ? 'Required' : 'Invalid'}
              </HelperText>
            </View>

            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Last Name"
                value={lname}
                error={!isValidlname}
                selectionColor="#e5e4e2"
                placeholder="Ex. Wright..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changeName(text, setlname, setisValidlname, setisBlanklname)
                }
                onFocus={() => setDisable(false)}
              />
              <HelperText
                type="error"
                visible={!isValidlname || isBlanklname}
                style={styles.helperText}>
                {isBlanklname ? 'Required' : 'Invalid'}
              </HelperText>
            </View>
            <View style={styles.textInputViewStyle}>
              <TextInput
                mode="flat"
                label="Phone"
                value={phone}
                error={!isValidphone}
                keyboardType="phone-pad"
                selectionColor="#e5e4e2"
                placeholder="Ex. Wright..."
                dense={true}
                style={styles.textInputStyle}
                onChangeText={text =>
                  changePhone(text, setPhone, setisValidphone, setisBlankphone)
                }
                onFocus={() => setDisable(false)}
              />
              <HelperText
                type="error"
                visible={!isValidphone || isBlankphone}
                style={styles.helperText}>
                {isBlankphone ? 'Required' : 'Invalid'}
              </HelperText>
            </View>
            <View style={[styles.checkbox, Profilestyles.checkboxlayout]}>
              <Text style={styles.checkboxText1}>Select Gender</Text>
              <Text style={styles.checkboxText2}>Male</Text>
              <RadioButton
                value="male"
                status={gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setgender('male');
                  setDisable(false);
                }}
              />
              <Text style={styles.checkboxText2}>Female</Text>
              <RadioButton
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setgender('female');
                  setDisable(false);
                }}
              />
            </View>
            <Button
              title="UPDATE"
              onPress={e => handleSubmit(e)}
              disabled={disable}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const Profilestyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fefefa',
  },
  appbar: {
    backgroundColor: '#d3d3d3',
  },
  ContentStyle: {
    marginHorizontal: 15,
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 2,
  },
  image: {
    backgroundColor: '#d3d3d3',
  },
  userDetail: {
    color: '#000000',
  },
  list: {
    color: '#000000',
    marginTop: 4,
    marginLeft: 10,
  },
  listitem: {
    flexDirection: 'row',
    //  backgroundColor: '#d3d3d3',
    marginLeft: 5,
    marginBottom: 6,
    padding: 10,
    borderRadius: 10,
  },
  pressIn: {backgroundColor: '#6495ed'},
  pressOut: {backgroundColor: '#d3d3d3'},
  headerImage: {
    width: 100,
    height: 100,
  },
  headertext: {
    fontFamily: 'serif',
    fontSize: 30,
    color: '#000000',
  },
  checkboxlayout: {
    marginBottom: 20,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(updateProfile);
