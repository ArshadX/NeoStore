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
import Appbar from '../../../../components/Appbar';
import Arrow from '../../../../components/Arrow';
import CustomModal from '../../../../components/CustomModal';
import {instance} from '../../../../lib/Instances/Instance';
import {connect} from 'react-redux';
import {AlertProfileUpdate} from '../../../../components/AlertBox';
import CustomFlatlist from '../../../../components/CustomFlatlist';
const MyAddresses = ({navigation, userData}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [AddressList, setAddressList] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await userData.token;
          if (value !== null) {
            setShowModal(true);
            const response = await instance.get('/getCustAddress', {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            setShowModal(false);
            const list = response?.data?.Addresses;
            setAddressList(list);
            console.log(list);
          }
        } catch (e) {
          // error reading value
          console.log(e);
          setShowModal(false);
          AlertProfileUpdate('Request failed!', ' try again');
        }
      };
      getData();
    }, []),
  );
  const renderItem = ({item}) => {
    return (
      <CustomFlatlist
        address={item.address}
        city={item.city}
        pincode={item.pincode}
        state={item.state}
        country={item.country}
        id={item._id}
        navigation={navigation}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomModal
        text="loading..."
        loadingIndicator={true}
        visible={showModal}
      />
      <StatusBar barStyle="light-content" backgroundColor="#214fc6" />
      <Appbar
        title="Back"
        leftIcon="arrow-left"
        backgroundColor="#214fc6"
        onPressIcon={() => navigation.goBack()}
        Contentcolor="#ffffff"
      />
      <View style={styles.contentView}>
        <Text style={styles.title}>Your Addresses</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('addAdress')}>
          <Text style={styles.textStyle}>Add a new address</Text>
          <Arrow arrowType="chevron-right" />
        </Pressable>
      </View>
      <View style={styles.ViewAddress}>
        <Text style={styles.titleMedium}>Personal Addresses</Text>
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

export default connect(mapStateToProps, null)(MyAddresses);
