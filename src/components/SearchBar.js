import React from 'react';
import { View, Animated, TouchableOpacity, Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';
import { images, fonts, colors } from 'res';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from '~/components';

const height = new Animated.Value(0);
const width = new Animated.Value(0);
const marginLeft = new Animated.Value(0);

const animate = value => {
  Animated.parallel([
    Animated.timing(height, {
      toValue: scale(value),
      duration: 500,
    }),
    Animated.timing(width, {
      toValue: scale(value),
      duration: 500,
    }),
    Animated.timing(marginLeft, {
      toValue: scale(value - 30),
      duration: 500,
    }),
  ]).start();
};

const show = () => animate(40);

const hide = () => animate(0);

const SearchBar = props => {
  props.random ? show() : hide();

  return (
    <View style={styles.container}>
      <Kohana
        style={styles.input}
        label={'Search'}
        iconClass={FontAwesomeIcon}
        iconName={'search'}
        iconColor={colors.primary}
        inputPadding={0}
        labelStyle={styles.labelStyle}
        inputStyle={styles.inputStyle}
        labelContainerStyle={styles.labelContainerStyle}
        iconContainerStyle={styles.iconContainerStyle}
        iconSize={scale(20)}
        autoCapitalize={'none'}
        useNativeDriver
        {...props}
      />
      <TouchableOpacity onPress={props.openRandomUser}>
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              height,
              width,
              marginLeft,
            },
          ]}>
          <Icon
            type="fontawesome"
            name="random"
            size={20}
            color={colors.background}
          />
          <Text style={styles.text}>Rand</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '5@s',
    height: '40@s',
  },
  input: {
    borderWidth: 0.5,
    borderColor: colors.text,
    borderRadius: '5@s',
  },
  inputStyle: {
    fontSize: '15@s',
  },
  labelStyle: {
    fontWeight: 'normal',
    fontSize: '15@s',
  },
  labelContainerStyle: {
    padding: '10@s',
  },
  iconContainerStyle: {
    padding: '10@s',
  },
  text: {
    color: colors.background,
    fontSize: '12@s',
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5@s',
  },
});
