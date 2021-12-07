import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
} from 'react-native';
import CartCard from '../../components/CartCard';
import {instance} from '../../lib/Instances/Instance';
import {AlertProfileUpdate} from '../../components/AlertBox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Appbar from '../../components/Appbar';
const Cart = ({navigation, userData}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [itemList, setItemList] = React.useState([]);
  const [SubTotal, setSubTotal] = React.useState(0);
  const [TotalItem, setTotalItem] = React.useState(0);
  const [isloading, setisloading] = React.useState(false);
  const [cartId, setCartId] = React.useState('');
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await userData.token;
          if (value !== null) {
            setShowModal(true);
            const response = await instance.get('/getCart', {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            setShowModal(false);
            const list = response?.data?.cart;
            const products = response?.data?.cart?.productDetails;
            const subtotal = response?.data?.cart?.subTotalPrice;
            const totalitem = response?.data?.cart?.__v;
            setItemList(products);
            setSubTotal(subtotal);
            setTotalItem(totalitem);
            setCartId(response?.data?.cart?._id);
            console.log(list);
          }
        } catch (e) {
          // error reading value
          console.log(e);
          setShowModal(false);
          AlertProfileUpdate('Request failed!', ' try again');
        }
      };
      getData();
    }, []),
  );
  const updateCart = e => {
    e.preventDefault();
    setisloading(true);
    const data = {
      cart: {
        productIds: ['612bcfedb01b0298c4fe7523'],
        _id: '612ca96183165d5f4bd2f42b',
        productDetails: [
          {
            _id: '612cd7f78886caaa925eb384',
            productId: '612bcfedb01b0298c4fe7523',
            productName: 'Narzo',
            productSeller: 'Realme',
            productColor: 'silver',
            productImage: 'silver-Narzo-1630305205272-639349922.jpeg',
            productStock: 40,
            orderQuantity: 7,
            productPrice: 20000,
            total: 20000,
          },
        ],
      },
    };
    instance
      .post('​/updateCart', data, {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(function (response) {
        console.log(response?.data);
        setisloading(false);
        AlertProfileUpdate('Successfull!');
      })
      .catch(function (error) {
        console.log(error);
        setisloading(false);
        AlertProfileUpdate('Request failed', 'try again');
      });
  };
  const renderItem = ({item}) => {
    return (
      <CartCard
        image={item.productImage}
        name={item.productName}
        price={item.productPrice}
        seller={item.productSeller}
        orderQuantity={item.orderQuantity}
        color={item.productColor}
        stock={item.productStock}
        setSubTotal={setSubTotal}
        subTotal={SubTotal}
        updateCart={updateCart}
      />
    );
  };
  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="#6495ed" barStyle="light-content" />
      <Appbar
        leftIcon="arrow-left"
        title="back"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#d3d3d3"
      />
      <View style={styles.subtotalView}>
        <Text style={styles.title}>Subtotal</Text>
        <Icon
          name="currency-inr"
          color="#008500"
          size={12}
          style={styles.icon}
        />
        <Text style={styles.price}>{SubTotal}</Text>
      </View>
      <View>
        <Pressable
          style={({pressed}) => [
            pressed ? styles.pressIn : styles.pressOut,
            styles.listitem,
          ]}
          onPress={() => navigation.navigate('ProceedToBuy', {id: cartId})}>
          <Text style={styles.list}>Proceed to Buy</Text>
          <Text style={styles.list}>({itemList.length} items)</Text>
        </Pressable>
      </View>
      <View style={styles.listView}>
        <Text style={styles.title}>Bucket</Text>
        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  listView: {
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontFamily: 'serif',
    fontSize: 20,
    marginRight: 5,
  },
  subtotalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  },
  price: {
    color: '#000000',
    fontFamily: 'sans-serif',
    fontSize: 24,
  },
  pressIn: {backgroundColor: '#6495ed'},
  pressOut: {backgroundColor: '#ffa812'},
  list: {
    color: '#000000',
    marginLeft: 10,
  },
  listitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#d3d3d3',
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  icon: {
    marginBottom: 5,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(Cart);
