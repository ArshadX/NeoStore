import React from 'react';

import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {HelperText} from 'react-native-paper';
import Button from '../../../../components/Button';
import Appbar from '../../../../components/Appbar';
import {
  handletextChange,
  handleAddress,
  handlePincode,
} from '../../../../lib/validation/validation';
import {instance} from '../../../../lib/Instances/Instance';
import {connect} from 'react-redux';
import CustomModal from '../../../../components/CustomModal';

import {
  AlertProfileUpdate,
  AlertProfileUpdate2,
} from '../../../../components/AlertBox';
const AddAddressesPTB = ({userData, navigation}) => {
  const [isBlankAddress, setBlankAddress] = React.useState(false);
  const [isBlankPincode, setBlankPincode] = React.useState(false);
  const [isBlankCity, setBlankCity] = React.useState(false);
  const [isBlankState, setBlankState] = React.useState(false);
  const [isBlankCountry, setBlankCountry] = React.useState(false);
  //SetValues

  const [Address, setAddress] = React.useState('');
  const [Pincode, setPincode] = React.useState('');
  const [City, setCity] = React.useState('');
  const [State, setState] = React.useState('');
  const [Country, setCountry] = React.useState('');
  //Validation
  const [isValidCity, setisValidCity] = React.useState(true);
  const [isValidState, setisValidState] = React.useState(true);
  const [isValidCountry, setisValidCountry] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  React.useEffect(() => {
    setAddress('');
    setPincode('');
    setCity('');
    setState('');
    setCountry('');
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if ((Address && Pincode && City && State && Country) == '') {
      setBlankAddress(true);
      setBlankPincode(true);
      setBlankCity(true);
      setBlankState(true);
      setBlankCountry(true);
    } else {
      let data = {
        address: {
          address: Address,
          pincode: Pincode,
          city: City,
          state: State,
          country: Country,
        },
      };
      setShowModal(true);
      instance
        .post('/addCustAddress', data, {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const resData = response?.data;
          setShowModal(false);
          console.log(resData);
          AlertProfileUpdate2('Successful', 'Address added', () =>
            navigation.goBack(),
          );
        })
        .catch(error => {
          console.log(error?.message);
          setShowModal(false);
          AlertProfileUpdate('Request failed', 'try again!');
        });
    }
  };
  return (
    <View style={styles.container}>
      <Appbar
        leftIcon="arrow-left"
        title="Add Address"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <CustomModal
        visible={showModal}
        text="loading..."
        animatedType="fade"
        loadingIndicator={true}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Address</Text>
      </View>
      <ScrollView>
        <View style={styles.footer}>
          <Text style={styles.title}>Address</Text>
          <TextInput
            onChangeText={text =>
              handleAddress(text, setAddress, setBlankAddress)
            }
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
            placeholder="Ex. Uttar Pradesh"
            style={styles.textInput}
          />
          <HelperText visible={isBlankState || !isValidState} type="error">
            {isBlankState ? '*required' : 'Invalid'}
          </HelperText>

          <Text style={styles.title}>Country</Text>
          <TextInput
            onChangeText={text =>
              handletextChange(
                text,
                setCountry,
                setisValidCountry,
                setBlankCountry,
              )
            }
            placeholder="Ex. India"
            style={styles.textInput}
          />
          <HelperText type="error" visible={isBlankCountry || !isValidCountry}>
            {isBlankCountry ? '*required' : 'Invalid'}
          </HelperText>
        </View>
        <View style={styles.buttonView}>
          <Button title="Submit" onPress={e => handleSubmit(e)} />
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
  header: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 3,
    marginTop: 15,
    marginHorizontal: 10,
  },
  buttonView: {
    marginTop: 40,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#0000cd',
    marginBottom: 2,
    color: '#000000',
  },
  headerTitle: {
    fontFamily: 'serif',
    fontSize: 30,
    color: '#000000',
  },
  title: {
    color: '#0000cd',
  },
  keyAvoidView: {
    position: 'relative',
    marginBottom: 5,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(AddAddressesPTB);
