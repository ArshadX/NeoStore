import React from 'react';

import {View, Text, Modal, StyleSheet, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';
const ChooseColor = ({color, setSelectColor}) => {
  const [checked, setChecked] = React.useState('');
  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <RadioButton.Android
          value={item}
          status={checked === item ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(item);
            setSelectColor(item);
          }}
        />
        <Text style={styles.title}>{item}</Text>
      </View>
    );
  };
  return (
    <View style={styles.modalContainer}>
      <FlatList
        data={color}
        renderItem={renderItem}
        scrollEnabled={true}
        alwaysBounceVertical={true}
        progressViewOffset={10}
        initialNumToRender={10}
        horizontal={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: '#000000',
  },

  modalContainer: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default ChooseColor;
