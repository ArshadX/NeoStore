import React from 'react';

import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {imageUrl} from '../lib/Instances/Instance';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from './IconButton';
const CartCard = ({
  image,
  name,
  price,
  seller,
  orderQuantity,
  color,
  stock,
}) => {
  const [OrderQuantity, setOrderQuantity] = React.useState(orderQuantity);
  return (
    <View style={itemstyles.flatList}>
      <Card style={itemstyles.cardDesign}>
        <Card.Content style={itemstyles.content}>
          <Image
            source={{uri: imageUrl + image}}
            style={itemstyles.ProductsImage}
          />
          <View style={itemstyles.productInfo}>
            <Text style={itemstyles.title}>{name}</Text>
            <Text style={itemstyles.textStyle}>
              <Icon name="currency-inr" color="#000000" size={13} />
              {price}
            </Text>
            <Text style={itemstyles.textStyle}>Seller: {seller}</Text>

            <Text style={itemstyles.textStyle}>{color}</Text>
            {stock > 0 ? (
              <Text style={itemstyles.stock}>In stock</Text>
            ) : (
              <Text style={itemstyles.outStock}>Out of stock</Text>
            )}
          </View>
        </Card.Content>
        <View style={itemstyles.action}>
          <View style={itemstyles.countView}>
            <IconButton
              name="minus"
              size={20}
              onPress={() =>
                OrderQuantity > 1
                  ? setOrderQuantity(OrderQuantity - 1)
                  : setOrderQuantity(1)
              }
            />
            <Text style={itemstyles.count}>{OrderQuantity}</Text>
            <IconButton
              name="plus"
              size={20}
              onPress={() => setOrderQuantity(OrderQuantity + 1)}
            />
          </View>
          <Pressable
            android_ripple={{radius: 30, borderless: true}}
            onPress={() => console.log('hello')}>
            <Icon name="delete" color="#000000" size={30} />
          </Pressable>
        </View>
      </Card>
    </View>
  );
};

const itemstyles = StyleSheet.create({
  flatList: {
    marginTop: 2,
    marginBottom: 5,
    paddingBottom: 2,
  },

  cardDesign: {
    paddingTop: 2,
    borderRadius: 10,
    backgroundColor: '#fefefa',
    width: 390,
    elevation: 5,
  },
  ProductsImage: {
    width: 31,
    height: 100,
    marginRight: 30,
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
  },
  productInfo: {
    flexDirection: 'column',
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: -5,
  },
  textStyle: {
    color: '#353839',
  },
  title: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 20,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  pressIn: {
    color: '#6495ed',
  },
  pressOut: {
    color: '#000000',
  },
  icon: {
    color: '#000000',
  },
  countView: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#808080',
    borderRadius: 15,
  },
  count: {
    marginLeft: 15,
    marginRight: 15,
    color: '#353839',
  },
  stock: {
    color: '#32cd32',
  },
  outStock: {
    color: '#fe2712',
  },
});

export default CartCard;
