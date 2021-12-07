import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {connect} from 'react-redux';
import {instance} from '../../../lib/Instances/Instance';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import CustomModal from '../../../components/CustomModal';
import {AlertProfileUpdate} from '../../../components/AlertBox';
import Appbar from '../../../components/Appbar';
import ReviewCard from '../../../components/ReviewCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const OrderReview = ({route, navigation, userData}) => {
  const {id} = route.params;
  const [orderId, setOrderId] = React.useState('');
  const [isloading, setisloading] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState([]);
  const [detials, setDetails] = React.useState({
    subTotalPrice: '',
    totalPrice: '',
    address: {
      address: '',
      city: '',
      country: '',
      pincode: null,
      state: '',
    },
  });
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setisloading(true);
          const value = await userData.token;
          if (value !== null) {
            const response = await instance.get(`/reviewOrderDetails/${id}`, {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            const list = response?.data;
            setProductDetails(list?.order?.productDetails);
            setDetails(list?.order);
            setOrderId(list?.order?._id);
            console.log(list?.order);
            setisloading(false);
          }
        } catch (e) {
          // error reading value
          console.log(e);
          AlertProfileUpdate('Request failed!', ' try again');
          setisloading(false);
        }
      };
      getData();
    }, []),
  );
  const handlePlaceOrder = e => {
    e.preventDefault();
    instance
      .post(`/placeOrder/${id}`, '', {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(response => {
        console.log(response?.data);
        AlertProfileUpdate('Successfull');
      })
      .catch(error => {
        console.log(error?.message);
        AlertProfileUpdate('Request failed', 'try again');
      });
  };
  const renderItem = ({item}) => {
    return (
      <ReviewCard
        image={item.productImage}
        name={item.productName}
        price={item.productPrice}
        seller={item.productSeller}
        orderQuantity={item.orderQuantity}
        color={item.productColor}
        stock={item.productStock}
      />
    );
  };
  return (
    <View style={styles.Container}>
      <Appbar
        title="Back"
        leftIcon="arrow-left"
        backgroundColor="#d3d3d3"
        onPressIcon={() => navigation.goBack()}
      />
      <CustomModal
        loadingIndicator={true}
        text="laoding..."
        visible={isloading}
        animatedType="fade"
      />
      <View>
        <View style={styles.subtotalView}>
          <Text style={styles.title}>Subtotal</Text>
          <Icon
            name="currency-inr"
            color="#008500"
            size={12}
            style={styles.icon}
          />
          <Text style={styles.price}>{detials.subTotalPrice}</Text>
        </View>
        <View>
          <Pressable
            style={({pressed}) => [
              pressed ? styles.pressIn : styles.pressOut,
              styles.listitem,
            ]}
            onPress={e => handlePlaceOrder(e)}>
            <Text style={styles.list}>
              Place order ({productDetails.length} items)
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.listView}>
        <FlatList
          data={productDetails}
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
export default connect(mapStateToProps, null)(OrderReview);
