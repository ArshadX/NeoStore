import {useFocusEffect} from '@react-navigation/core';
import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {instance} from '../../lib/Instances/Instance';
import {connect} from 'react-redux';

const MyOrders = ({navigation, userData}) => {
  useFocusEffect(
    React.useCallback(() => {
      instance
        .get('/getOrders', {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const data = response?.data;
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );
  return (
    <View style={styles.Container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Your Orders" subtitle="Edit" />
      </Appbar.Header>
      <View style={styles.header}>
        <Text>Orders Details</Text>
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
