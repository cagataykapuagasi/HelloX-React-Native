import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { scale, ScaledSheet } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { images, colors } from 'res';

const Avatar = ({ uri, style }) => {
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);

  onLoadEnd = () => {
    setLoading(false);
  };

  useEffect(() => {
    setSource(uri ? { uri } : images.user);
  }, [uri]);

  onError = () => {
    setSource(images.user);
  };

  return (
    <View style={style}>
      <FastImage
        onLoadEnd={onLoadEnd}
        onError={onError}
        source={source}
        style={[style, styles.container]}>
        {loading && (
          <Spinner color={colors.lightGray} size={scale(style.height)} type="9CubeGrid" />
        )}
      </FastImage>
    </View>
  );
};

export default Avatar;

const styles = ScaledSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
