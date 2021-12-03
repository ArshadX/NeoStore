import React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Appbar from '../../components/Appbar';
import {instance, imageUrl} from '../../lib/Instances/Instance';
import Swiper from '../../components/Swiper';
import {connect} from 'react-redux';
const ProductDetail = ({route, navigation, userData}) => {
  const [productDetails, setProductDetails] = React.useState([]);
  const [color, setColor] = React.useState('silver');
  const [images, setImages] = React.useState([]);
  const {id} = route?.params;
  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await userData.token;
        if (value !== null) {
          const response = await instance.get(
            `/getProductDetails/${id}&${color}`,
            {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            },
          );
          setImages(response?.data?.images);
          console.log(response?.data);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    getData();
  }, []);
  const renderItem = ({item}) => {
    return <Swiper image={item} />;
  };
  return (
    <View style={styles.container}>
      <Appbar
        title="back"
        leftIcon="arrow-left"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#ffffff"
      />

      <View style={styles.header}>
        <SwiperFlatList
          //autoplay
          // autoplayDelay={2}
          //  autoplayLoop
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
        <Text>Hello</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 2,
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
export default connect(mapStateToProps, null)(ProductDetail);
