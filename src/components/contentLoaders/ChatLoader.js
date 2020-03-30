import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Rect, Circle } from 'react-native-svg';
import ContentLoader from 'rn-content-loader';
import { colors } from 'res';

const { width, height } = Dimensions.get('window');

export default class ChatLoader extends Component {
  render() {
    return (
      <ContentLoader
        height={height}
        width={width}
        speed={2}
        primaryColor="#d9d9d9"
        secondaryColor="#c3c3c3">
        <Rect x="90" y="30" rx="8" ry="8" width={width - 100} height="40" />
        <Rect x="140" y="72" rx="8" ry="8" width={width - 150} height="20" />

        <Rect x="10" y="97" rx="8" ry="8" width={width - 100} height="60" />
        <Rect x="10" y="159" rx="8" ry="8" width={width - 150} height="20" />
        <Rect x="10" y="181" rx="8" ry="8" width={width - 250} height="20" />

        <Rect x="140" y="206" rx="8" ry="8" width={width - 150} height="20" />
        <Rect x="240" y="228" rx="8" ry="8" width={width - 250} height="20" />
        <Rect x="190" y="250" rx="8" ry="8" width={width - 200} height="20" />
        <Rect x="300" y="272" rx="8" ry="8" width={width - 310} height="20" />

        <Rect x="10" y="297" rx="8" ry="8" width={width - 100} height="40" />
        <Rect x="10" y="339" rx="8" ry="8" width={width - 295} height="20" />

        <Rect x="90" y="364" rx="8" ry="8" width={width - 100} height="100" />
        <Rect x="177" y="466" rx="8" ry="8" width={width - 187} height="20" />
        <Rect x="315" y="488" rx="8" ry="8" width={width - 325} height="20" />
      </ContentLoader>
    );
  }
}
