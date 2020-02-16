import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from '../Icon';
import { images, fonts, colors } from 'res';
import { Actions } from 'react-native-router-flux';

const ChatBar = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box1}>
        <TouchableOpacity onPress={Actions.pop} style={styles.button}>
          <Icon
            type="antdesign"
            name="caretleft"
            color="white"
            size={25}
          />
        </TouchableOpacity>
        <Image source={images.user} style={styles.picture} />
        <Text style={styles.name}>{props.item.username}</Text>
      </View>
      <TouchableOpacity>
        <Icon
          type="feather"
          name="more-vertical"
          color="white"
          size={25}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatBar;

const styles = ScaledSheet.create({
  container: {
    height: '75@s',
    width: '100%',
    backgroundColor: '#128C7E',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: '30@s',
    width: '30@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5@s',
    paddingTop: '2@s',
  },
  picture: {
    height: '30@s',
    width: '30@s',
    borderRadius: '15@s',
    marginLeft: '5@s',
  },
  name: {
    marginLeft: '10@s',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14@s',
  },
  box1: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
