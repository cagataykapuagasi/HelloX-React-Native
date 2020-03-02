import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet } from 'react-native-size-matters';
import colors from 'res/colors';

const Container = props => {
  const Container = props.colors ? LinearGradient : View;
  const coord =
    props.colors && props.horizontal
      ? { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }
      : null;

  return (
    <Container {...coord} style={styles.container} {...props}>
      {props.children}
    </Container>
  );
};

export default Container;

const styles = ScaledSheet.create({
  flex: 1,
});
