import React from 'react';

import {View, Text, Modal, StyleSheet, FlatList} from 'react-native';
import {CountryList} from '../lib/Json/countries';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Countries from './Countries';
const ListModal = ({visible, animatedType, setShowModal, setCountry}) => {
  const renderItem = ({item}) => {
    return (
      <Countries
        name={item.name}
        setCountry={setCountry}
        setShowModal={setShowModal}
      />
    );
  };
  return (
    <Modal animationType={animatedType} visible={visible} transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Icon
              name="close-circle"
              size={25}
              color="#000000"
              style={styles.icon}
              onPress={() => setShowModal(false)}
            />
          </View>
          <FlatList
            data={CountryList}
            renderItem={renderItem}
            keyExtractor={item => item.code}
            scrollEnabled={true}
            alwaysBounceVertical={true}
            progressViewOffset={10}
            initialNumToRender={10}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6495ed',
    width: 250,
    height: 70,
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  icon: {
    position: 'relative',
    left: 100,
    marginBottom: 25,
  },
  title: {
    color: '#000000',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(191, 191, 191, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 250,
    height: 500,
    borderRadius: 30,
    elevation: 10,
    paddingBottom: 10,
  },
});
export default ListModal;
