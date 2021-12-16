import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  FlatList,
} from 'react-native';
import Appbar from '../../../components/Appbar';
import Arrow from '../../../components/Arrow';
import CustomModal from '../../../components/CustomModal';
import {instance} from '../../../lib/Instances/Instance';
import {connect} from 'react-redux';
import {AlertProfileUpdate} from '../../../components/AlertBox';
import CustomFlatlist2 from '../../../components/CustomFlatlist2';
const ProceedToBuy = ({route, navigation, userData}) => {
  const {id} = route.params;
  const [AddressList, setAddressList] = React.useState([]);
  const [isloading, setisloading] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setisloading(true);
          const value = await userData.token;
          if (value !== null) {
            const response = await instance.get('/proceedToBuy', {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            const list = response?.data?.Addresses;
            setAddressList(list);
            console.log(list);
            setisloading(false);
          }
        } catch (e) {
          // error reading value
          console.log(e);
          AlertProfileUpdate('Request failed!', ' try again');
          setisloading(false);
        }
      };
      getData();
    }, []),
  );
  const handleSelect = (e, address, city, pincode, state, country) => {
    e.preventDefault();
    setisloading(true);
    const data = {
      address: {
        address: address,
        pincode: pincode,
        city: city,
        state: state,
        country: country,
      },
    };
    instance
      .post(`/proceedToCheckout/${id}`, data, {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(response => {
        console.log(response?.data?.data);
        setisloading(false);
        navigation.navigate('OrderReview', {
          id: response?.data?.data?._id,
          email: response?.data?.data?.userEmail,
          Name: response?.data?.data?.userName,
        });
      })
      .catch(error => {
        console.log(error?.message);
        setisloading(false);
        AlertProfileUpdate('Request failed', 'try again!');
      });
  };
  const renderItem = ({item}) => {
    return (
      <CustomFlatlist2
        address={item.address}
        city={item.city}
        pincode={item.pincode}
        state={item.state}
        country={item.country}
        id={item._id}
        navigation={navigation}
        handleSelect={handleSelect}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomModal
        text="loading..."
        loadingIndicator={true}
        visible={isloading}
      />
      <StatusBar barStyle="light-content" backgroundColor="#214fc6" />
      <Appbar
        title="Back"
        leftIcon="arrow-left"
        backgroundColor="#214fc6"
        onPressIcon={() => navigation.goBack()}
        Contentcolor="#ffffff"
      />
      <View style={styles.ViewAddress}>
        <Text style={styles.title}>Your Addresses</Text>
        <Text style={styles.titleMedium}>Select Address</Text>
        <FlatList
          data={AddressList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          scrollEnabled={true}
          alwaysBounceVertical={true}
          progressViewOffset={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefa',
  },
  title: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleMedium: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentView: {
    marginHorizontal: 7,
    marginTop: 15,
  },
  button: {
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#a9a9a9',
  },
  textStyle: {
    color: '#000000',
    fontFamily: 'serif',
  },
  ViewAddress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(ProceedToBuy);
