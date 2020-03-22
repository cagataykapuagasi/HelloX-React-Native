import React from 'react';
import {
  Text,
  View,
  TextInput as Input,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { colors, typography, fonts } from 'res';
import { compose } from 'recompose';
import handleTextInput from './utils/handleTextInput';
import Fumi from './Fumi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from '../Icon';

const { width } = Dimensions.get('window');

class TextInput extends React.Component {
  state = {
    showPassword: false,
    isFocused: false,
  };

  togglePassword = () => {
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword,
    }));
  };

  onFocus = () => this.setState({ isFocused: true });

  onEndEditing = () => this.setState({ isFocused: false });

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
    const { showPassword } = this.state;
    let color = error
      ? colors.danger
      : touched
      ? colors.secondary
      : colors.text;
    const { isFocused } = this.state;
    const fontSize = scale(value || isFocused ? 11 : 14);
    const bottom = scale(value || isFocused ? 5 : 0);

    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Component
            style={styles.main}
            onChangeText={this.onChange}
            onEndEditing={this.onEndEditing}
            iconClass={FontAwesomeIcon}
            iconColor={color}
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
            passiveIconColor={color}
            iconSize={scale(16)}
            iconWidth={scale(35)}
            inputPadding={scale(17)}
            labelStyle={[styles.labelStyle, { fontSize, bottom }]}
            inputStyle={styles.inputStyle}
            secureTextEntry={!showPassword}
            {...props}
          />

          <TouchableOpacity onPress={this.togglePassword}>
            {this.props.iconName === 'lock' && (
              <Icon
                style={styles.icon}
                type="ionicons"
                name={showPassword ? 'md-eye-off' : 'md-eye'}
                size={25}
              />
            )}
          </TouchableOpacity>
        </View>

        {<Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
}

TextInput.defaultProps = {
  Component: Fumi,
};

export default compose(handleTextInput)(TextInput);

const styles = ScaledSheet.create({
  container: {
    height: '65@s',
    marginTop: '20@s',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '5@s',
  },
  main: {
    flex: 1,
  },
  inputView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10@vs',
    paddingRight: '15@s',
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
  icon: {
    top: '7@vs',
  },
});
