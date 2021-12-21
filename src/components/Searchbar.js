import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {instance} from '../lib/Instances/Instance';
import {connect} from 'react-redux';
import Appbar from './Appbar';
const Searchbar = ({navigation, userData}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [suggestion, setSuggestion] = React.useState([]);
  const [suggestionlist, setSuggestionlist] = React.useState([]);
  /**suggestion list */
  React.useEffect(() => {
    instance
      .get('/commonProducts', {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(response => {
        const data = response?.data?.commonProducts;
        setSuggestion(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error?.message);
      });
  }, []);
  //end
  /**api call for searched data */
  /**handle search */
  const contains = ({name}, query) => {
    if (query !== '') {
      if (name.includes(query)) {
        return true;
      }
    }
    return false;
  };
  const handleSearch = text => {
    setSearchValue(text);
    const formattedQuery = text.trim();

    const data = suggestion.filter(item => contains(item, formattedQuery));
    setSuggestionlist(data);
  };
  //End search
  //handle Submit
  const handleSubmit = e => {
    e.preventDefault();
    instance
      .post(`/find/${searchValue}`, '', {
        headers: {
          Authorization: 'Bearer ' + userData.token,
        },
      })
      .then(response => {
        const data = response?.data?.searchResult;
        console.log(data);
        navigation.navigate('searchedProducts', {list: data});
      })
      .catch(error => {
        console.log(error?.message);
      });
  };
  //handle Submit
  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={e => {
          setSearchValue(item.name);
          handleSubmit(e);
        }}
        style={({pressed}) => [
          pressed ? styles.pressIn : styles.pressOut,
          styles.textstyle,
        ]}>
        <Icon name="magnify" color="#696969" size={20} />
        <Text style={styles.text}>{item.name}</Text>
      </Pressable>
    );
  };
  return (
    <View style={[styles.container]}>
      <Appbar
        leftIcon="arrow-left"
        title="Search Products"
        onPressIcon={() => navigation.goBack()}
        backgroundColor="#214fc6"
        Contentcolor="#ffffff"
      />
      <View style={styles.textinput}>
        <Icon name="magnify" color="#696969" size={20} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#696969"
          value={searchValue}
          onChangeText={text => handleSearch(text)}
          style={styles.textinputContainer}
          autoFocus={true}
        />
        <Pressable style={styles.searchIcon} onPress={e => handleSubmit(e)}>
          <Icon name="magnify" size={32} color="#ffffff" />
        </Pressable>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={suggestionlist}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchIcon: {
    backgroundColor: '#214fc6',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  textinput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: '#696969',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 1,
    paddingLeft: 5,
  },
  textstyle: {
    marginVertical: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  text: {
    color: '#696969',
  },
  searchtextstyle: {
    color: '#000000',
  },
  pressIn: {
    backgroundColor: '#bcd4e6',
    borderRadius: 10,
  },
  pressOut: {
    backgroundColor: '#ffffff',
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },

  textinputContainer: {
    flexGrow: 1,
  },
  flatList: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};
export default connect(mapStateToProps, null)(Searchbar);
