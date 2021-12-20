import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Checkbox} from 'react-native-paper';

const ListOptions = ({item, categoryList, setDisable}) => {
  const [selected, setSelected] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (categoryList.includes(item)) {
        setSelected(true);
        setDisable(false);
      }
    }, []),
  );
  const handleSelect = () => {
    if (selected === false) {
      setSelected(true);
      categoryList.push(item);
      setDisable(false);
    } else {
      setSelected(false);
      categoryList.splice(categoryList.indexOf(item), 1);
    }
  };
  return (
    <View style={styles.optionText}>
      <Checkbox.Android
        status={selected ? 'checked' : 'unchecked'}
        uncheckedColor="#000000"
        centered={true}
        color="#4169e1"
        onPress={() => {
          handleSelect();
          console.log(categoryList);
        }}
      />
      <Text style={styles.text}>{item}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
  optionText: {
    marginVertical: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: '#fefefa',
    alignItems: 'center',
  },
});
export default ListOptions;
