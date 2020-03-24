import React, { useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Easing } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import colors from 'res/colors';
import { observer, inject } from 'mobx-react';

const Item = props => {
  const {
    item: { text, onPress },
    index,
    store: {
      navStore: { hideDropDown },
    },
  } = props;
  const opacity = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(opacity, {
        duration: 500,
        toValue: 1,
      }).start();
    }, index * 150);
  }, [opacity]);

  const onPressItem = () => {
    hideDropDown();
    onPress();
  };

  return (
    <TouchableOpacity onPress={onPressItem}>
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default inject('store')(observer(Item));

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    height: '40@vs',
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingLeft: '15@vs',
  },
  text: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: '13@s',
  },
});
