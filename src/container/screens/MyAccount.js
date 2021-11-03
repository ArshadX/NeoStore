import React from 'react';

import {Text, View} from 'react-native';
import {styles} from '../../styles/styles';

const MyAccount = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text styles={styles.titleFooter}>MyAccount</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.titleFooter}>List Item</Text>
      </View>
    </View>
  );
};

export default MyAccount;
