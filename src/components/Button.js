import React from 'react';

import {Button, View} from 'react-native';

const Button = ({title, onPress}) => {
  return (
    <View>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default Button;
