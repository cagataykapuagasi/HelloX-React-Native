import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '../Icon';
import { Actions } from 'react-native-router-flux';
import { ScaledSheet } from 'react-native-size-matters';

const BackButton = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={Actions.pop}>
      <Icon
        type="ionicons"
        name="ios-arrow-back"
        color="white"
        size={30}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = ScaledSheet.create({
  container: {
    height: '35@s',
    width: '35@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10@s',
  },
});
