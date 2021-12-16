import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderReviewCard from './OrderReviewCard';
import Arrow from './Arrow';
const CustomFlatlist2 = ({
  invoice,
  orderPlacedOn,
  productsInOrder,
  totalPrice,
}) => {
  const [showItem, setShowItem] = React.useState(false);
  const heightAnim = React.useRef(new Animated.Value(1)).current;

  const animate = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(heightAnim, {
      toValue: 200 * productsInOrder.length,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const animateOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const renderItem = ({item}) => {
    return (
      <OrderReviewCard
        name={item.product}
        color={item.color}
        image={item.image}
        price={item.price}
        seller={item.seller}
        orderQuantity={item.quantity}
      />
    );
  };
  return (
    <View style={styles.cardDesign}>
      <View style={styles.content}>
        <Text style={styles.title}>Order details</Text>
        <Text style={styles.textStyle}>Order Placed on - </Text>
        <Text style={styles.textStyle}>{orderPlacedOn}</Text>
        <Text style={styles.title}>Total Price</Text>
        <Text style={styles.textStyle2}>
          <Icon name="currency-inr" color="#ff0000" size={11} />
          {totalPrice}
        </Text>
      </View>
      <Pressable
        onPress={e => {
          setShowItem(!showItem);
          if (showItem == false) {
            animate();
          } else {
            animateOut();
          }
        }}
        style={styles.button}>
        <Text style={styles.title}>Items details</Text>
        {showItem ? (
          <Arrow arrowType="chevron-down" />
        ) : (
          <Arrow arrowType="chevron-right" />
        )}
      </Pressable>
      <Animated.View style={{height: heightAnim}}>
        {showItem ? (
          <FlatList
            data={productsInOrder}
            renderItem={renderItem}
            scrollEnabled={true}
            initialNumToRender={2}
          />
        ) : null}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardDesign: {
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#353839',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#353839',
    borderBottomColor: '#353839',
    paddingVertical: 10,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 10,
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
    marginTop: 3,
  },
  textStyle: {
    color: '#696969',
  },
  textStyle2: {
    color: '#32cd32',
  },
});
export default CustomFlatlist2;
