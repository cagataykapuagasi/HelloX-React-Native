import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ScaledSheet,
  verticalScale,
  scale,
} from 'react-native-size-matters';
import Spinner from 'react-native-spinkit';

const Button = props => {
  const { onPress, loading, distance, text, colors, disabled } = props;
  const Container = colors ? LinearGradient : View;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        marginTop: verticalScale(distance),
        opacity: disabled ? 0.8 : 1,
      }}
      onPress={onPress}>
      <Container style={styles.container} {...props}>
        {loading ? (
          <Spinner color="white" size={scale(20)} type="ChasingDots" />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Container>
    </TouchableOpacity>
  );
};

export default Button;

Button.defaultProps = {
  width: '100%',
  height: 50,
  distance: 10,
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5@s',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14@s',
  },
});
