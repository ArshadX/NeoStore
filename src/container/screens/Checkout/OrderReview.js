import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {connect} from 'react-redux';
import {instance} from '../../../lib/Instances/Instance';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import CustomModal from '../../../components/CustomModal';
import {
  AlertProfileUpdate,
  AlertProfileUpdate2,
} from '../../../components/AlertBox';
import Appbar from '../../../components/Appbar';
import ReviewCard from '../../../components/ReviewCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from '../../../components/Arrow';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import RazorpayCheckout from 'react-native-razorpay';
const OrderReview = ({route, navigation, userData}) => {
  const {id, Name, email} = route.params;
  const [orderId, setOrderId] = React.useState('');
  const [isloading, setisloading] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
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
  //last add
  const heightAnim = React.useRef(new Animated.Value(1)).current;
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
  const {address, city, country, pincode, state} = detials?.address;
  const handlePlaceOrder = e => {
    e.preventDefault();
    //payment method
    var options = {
      description: 'Credits towards Retail Service',
      image: 'https://raw.githubusercontent.com/ArshadX/image/main/logo.png',
      currency: 'INR',
      key: 'rzp_test_Z1630y120bEVrb', // Your api key
      amount: detials.subTotalPrice * 100,
      name: 'NeoStore',
      prefill: {
        email: email,
        name: Name,
      },
      theme: {color: '#214fc6'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        instance
          .post(`/placeOrder/${id}`, '', {
            headers: {
              Authorization: 'Bearer ' + userData.token,
            },
          })
          .then(response => {
            console.log(response?.data);
            AlertProfileUpdate2('Successfull', 'Order Placced', () =>
              navigation.navigate('home'),
            );
          })
          .catch(error => {
            console.log(error?.message);
            AlertProfileUpdate('Request failed', 'try again');
          });
        //  alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
    //payment method end
  };

  const animate = () => {
    // Will change heightAnim value to 1 in 5 seconds
    Animated.timing(heightAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const animateOut = () => {
    // Will change heigthtAnim value to 1 in 5 seconds
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
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
        backgroundColor="#214fc6"
        onPressIcon={() => navigation.goBack()}
        Contentcolor="#ffffff"
      />
      <CustomModal
        loadingIndicator={true}
        text="laoding..."
        visible={isloading}
        animatedType="fade"
      />
      <StatusBar backgroundColor="#214fc6" barStyle="light-content" />
      <View>
        <View>
          <Pressable
            onPress={() => {
              setShowModal(!showModal);
              if (showModal == false) {
                animate();
              } else {
                animateOut();
              }
            }}
            style={({pressed}) => [
              pressed ? styles.pressIn : styles.pressOut,
              styles.selector,
            ]}>
            <Text style={styles.textStyle}>
              {detials.address.address},{detials.address.city}...
            </Text>
            {showModal ? (
              <Arrow arrowType="chevron-down" />
            ) : (
              <Arrow arrowType="chevron-right" />
            )}
          </Pressable>
        </View>

        <View>
          <Animated.View style={{height: heightAnim}}>
            {showModal ? (
              <View style={styles.ReviewCard}>
                <View style={styles.address}>
                  <Text
                    style={styles.textStyle}
                    android_hyphenationFrequency="high">
                    {address}, {city}, {state}, {country}, ({pincode})
                  </Text>
                </View>
                <View style={styles.action}>
                  <View>
                    <ButtonWithIcon
                      leftIcon={false}
                      color="#000000"
                      title="Add Address or Change Address"
                      backgroundColor="#ffa812"
                      onPress={() => navigation.goBack()}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </Animated.View>
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
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomLeftRadius: 10,
  },
  textStyle: {
    color: '#000000',
    fontFamily: 'serif',
    marginTop: 3,
  },
  address: {
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  ReviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(OrderReview);
