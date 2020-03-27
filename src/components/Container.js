import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet } from 'react-native-size-matters';

const Container = props => {
  const Container = props.colors ? LinearGradient : View;
  const coord =
    props.colors && props.horizontal ? { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } } : null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={props.vertical}
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
        <Container {...coord} style={styles.container} {...props}>
          {props.children}
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Container;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
});
