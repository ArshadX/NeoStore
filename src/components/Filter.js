import React from 'react';

import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import {Card, Avatar, Title} from 'react-native-paper';

import {AlertBox} from '../components/AlertBox';

import {imageUrl, instance} from '../lib/Instances/Instance';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Rating} from 'react-native-ratings';
import {styles} from '../styles/styles';
export const AllItems = ({image, name, rating, price}) => {
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
            <Text style={styles.textStyle}>Price: {price}</Text>
            <Rating
              count={5}
              defaultRating={rating}
              imageSize={15}
              readonly={true}
              style={itemstyles.ratingStyle}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export const Category = ({item, filterOption}) => {
  const [itemCat, setitemCat] = React.useState([]);
  const [itemColor, setitemColor] = React.useState([]);
  const [sorting, setSorting] = React.useState('price');
  const [orderby, setOrderby] = React.useState('desc');

  const getData = async data => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const response = await instance.post('/filterCommonProducts', data, {
          headers: {
            Authorization: 'Bearer ' + value,
          },
        });
        const filteredItems = response?.data;
        console.log(filteredItems);
        console.log(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const handleSubmit = () => {
    const data = {
      categories: [itemCat],
      colors: [itemColor],
      sort: {
        basedOn: sorting,
        order: orderby,
      },
    };
    getData(data);
  };
  return (
    <View style={itemstyles.container}>
      <Pressable
        onPress={() => handleSubmit()}
        style={itemstyles.content}
        android_ripple={{color: '#dcdcdc', radius: 50}}>
        <Text style={itemstyles.textStyle}>{item}</Text>
      </Pressable>
    </View>
  );
};

const itemstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    borderColor: '#000000',
    borderRadius: 10,
    marginTop: 7,
    marginBottom: 7,
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8,
    paddingTop: 8,
  },
  listStyle: {
    paddingBottom: 7,
    paddingTop: 7,
    marginLeft: 40,
    marginRight: 40,
  },
  flatListTRP: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 2,
    paddingBottom: 2,
  },

  cardDesignTRP: {
    paddingTop: 2,
    borderRadius: 10,
    backgroundColor: '#fefefa',
    width: 388,
    elevation: 5,
  },
  contentTRP: {
    flexDirection: 'row',
  },
  productInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  topRatedProducts: {
    width: 31,
    height: 67,
    marginRight: 30,
    marginLeft: 10,
  },
  ratingStyle: {
    flexDirection: 'row',
    width: 80,
  },
  textStyle: {
    color: '#000000',
  },
});
