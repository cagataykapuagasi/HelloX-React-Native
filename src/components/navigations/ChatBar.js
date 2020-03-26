import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from '../Icon';
import { images, languages } from 'res';
import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';

const { dropdown1, online, offline } = languages.t('chatBar');

const ChatBar = props => {
  const {
    item: { username, profile_photo, id },
    store: {
      chatStore: { currentUserStatus, deleteRoom },
      navStore,
    },
  } = props;

  const data = [{ text: dropdown1, onPress: () => deleteRoom(id) }];
  const openDropdown = () => navStore.openDropDown(data, styles.dropdown);

  const userStatus = useMemo(
    () => (currentUserStatus !== null ? (currentUserStatus ? online : offline) : null),
    [currentUserStatus]
  );

  const source = profile_photo ? { uri: profile_photo } : images.user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box1}>
        <TouchableOpacity onPress={Actions.pop} style={styles.button}>
          <Icon type="antdesign" name="left" color="white" size={25} />
        </TouchableOpacity>
        <FastImage source={source} style={styles.picture} />
        <View>
          <Text style={styles.name}>{username}</Text>
          {userStatus && <Text style={styles.status}>{userStatus}</Text>}
        </View>
      </View>
      <TouchableOpacity onPress={openDropdown}>
        <Icon type="feather" name="more-vertical" color="white" size={25} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default inject('store')(observer(ChatBar));

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
  status: {
    marginLeft: '10@s',
    color: 'white',
    fontWeight: '400',
    fontSize: '12@s',
  },
  dropdown: {
    right: '10@s',
    top: '50@s',
  },
});
