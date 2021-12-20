import React from 'react';

import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import Appbar from '../../components/Appbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SideTab from '../../components/SideTab';
import {Checkbox} from 'react-native-paper';
import Fab from '../../components/Fab';
import {instance} from '../../lib/Instances/Instance';
import {connect} from 'react-redux';
import CustomModal from '../../components/CustomModal';
import ListOptions from '../../components/ListOptions';
import ListOptionsColor from '../../components/ListOptionsColor';
import ListOptionsSortBy from '../../components/ListOptionsSortBy';
import ListOptionOrderBy from '../../components/ListOptionOrderBy';
import {AlertProfileUpdate} from '../../components/AlertBox';
const FilterScreen = ({route, navigation, userData}) => {
  const {Categories, Colors} = route?.params;
  const [activeCat, setactiveCat] = React.useState(false);
  const [activeColor, setactiveColor] = React.useState(false);
  const [activePrice, setactivePrice] = React.useState(false);
  const [activeRating, setactiveRating] = React.useState(false);
  const [option, setOption] = React.useState([]);
  const Sortby = ['price', 'rating'];
  const Orderby = ['Low to High', 'High to Low'];
  const [categoryList, setCategoryList] = React.useState([]);
  const [colorList, setColorList] = React.useState([]);
  const [order, setOrder] = React.useState('desc');
  const [sort, setSort] = React.useState('price');
  const [filterOption, setFilterOption] = React.useState('');
  const [isloading, setisloading] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  //Category
  const renderItemCat = ({item}) => {
    return (
      <ListOptions
        item={item}
        categoryList={categoryList}
        setDisable={setDisable}
      />
    );
  };
  //Color
  const renderItemColor = ({item}) => {
    return (
      <ListOptionsColor
        item={item}
        colorList={colorList}
        setDisable={setDisable}
      />
    );
  };
  //SortBy
  const renderItemSortBy = ({item}) => {
    return (
      <ListOptionsSortBy
        item={item}
        setSort={setSort}
        sort={sort}
        setDisable={setDisable}
      />
    );
  };
  // Order By
  const renderItemOrderBy = ({item}) => {
    return (
      <ListOptionOrderBy
        item={item}
        setOrder={setOrder}
        order={order}
        setDisable={setDisable}
      />
    );
  };
  const handleFilter = e => {
    e.preventDefault();
    if (categoryList.length == 0 && colorList.length == 0) {
      AlertProfileUpdate(
        'Request failed',
        "you haven't selected the filter options",
      );
    } else {
      const data = {
        categories: categoryList,
        colors: colorList,
        sort: {
          basedOn: sort,
          order: order,
        },
      };
      setisloading(true);
      instance
        .post('/filterCommonProducts', data, {
          headers: {
            Authorization: 'Bearer ' + userData.token,
          },
        })
        .then(response => {
          const itemList = response?.data?.filteredcommonProducts;
          console.log(itemList);
          setisloading(false);
          navigation.navigate('searchedProduct', {list: itemList});
        })
        .catch(error => {
          console.log(error?.message);
          setisloading(false);
          AlertProfileUpdate('Request failed', 'try again');
        });
    }
  };
  return (
    <View style={styles.container}>
      <Appbar
        leftIcon="arrow-left"
        title="Filter"
        onPressIcon={() => navigation.goBack()}
        rightIcon="filter-remove"
        rightIconColor="#ffffff"
        onPressRightIcon={() => {
          setCategoryList([]), setColorList([]);
          navigation.goBack();
        }}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <Fab
        iconName="filter"
        color="#ffffff"
        backgroundColor="#214fc6"
        size={25}
        onPress={e => handleFilter(e)}
        disabled={disable}
      />
      <CustomModal
        loadingIndicator={true}
        text="loading..."
        visible={isloading}
        animatedType="fade"
      />
      <View style={styles.content}>
        {/**menu */}
        <View style={styles.menu}>
          <SideTab
            text="Category"
            backgroundColor="#f5f5f5"
            textColor="#000000"
            isactive={activeCat}
            activeColor="#ffffff"
            onPress={() => {
              setactiveColor(false);
              setactiveCat(true);
              setactivePrice(false);
              setactiveRating(false);
              setOption(Categories);
              setFilterOption('Category');
            }}
          />
          <SideTab
            text="Color"
            backgroundColor="#f5f5f5"
            textColor="#000000"
            isactive={activeColor}
            activeColor="#ffffff"
            onPress={() => {
              setactiveColor(true);
              setactiveCat(false);
              setactivePrice(false);
              setactiveRating(false);
              setOption(Colors);
              setFilterOption('Color');
            }}
          />
          <SideTab
            text="Sort by"
            backgroundColor="#f5f5f5"
            textColor="#000000"
            isactive={activePrice}
            activeColor="#ffffff"
            onPress={() => {
              setactiveColor(false);
              setactiveCat(false);
              setactivePrice(true);
              setactiveRating(false);
              setOption(Sortby);
              setFilterOption('Sortby');
            }}
          />
          <SideTab
            text="Order by"
            backgroundColor="#f5f5f5"
            textColor="#000000"
            isactive={activeRating}
            activeColor="#ffffff"
            onPress={() => {
              setactiveColor(false);
              setactiveCat(false);
              setactivePrice(false);
              setactiveRating(true);
              setOption(Orderby);
              setFilterOption('Orderby');
            }}
          />
        </View>
        {/**option */}
        <View style={styles.option}>
          {filterOption === 'Orderby' ? (
            <FlatList data={option} renderItem={renderItemOrderBy} />
          ) : filterOption == 'Color' ? (
            <FlatList data={Colors} renderItem={renderItemColor} />
          ) : filterOption == 'Sortby' ? (
            <FlatList data={Sortby} renderItem={renderItemSortBy} />
          ) : filterOption === 'Category' ? (
            <FlatList data={Categories} renderItem={renderItemCat} />
          ) : null}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  menu: {
    flexGrow: 0.3,
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: '#d3d3d3',
  },
  option: {
    flexGrow: 0.7,
    backgroundColor: '#fefefa',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingVertical: 10,
  },
  textstyle: {
    marginVertical: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#f5f5f5',
  },
  optionText: {
    marginVertical: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#fefefa',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(FilterScreen);
