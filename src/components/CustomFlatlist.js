import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomFlatlist = ({
  address,
  city,
  pincode,
  state,
  country,
  id,
  navigation,
}) => {
  return (
    <View style={styles.cardDesign}>
      <View style={styles.content}>
        <Text style={styles.title}>Address</Text>
        <Text>{address}</Text>
        <Text>{city}</Text>
        <Text>{state}</Text>
        <Text>{pincode}</Text>
        <Text>{country}</Text>
      </View>
      <View style={styles.Action}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditAddress', {
              itemid: id,
              itemAddress: address,
              itemPincode: pincode,
              itemCity: city,
              itemState: state,
              itemCountry: country,
            });
          }}>
          <Text>
            <Icon name="pencil" size={15} color="#000000" />
            Edit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardDesign: {
    backgroundColor: '#ffffff',
    elevation: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: Dimensions.get('window').width - 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 2,
    elevation: 4,
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  Action: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 14,
  },
});
export default CustomFlatlist;
