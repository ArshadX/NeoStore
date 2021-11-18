import React from 'react';

import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {Avatar, Button, Card, Title} from 'react-native-paper';
import {styles} from '../../styles/styles';
import {instance, imageUrl} from '../../lib/Instances/Instance';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Item = ({image}) => {
  return (
    <View style={itemstyles.flatList}>
      <Card style={itemstyles.cardDesign}>
        <Image
          source={{
            uri: imageUrl + image,
          }}
          style={itemstyles.productOfEachCategory}
        />
      </Card>
    </View>
  );
};
const TopRatedItem = ({image, name, rating, price}) => {
  return (
    <View style={itemstyles.flatListTRP}>
      <Card style={itemstyles.cardDesignTRP}>
        <Card.Content style={itemstyles.contentTRP}>
          <Image
            source={{uri: imageUrl + image}}
            style={itemstyles.topRatedProducts}
          />
          <View style={itemstyles.productInfo}>
            <Title>{name}</Title>
            <Text>{price}</Text>
            <Text>{rating}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
const Home = ({navigation, userData}) => {
  const [request, setrequest] = React.useState(false);
  const [token, settoken] = React.useState('');
  const [ProductOfEachCategory, setProductOfEachCategory] = React.useState([]);
  const [TopRatedProducts, setTopRatedProducts] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          if (value !== null) {
            const response = await instance.get('/getDashboard', {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            const productOfEachCategory = response?.data?.productOfEachCategory;
            const topRatedProducts = response?.data?.topRatedProducts;

            setProductOfEachCategory(productOfEachCategory);
            setTopRatedProducts(topRatedProducts);
            //  console.log(productOfEachCategory);
            console.log(topRatedProducts);
          }
        } catch (e) {
          // error reading value
          console.log(e);
        }
      };
      getData();
    }, []),
  );

  const renderItem = ({item}) => {
    return <Item image={item.image} />;
  };
  const renderItemToprated = ({item}) => {
    return (
      <TopRatedItem
        image={item.image}
        name={item.name}
        price={item.price}
        rating={item.rating}
      />
    );
  };

  return (
    <View style={itemstyles.Container}>
      <View style={itemstyles.header}>
        <FlatList
          data={ProductOfEachCategory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          alwaysBounceHorizontal={true}
          bounces={true}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={371}
        />
      </View>
      <View style={itemstyles.footer}>
        <Text style={styles.textStyle}>Top Product for you</Text>
        <FlatList
          data={TopRatedProducts}
          renderItem={renderItemToprated}
          keyExtractor={item => item.id}
          horizontal={false}
        />
      </View>
    </View>
  );
};
const itemstyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 2,
  },
  footer: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  flatList: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  flatListTRP: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  cardDesign: {
    flex: 1,
    borderRadius: 7,
    alignContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fefefa',
    marginRight: 2,
    elevation: 5,
    width: 370,
    height: 200,
  },
  cardDesignTRP: {
    paddingTop: 2,
    borderRadius: 10,
    backgroundColor: '#fefefa',
    width: 372,
    elevation: 5,
  },
  productOfEachCategory: {
    alignContent: 'center',
    width: 71,
    height: 152,
    marginTop: 20,
    marginBottom: 20,
  },
  topRatedProducts: {
    width: 31,
    height: 67,
    marginRight: 30,
    marginLeft: 10,
  },
  contentTRP: {
    flexDirection: 'row',
  },
  productInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  cardAction: {
    flexDirection: 'row-reverse',
    paddingBottom: 10,
    marginBottom: 5,
    marginLeft: 5,
    paddingRight: 3,
  },
  textSign: {
    fontSize: 18,
    fontWeight: '100',
    color: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  TextInputStyleClass: {
    textAlign: 'left',
    height: 150,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#9E9E9E',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    width: 350,
    color: '#000000',
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomColor: '#fdfff5',
    paddingBottom: 10,
  },
  button: {
    alignItems: 'stretch',
    marginTop: 20,
    backgroundColor: '#5b92e5',
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 7,
    paddingTop: 7,
    elevation: 5,
    borderRadius: 7,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, null)(Home);
