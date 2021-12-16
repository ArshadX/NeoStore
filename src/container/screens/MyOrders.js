import {useFocusEffect} from '@react-navigation/core';
import React from 'react';

import {Text, View, StyleSheet, FlatList} from 'react-native';
import Appbar from '../../components/Appbar';
import {instance} from '../../lib/Instances/Instance';
import {connect} from 'react-redux';
import OrderReview from '../../components/OrderReview';
import CustomModal from '../../components/CustomModal';
import {AlertProfileUpdate} from '../../components/AlertBox';
const MyOrders = ({navigation, userData}) => {
  const [productlist, setProductlist] = React.useState([]);
  const [isloading, setisloading] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setisloading(true);
      instance
        .get('/getOrders', {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const data = response?.data?.ordersDetails;
          console.log(response?.data?.ordersDetails);
          setProductlist(data);
          setisloading(false);
        })
        .catch(e => {
          console.log(e);
          setisloading(false);
          AlertProfileUpdate('Request failed!', 'revisit again');
        });
    }, []),
  );
  const renderItem = ({item}) => {
    return (
      <OrderReview
        orderPlacedOn={item.orderPlacedOn}
        invoice={item.invoice}
        productsInOrder={item.productsInOrder}
        totalPrice={item.totalPrice}
      />
    );
  };
  return (
    <View style={styles.Container}>
      <Appbar
        leftIcon="arrow-left"
        title="My Orders"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <CustomModal
        text="loading..."
        visible={isloading}
        animatedType="fade"
        loadingIndicator={true}
      />
      <View style={styles.header}>
        <FlatList data={productlist} renderItem={renderItem} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fefefa',
  },
  appbar: {
    backgroundColor: '#d3d3d3',
  },
  header: {
    flex: 8,
    flexDirection: 'row',
  },
  userInfo: {
    marginTop: 50,
    marginLeft: 20,
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
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(MyOrders);
