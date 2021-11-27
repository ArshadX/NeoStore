import React from 'react';

import {Text, View, FlatList, StyleSheet, Image} from 'react-native';
import {
  Button,
  IconButton,
  Title,
  Provider,
  Portal,
  Modal,
  Appbar,
} from 'react-native-paper';

import {instance} from '../../lib/Instances/Instance';
import {AllItems, Category} from '../../components/Filter';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';

const AllProduct = ({userData, navigation}) => {
  const [AllCategories, setallCategories] = React.useState([]);
  const [CommonProducts, setcommonProducts] = React.useState([]);
  const [AllColors, setallColors] = React.useState([]);
  const [Pri_Rat, setPri_Rat] = React.useState(['Low to High', 'High to Low']);
  const [VisibleCat, setVisibleCat] = React.useState(false);
  const [VisibleColor, setVisibleColor] = React.useState(false);
  const [VisiblePrice, setVisiblePrice] = React.useState(false);
  const [VisibleRating, setVisibleRating] = React.useState(false);
  const [filterOpt, setfilterOpt] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const value = await userData.token;
          if (value !== null) {
            const response = await instance.get('/commonProducts', {
              headers: {
                Authorization: 'Bearer ' + value,
              },
            });
            const allCategories = response?.data?.allCategories;
            const commonProducts = response?.data?.commonProducts;
            const colors = response?.data?.allColors;
            //terminal output
            setallCategories(allCategories);
            setcommonProducts(commonProducts);
            setallColors(colors);
            console.log(allCategories);
            console.log(value);
          }
        } catch (e) {
          // error reading value
          console.log(e);
        }
      };

      getData(); //.then(() => getUser());
    }, []),
  );
  const renderItem = ({item}) => {
    return (
      <AllItems
        image={item.image}
        name={item.name}
        price={item.price}
        rating={item.rating}
      />
    );
  };
  const renderCategory = ({item, index}) => {
    return <Category item={item} index={index} filterOption={filterOpt} />;
  };
  return (
    <Provider>
      <View style={itemstyles.Container}>
        {/** filter option show */}
        <Appbar.Header style={itemstyles.appbar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Product List" subtitle="All Product" />
        </Appbar.Header>
        <Portal>
          <Modal
            visible={VisibleCat}
            contentContainerStyle={itemstyles.containerStyle}>
            <IconButton
              icon="alpha-x-circle"
              color="#000000"
              size={25}
              onPress={() => setVisibleCat(false)}
              style={itemstyles.cross}
            />
            <Title>Sort by Category</Title>
            <FlatList data={AllCategories} renderItem={renderCategory} />
          </Modal>
          <Modal
            visible={VisibleColor}
            contentContainerStyle={itemstyles.containerStyle}>
            <IconButton
              icon="alpha-x-circle"
              color="#000000"
              size={25}
              onPress={() => setVisibleColor(false)}
              style={itemstyles.cross}
            />
            <Title>Sort by Color</Title>
            <FlatList
              data={AllColors}
              renderItem={renderCategory}
              showsVerticalScrollIndicator={true}
              initialNumToRender={5}
              persistentScrollbar={true}
            />
          </Modal>
          <Modal
            visible={VisiblePrice}
            contentContainerStyle={itemstyles.containerStyle}>
            <IconButton
              icon="alpha-x-circle"
              color="#000000"
              size={25}
              onPress={() => setVisiblePrice(false)}
              style={itemstyles.cross}
            />
            <Title>Sort by Price</Title>
            <FlatList data={Pri_Rat} renderItem={renderCategory} />
          </Modal>
          <Modal
            visible={VisibleRating}
            contentContainerStyle={itemstyles.containerStyle}>
            <IconButton
              icon="alpha-x-circle"
              color="#000000"
              size={25}
              onPress={() => setVisibleRating(false)}
              style={itemstyles.cross}
            />
            <Title>Sort by Rating</Title>
            <FlatList data={Pri_Rat} renderItem={renderCategory} />
          </Modal>
        </Portal>
        {/** Filter option end */}
        <View style={itemstyles.header}>
          <FlatList
            data={CommonProducts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        {/**filter bar  */}
        <View style={itemstyles.footer}>
          <View style={itemstyles.filterbar}>
            <Button
              icon="filter"
              mode="outlined"
              compact={true}
              onPress={() => {
                setfilterOpt('category');
                setVisibleCat(true);
              }}
              style={itemstyles.button}
              labelStyle={itemstyles.buttonContent}>
              <Text>Category</Text>
            </Button>
            <Button
              icon="format-color-fill"
              mode="outlined"
              compact={true}
              onPress={() => {
                setfilterOpt('color');
                setVisibleColor(true);
              }}
              style={itemstyles.button}
              labelStyle={itemstyles.buttonContent}>
              <Text>Color</Text>
            </Button>
            <Button
              icon="tag"
              mode="outlined"
              compact={true}
              onPress={() => {
                setfilterOpt('price');
                setVisiblePrice(true);
              }}
              style={itemstyles.button}
              labelStyle={itemstyles.buttonContent}>
              <Text>Price</Text>
            </Button>
            <Button
              icon="star"
              mode="outlined"
              compact={true}
              onPress={() => {
                setfilterOpt('rating');
                setVisibleRating(true);
              }}
              style={itemstyles.button}
              labelStyle={itemstyles.buttonContent}>
              <Text>Rating</Text>
            </Button>
          </View>
        </View>
      </View>
    </Provider>
  );
};

const itemstyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
  appbar: {
    backgroundColor: '#fefefa',
  },
  header: {
    flex: 9,
    justifyContent: 'flex-start',
    paddingHorizontal: 1,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fefefa',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  filterbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#5b92e5',
    marginRight: 10,
  },
  containerStyle: {
    alignItems: 'center',
    backgroundColor: '#fefefa',
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 70,
    marginRight: 90,
    marginBottom: 220,
    borderRadius: 15,
  },
  buttonContent: {fontSize: 10, color: '#000000'},
  cross: {
    marginRight: 200,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(AllProduct);
