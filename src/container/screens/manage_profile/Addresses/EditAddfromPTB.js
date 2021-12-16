import React from 'react';

import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import CustomModal from '../../../../components/CustomModal';
import {connect} from 'react-redux';
import ListModal from '../../../../components/ListModal';
import {instance} from '../../../../lib/Instances/Instance';
import Arrow from '../../../../components/Arrow';
import {
  handletextChange,
  handleAddress,
  handlePincode,
} from '../../../../lib/validation/validation';
import Button from '../../../../components/Button';
import {HelperText} from 'react-native-paper';
import Appbar from '../../../../components/Appbar';
import {
  AlertProfileUpdate,
  AlertProfileUpdate2,
} from '../../../../components/AlertBox';

const EditAddress = ({userData, navigation, route}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectCountry, setCountry] = React.useState(
    route?.params?.itemCountry,
  );
  const [Address, setAddress] = React.useState(route?.params?.itemAddress);
  const [Pincode, setPincode] = React.useState(`${route?.params?.itemPincode}`);
  const [City, setCity] = React.useState(route?.params?.itemCity);
  const [State, setState] = React.useState(route?.params?.itemState);
  //Validation
  const [isValidCity, setisValidCity] = React.useState(true);
  const [isValidState, setisValidState] = React.useState(true);
  const [isloading, setisloading] = React.useState(false);
  //isBlank TextInput
  const [isBlankAddress, setBlankAddress] = React.useState(false);
  const [isBlankPincode, setBlankPincode] = React.useState(false);
  const [isBlankCity, setBlankCity] = React.useState(false);
  const [isBlankState, setBlankState] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if ((Address && Pincode && City && State && selectCountry) == '') {
      setBlankAddress(true);
      setBlankPincode(true);
      setBlankCity(true);
      setBlankState(true);
    } else {
      let data = {
        addressId: route?.params?.itemid,
        updatedAddress: {
          address: Address,
          pincode: Pincode,
          city: City,
          state: State,
          country: selectCountry,
        },
      };
      setisloading(true);
      instance
        .post('/updateAddress', data, {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const resData = response?.data;
          console.log(resData);
          setisloading(false);
          AlertProfileUpdate2('Successful', 'Address Updated', () =>
            navigation.goBack(),
          );
        })
        .catch(error => {
          console.log(error?.message);
          setisloading(false);
          AlertProfileUpdate('Request failed', 'try again!');
        });
    }
  };
  return (
    <View style={styles.container}>
      <Appbar
        leftIcon="arrow-left"
        title="Back"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <CustomModal
        animatedType="fade"
        visible={isloading}
        loadingIndicator={true}
        text="loading..."
      />
      <ListModal
        visible={showModal}
        animatedType="fade"
        setShowModal={setShowModal}
        setCountry={setCountry}
      />
      <Text style={styles.title}>Edit your address</Text>
      <Pressable
        onPress={() => setShowModal(true)}
        style={({pressed}) => [
          pressed ? styles.pressIn : styles.pressOut,
          styles.selector,
        ]}>
        <Text style={styles.textStyle}>{selectCountry}</Text>
        <Arrow arrowType="chevron-down" />
      </Pressable>

      <ScrollView>
        <View style={styles.inputView}>
          <KeyboardAvoidingView behavior="height">
            <Text style={styles.title}>Address</Text>
            <TextInput
              onChangeText={text =>
                handleAddress(text, setAddress, setBlankAddress)
              }
              value={Address}
              placeholder="Ex. Street name etc."
              style={styles.textInput}
            />
            <HelperText visible={isBlankAddress} type="error">
              {isBlankAddress ? '*required' : 'Invalid'}
            </HelperText>

            <Text style={styles.title}>Pincode</Text>
            <TextInput
              onChangeText={text =>
                handlePincode(text, setPincode, setBlankPincode)
              }
              value={Pincode}
              keyboardType="phone-pad"
              placeholder="Ex. 12345"
              style={styles.textInput}
            />
            <HelperText visible={isBlankPincode} type="error">
              {isBlankPincode ? '*required' : 'Invalid'}
            </HelperText>

            <Text style={styles.title}>City</Text>

            <TextInput
              onChangeText={text =>
                handletextChange(text, setCity, setisValidCity, setBlankCity)
              }
              value={City}
              placeholder="Ex. Delhi"
              style={styles.textInput}
            />
            <HelperText visible={isBlankCity || !isValidCity} type="error">
              {isBlankCity ? '*required' : 'Invalid'}
            </HelperText>

            <Text style={styles.title}>State</Text>
            <TextInput
              onChangeText={text =>
                handletextChange(text, setState, setisValidState, setBlankState)
              }
              value={State}
              placeholder="Ex. Uttar Pradesh"
              style={styles.textInput}
            />
            <HelperText visible={isBlankState || !isValidState} type="error">
              {isBlankState ? '*required' : 'Invalid'}
            </HelperText>
            <Button onPress={handleSubmit} title="Submit" />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#000000',
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 5,
  },
  selector: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    paddingLeft: 20,
    elevation: 10,
  },
  textStyle: {
    color: '#000000',
    fontFamily: 'serif',
  },
  pressIn: {
    backgroundColor: '#6495ed',
  },
  pressOut: {
    backgroundColor: '#ffffff',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    marginBottom: 2,
    color: '#000000',
  },
  inputView: {
    marginHorizontal: 10,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(EditAddress);
