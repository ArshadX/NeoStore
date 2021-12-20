import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Checkbox} from 'react-native-paper';

const ListOptionsColor = ({item, colorList, setDisable}) => {
  const [selected, setSelected] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (colorList.includes(item)) {
        setSelected(true);
        setDisable(false);
      }
    }, []),
  );
  const handleSelect = () => {
    if (selected === false) {
      setSelected(true);
      colorList.push(item);
      setDisable(false);
    } else {
      setSelected(false);
      colorList.splice(colorList.indexOf(item), 1);
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
          console.log(colorList);
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
export default ListOptionsColor;
