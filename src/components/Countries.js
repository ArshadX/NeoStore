import React from 'react';

import {Text, Pressable, StyleSheet} from 'react-native';

const Countries = ({name, setCountry, setShowModal}) => {
  return (
    <Pressable
      style={({pressed}) => [
        pressed ? styles.pressIn : styles.pressOut,
        styles.elements,
      ]}
      onPress={async () => {
        await setCountry(name);
        setShowModal(false);
      }}>
      <Text style={styles.name}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  elements: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 3,
    paddingTop: 3,
    paddingBottom: 3,
  },
  pressIn: {
    backgroundColor: '#6495ed',
  },
  pressOut: {
    backgroundColor: '#ffffff',
  },
  name: {
    color: '#000000',
  },
});
export default Countries;
