import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import Item from './Item';
import { observer, inject } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

const DropDownList = props => {
  const {
    store: {
      navStore: { dropdown },
    },
  } = props;

  if (!dropdown) {
    return null;
  }

  const { data, style } = dropdown;
  const height = new Animated.Value(0);

  const animate = toValue =>
    Animated.timing(height, {
      duration: 250,
      toValue: verticalScale(toValue),
    });

  animate(40 * data.length).start();

  return (
    <Animated.View style={[styles.container, { height }, style]}>
      {data.map((item, index) => (
        <Item key={index} item={item} index={index} />
      ))}
    </Animated.View>
  );
};

export default inject('store')(observer(DropDownList));

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2000,
    right: '25@s',
    top: '60@s',
    width: '150@s',
    backgroundColor: colors.secondary,
  },
});
