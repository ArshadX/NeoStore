import React from 'react';

import {Text, View, FlatList, StyleSheet, Image} from 'react-native';

import {instance} from '../../lib/Instances/Instance';
import {AllItems, Category} from '../../components/Filter';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import Appbar from '../../components/Appbar';
import CustomModal from '../../components/CustomModal';
const AllProduct = ({userData, navigation}) => {
  const [AllCategories, setallCategories] = React.useState([]);
  const [CommonProducts, setcommonProducts] = React.useState([]);
  const [AllColors, setallColors] = React.useState([]);
  const [isloading, setisloading] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setisloading(true);
      const getData = async () => {
        try {
          const value = await userData.token;
          if (value !== null) {
            const response = await instance.get('/commonProducts', {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            const allCategories = response?.data?.allCategories;
            const commonProducts = response?.data?.commonProducts;
            const colors = response?.data?.allColors;
            //terminal output
            setallCategories(allCategories);
            setcommonProducts(commonProducts);
            setallColors(colors);
            setisloading(false);
            console.log(commonProducts);
          }
        } catch (e) {
          // error reading value
          console.log(e);
          setisloading(false);
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
  const renderCategory = ({item, index}) => {
    return <Category item={item} index={index} filterOption={filterOpt} />;
  };
  return (
    <View style={itemstyles.Container}>
      <Appbar
        leftIcon="arrow-left"
        title="Products"
        onPressIcon={() => navigation.goBack()}
        rightIcon="filter"
        rightIconColor="#ffffff"
        onPressRightIcon={() =>
          navigation.navigate('filter', {
            Categories: AllCategories,
            Colors: AllColors,
          })
        }
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <CustomModal
        loadingIndicator={true}
        text="loading..."
        visible={isloading}
        animatedType="fade"
      />
      {/** Filter option end */}
      <View style={itemstyles.header}>
        <FlatList
          data={CommonProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {/**filter bar  */}
    </View>
  );
};

const itemstyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
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
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(AllProduct);
