import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {imageUrl, instance} from '../lib/Instances/Instance';

const OrderReviewCard = ({
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
    <Pressable
      style={itemstyles.flatList}
      onPress={() => navigation.navigate('productDetails', {id: id})}>
      <Card style={itemstyles.cardDesign}>
        <Card.Content style={itemstyles.content}>
          <View style={itemstyles.ImageView}>
            <Image
              source={{uri: imageUrl + image}}
              style={itemstyles.ProductsImage}
            />
          </View>
          <View style={itemstyles.productInfo}>
            <Text style={itemstyles.title}>{name}</Text>
            <Text style={itemstyles.textStyle}>
              <Icon name="currency-inr" color="#000000" size={13} />
              {price}
            </Text>
            <Text style={itemstyles.textStyle}>Seller: {seller}</Text>

            <Text style={itemstyles.textStyle}>{color}</Text>
            {true ? (
              <Text style={itemstyles.stock}>In stock</Text>
            ) : (
              <Text style={itemstyles.outStock}>Out of stock</Text>
            )}
          </View>
        </Card.Content>
        <View style={itemstyles.action}>
          <View style={itemstyles.countView}>
            <Text style={itemstyles.count}>{OrderQuantity}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const itemstyles = StyleSheet.create({
  flatList: {
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 2,
  },

  cardDesign: {
    paddingTop: 2,
    backgroundColor: '#fefefa',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: Dimensions.get('window').width - 23,
    borderColor: '#4169e1',
  },
  ProductsImage: {
    flex: 1,
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
    marginTop: -10,
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
  ImageView: {
    width: '25%',
    height: '100%',
  },
});
export default OrderReviewCard;
