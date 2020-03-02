import React from 'react';
import { Text, View, TextInput as Input } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { colors, typography, fonts } from 'res';
import { compose } from 'recompose';
import handleTextInput from './utils/handleTextInput';
import Fumi from './Fumi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class TextInput extends React.Component {
  state = {
    isFocused: false,
  };

  onFocus = () => {
    this.setState({
      isFocused: true,
    });
  };

  onEndEditing = () => {
    this.setState({
      isFocused: false,
    });
  };

  render() {
    const {
      leftIcon,
      Component,
      error,
      renderRightAccessory,
      formik,
      touched,
      style,
      onFocus,
      disableCheck,
      value,
      ...props
    } = this.props;
    let color = error
      ? colors.danger
      : touched
      ? colors.secondary
      : colors.text;
    const { isFocused } = this.state;
    const fontSize = scale(value || isFocused ? 11 : 14);
    const bottom = scale(value || isFocused ? 5 : 0);

    return (
      <View>
        <Component
          style={styles.main}
          onChangeText={this.onChange}
          onBlur={this.onBlur}
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus}
          iconClass={FontAwesomeIcon}
          iconColor={color}
          passiveIconColor={color}
          iconSize={scale(16)}
          iconWidth={scale(35)}
          inputPadding={scale(17)}
          labelStyle={[styles.labelStyle, { fontSize, bottom }]}
          inputStyle={styles.inputStyle}
          {...props}
        />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
}

TextInput.defaultProps = {
  Component: Fumi,
};

export default compose(handleTextInput)(TextInput);

const styles = ScaledSheet.create({
  main: {
    borderRadius: '5@s',
    marginTop: '20@s',
  },
  errorText: {
    position: 'absolute',
    bottom: '1@s',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.danger,
    fontSize: '11@s',
  },
  labelStyle: {
    fontWeight: 'normal',
    fontSize: '14@s',
  },
  inputStyle: {
    fontSize: '14@s',
    bottom: '6@s',
  },
});
