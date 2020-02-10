import React, { PureComponent } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

class Icon extends PureComponent {
  render() {
    const { props } = this;
    const { type, size } = props;

    if (type === 'ionicons') {
      return <Ionicons size={scale(size)} {...props} />;
    } else if (type === 'foundation') {
      return <Foundation size={scale(size)} {...props} />;
    } else if (type === 'entypo') {
      return <Entypo size={scale(size)} {...props} />;
    } else if (type === 'fontawesome5') {
      return <FontAwesome5 size={scale(size)} {...props} />;
    } else if (type === 'fontawesome') {
      return <FontAwesome size={scale(size)} {...props} />;
    } else if (type === 'antdesign') {
      return <AntDesign size={scale(size)} {...props} />;
    } else if (type === 'feather') {
      return <Feather size={scale(size)} {...props} />;
    } else if (type === 'material-community') {
      return <MaterialCommunity size={scale(size)} {...props} />;
    } else if (type === 'material') {
      return <MaterialIcons size={scale(size)} {...props} />;
    } else {
      throw 'Invalid icon type: ' + type;
    }
  }
}

Icon.defaultProps = {
  type: 'fontawesome',
};

Icon.propTypes = {
  allowFontScaling: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  style: PropTypes.any,
  type: PropTypes.oneOf([
    'ionicons',
    'feather',
    'foundation',
    'entypo',
    'fontawesome5',
    'fontawesome',
    'antdesign',
    'material-community',
    'material',
  ]),
};

export default Icon;
