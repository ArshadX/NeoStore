import React from 'react';

import {Image, Share, StyleSheet, Text, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Appbar from '../../components/Appbar';
import {instance, imageUrl} from '../../lib/Instances/Instance';
import Swiper from '../../components/Swiper';
import {connect} from 'react-redux';
import IconButton from '../../components/IconButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import Fab from '../../components/Fab';
import FabRating from '../../components/FabRating';
import AddRating from '../../components/AddRating';
import {AlertProfileUpdate} from '../../components/AlertBox';
import CustomModal from '../../components/CustomModal';
import ChooseColor from '../../components/ChooseColor';
const ProductDetail = ({route, navigation, userData}) => {
  const [productDetails, setProductDetails] = React.useState({
    description: '',
    features: '',
    name: '',
    price: '',
    rating: '',
  });
  const [color, setColor] = React.useState([]);
  const [selectColor, setSelectColor] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [showRatingContainer, setShowRatingContainer] = React.useState(false);
  const {id} = route?.params;

  //loader
  const [isloading, setisloading] = React.useState(false);
  //order items
  const [totalItem, setTotalItem] = React.useState(1);
  React.useEffect(() => {
    setisloading(true);
    const getData = async () => {
      try {
        const value = await userData.token;
        if (value !== null) {
          const response = await instance.get(
            `/getProductDetails/${id}&${color[0]}`,
            {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            },
          );
          setImages(response?.data?.images);
          setProductDetails(response?.data);
          setColor(response?.data?.colors);
          console.log(response?.data);
          setisloading(false);
        }
      } catch (e) {
        // error reading value
        console.log(e?.message);
        AlertProfileUpdate('Request failed!', 'Please revisit...');
        setisloading(false);
      }
    };
    getData();
  }, []);
  //add to cart
  const addToCart = e => {
    e.preventDefault();
    setisloading(true);
    instance
      .post(`/addToCart/${id}&${selectColor}`, '', {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(function (response) {
        console.log(response?.data);
        setisloading(false);
        AlertProfileUpdate('Successfull!', 'added to the cart');
      })
      .catch(function (error) {
        console.log(error);
        setisloading(false);
        AlertProfileUpdate('Request failed', 'try again');
      });
  };
  //Buy Now//
  const handleBuyNow = e => {
    e.preventDefault();
    setisloading(true);
    instance
      .post(`/addToCart/${id}&${selectColor}`, '', {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(function (response) {
        console.log(response?.data);
        setisloading(false);
        navigation.navigate('Cart');
      })
      .catch(function (error) {
        console.log(error);
        setisloading(false);
        AlertProfileUpdate('Request failed', 'try again');
      });
  };
  {
    /**Share With others */
  }
  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: `Take a look at this ${productDetails.name} on NeoStore https://dl.NeoStore.com`,
        },
        {dialogTitle: 'Products'},
      );
      if (result.action === Share.sharedAction) {
        console.log('shared succesfully');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({item}) => {
    return <Swiper image={item} />;
  };
  return (
    <View style={styles.container}>
      <CustomModal
        loadingIndicator={true}
        text="loading..."
        visible={isloading}
        animatedType="fade"
      />
      <Appbar
        title="back"
        leftIcon="arrow-left"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#ffffff"
        rightIcon="cart"
        rightIconColor="#0000ff"
        onPressRightIcon={() => navigation.navigate('Cart')}
      />
      <Fab
        iconName="cart"
        color="#ffffff"
        backgroundColor="#ff6e4a"
        size={25}
        onPress={e => addToCart(e)}
      />
      <FabRating
        iconName="star"
        text={productDetails.rating}
        size={20}
        color="#ffcc33"
        backgroundColor="#f4f0ec"
        top={300}
      />
      <FabRating
        iconName="share-variant"
        text=""
        size={25}
        color="#000000"
        backgroundColor="#f4f0ec"
        top={70}
        onPress={onShare}
      />
      <AddRating
        text={productDetails.name}
        visible={showRatingContainer}
        animatedType="slide"
        rating={productDetails.rating}
        image={images[2]}
        setShowRatingContainer={setShowRatingContainer}
        id={id}
      />

      <View style={styles.header}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          showPagination
          paginationActiveColor="#000000"
          paginationStyle={styles.dotsView}
          paginationStyleItem={styles.dots}
          data={images}
          renderItem={renderItem}
          horizontal={true}
          decelerationRate="fast"
          snapToInterval={393}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.productDetails}>
          <Text style={styles.title}>{productDetails.name}</Text>
          <Text style={styles.textStyle}>{productDetails.description}</Text>
          <Text style={styles.textStyle}>{productDetails.features}</Text>
          <View style={styles.price}>
            <Icon name="currency-inr" size={13} color="#000000" />
            <Text style={styles.title}>{productDetails.price}</Text>
          </View>
          <Text style={styles.textStyle}>inclusive of all taxes</Text>
          <View style={styles.action}>
            <IconButton
              name="minus"
              size={17}
              onPress={() => {
                if (totalItem > 1) {
                  setTotalItem(totalItem - 1);
                }
              }}
            />
            <Text style={styles.count}>{totalItem}</Text>
            <IconButton
              name="plus"
              size={17}
              onPress={() => setTotalItem(totalItem + 1)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <ChooseColor color={color} setSelectColor={setSelectColor} />
          </View>
        </View>
        <View style={styles.block2}>
          <Text style={styles.title}>Easy 30 days return and exchanges</Text>
          <Text style={styles.textStyle}>
            Choose to return or exchange for a different for a different size
            (if available) within 30 days.
          </Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <ButtonWithIcon
          leftIcon={true}
          iconName="star"
          size={17}
          color="#000000"
          title="Rate"
          backgroundColor="#ffdb58"
          onPress={() => setShowRatingContainer(true)}
        />
        <ButtonWithIcon
          leftIcon={true}
          iconName="shopping"
          size={17}
          color="#000000"
          title="Buy Now"
          backgroundColor="#ffa07a"
          onPress={e => handleBuyNow(e)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f4',
  },
  header: {
    flex: 2,
    borderBottomColor: '#d3d3d3',
  },
  footer: {
    flex: 2,
    borderTopColor: '#d3d3d3',
    borderTopWidth: 1,
  },
  dotsView: {
    marginBottom: 10,
  },
  dots: {
    width: 6,
    height: 6,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    alignSelf: 'flex-start',
    borderRadius: 11,
  },
  count: {
    color: '#000000',
    marginHorizontal: 10,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetails: {
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    marginBottom: 10,
  },
  block2: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#696969',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginLeft: 40,
    paddingLeft: 30,
    paddingRight: 60,
  },
  buttonView: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-evenly',
  },
  button2: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  textStyle: {
    color: '#696969',
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(ProductDetail);
