import React from 'react';

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import {instance} from '../../lib/Instances/Instance';
import {AllItems, Category} from '../../components/Filter';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import Appbar from '../../components/Appbar';

const SearchedProducts = ({route, userData, navigation}) => {
  const {list} = route?.params;

  const [CommonProducts, setcommonProducts] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await userData.token;
          if (value !== null) {
            setcommonProducts(list);

            console.log(list);
          }
        } catch (e) {
          // error reading value
          console.log(e);
        }
      };

      getData(); //.then(() => getUser());
    }, []),
  );
  const renderItem = ({item}) => {
    return (
      <AllItems
        image={item.image}
        name={item.name}
        price={item.price}
        rating={item.rating}
        navigation={navigation}
        id={item.id}
      />
    );
  };
  return (
    <View style={itemstyles.Container}>
      <Appbar
        leftIcon="arrow-left"
        title="Products"
        onPressIcon={() => navigation.goBack()}
        rightIcon="cart"
        rightIconColor="#ffffff"
        onPressRightIcon={() => navigation.navigate('Cart')}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <View style={itemstyles.header}>
        {list.length == 0 ? (
          <View>
            <Image
              source={require('../../assets/bear.gif')}
              style={itemstyles.image}
            />
            <Text style={itemstyles.title2}>Not available</Text>
          </View>
        ) : (
          <FlatList
            data={CommonProducts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
};

const itemstyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
  },
  appbar: {
    backgroundColor: '#fefefa',
  },
  header: {
    flex: 9,
    justifyContent: 'flex-start',
    paddingHorizontal: 1,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fefefa',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  filterbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#5b92e5',
    marginRight: 10,
  },
  containerStyle: {
    alignItems: 'center',
    backgroundColor: '#fefefa',
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 70,
    marginRight: 90,
    marginBottom: 220,
    borderRadius: 15,
  },
  buttonContent: {fontSize: 10, color: '#000000'},
  cross: {
    marginRight: 200,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 3.4,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(SearchedProducts);
