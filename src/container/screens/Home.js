import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {styles} from '../../styles/styles';
import {instance, imageUrl} from '../../lib/Instances/Instance';
import {connect} from 'react-redux';
import CustomModal from '../../components/CustomModal';
import {Rating} from 'react-native-ratings';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Appbar from '../../components/Appbar';
const Item = ({image, name, navigation}) => {
  return (
    <Pressable
      style={itemstyles.flatList}
      onPress={() => navigation.navigate('allProduct')}>
      <Card style={itemstyles.cardDesign}>
        <Image
          source={{
            uri: imageUrl + image,
          }}
          style={itemstyles.productOfEachCategory}
        />
      </Card>
    </Pressable>
  );
};
const TopRatedItem = ({image, name, rating, price, id, navigation}) => {
  return (
    <View style={itemstyles.flatListTRP}>
      <Pressable
        android_ripple={{radius: 190, foreground: true}}
        onPress={() => navigation.navigate('productDetails', {id: id})}>
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
      </Pressable>
    </View>
  );
};
const Home = ({navigation, userData}) => {
  const [isloading, setisloading] = React.useState(false);
  const [ProductOfEachCategory, setProductOfEachCategory] = React.useState([]);
  const [TopRatedProducts, setTopRatedProducts] = React.useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setisloading(true);
          const value = await userData.token;
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
            console.log(response?.data);
            setisloading(false);
          }
        } catch (e) {
          // error reading value
          console.log(e);
          setisloading(false);
        }
      };
      getData();
    }, []),
  );

  const renderItem = ({item}) => {
    return <Item image={item.image} name={item.name} navigation={navigation} />;
  };
  const renderItemToprated = ({item}) => {
    return (
      <TopRatedItem
        image={item.image}
        name={item.name}
        price={item.price}
        rating={item.rating}
        id={item.id}
        navigation={navigation}
      />
    );
  };
  return (
    <View style={itemstyles.Container}>
      <StatusBar
        backgroundColor="#214fc6"
        animated={true}
        barStyle="light-content"
      />
      <Appbar
        leftIcon="menu"
        backgroundColor="#214fc6"
        onPressIcon={() => navigation.openDrawer()}
        title="NeoStore"
        Contentcolor="#ffffff"
        rightIcon="cart"
        onPressRightIcon={() => navigation.navigate('Cart')}
        rightIconColor="#ffffff"
        showSearchbar={true}
        onPressSearch={() => navigation.navigate('search')}
      />
      <CustomModal
        loadingIndicator={true}
        text="loading"
        visible={isloading}
        animatedType="fade"
      />
      <View style={itemstyles.footer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          showPagination
          paginationActiveColor="#000000"
          paginationStyle={itemstyles.dotsView}
          paginationStyleItem={itemstyles.dots}
          data={ProductOfEachCategory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          decelerationRate="fast"
          snapToInterval={371}
        />
      </View>
      <View style={itemstyles.toprated}>
        <Text style={styles.textStyle}>Top Product for you</Text>

        <FlatList
          data={TopRatedProducts}
          renderItem={renderItemToprated}
          keyExtractor={item => item.id}
          scrollEnabled={true}
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
  toprated: {
    flex: 5,
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  searchbar: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  flatList: {
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  flatListTRP: {
    marginTop: 2,
    marginBottom: 5,
    paddingBottom: 2,
  },
  cardDesign: {
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
  ratingStyle: {
    flexDirection: 'row',
    width: 80,
  },
  dotsView: {
    marginBottom: 10,
  },
  dots: {
    width: 6,
    height: 6,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps, null)(Home);
