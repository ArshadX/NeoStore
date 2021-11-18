import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

import {Card, Avatar, Title} from 'react-native-paper';

import {imageUrl} from '../lib/Instances/Instance';

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
            <Text>{price}</Text>
            <Text>{rating}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export const Category = ({item}) => {
  return (
    <View style={itemstyles.container}>
      <View style={itemstyles.content}>
        <Text style={itemstyles.listStyle}>{item}</Text>
      </View>
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
    marginBottom: 5,
    borderWidth: 1,
  },
  listStyle: {
    color: '#000000',
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
});
