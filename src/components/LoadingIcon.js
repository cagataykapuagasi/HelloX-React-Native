import React from 'react';
import { Icon } from '~/components';
import Spinner from 'react-native-spinkit';
import { scale } from 'react-native-size-matters';

const LoadingIcon = ({ loading, type, name, color, size }) =>
  loading ? (
    <Spinner color={color} size={scale(20)} type="ThreeBounce" />
  ) : (
    <Icon type={type} name={name} size={size} color={color} />
  );

export default LoadingIcon;
