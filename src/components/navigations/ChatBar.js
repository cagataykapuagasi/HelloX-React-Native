import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon, Avatar } from '../';
import { languages } from 'res';
import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react';

const { dropdown1, online, offline } = languages.t('chatBar');

const ChatBar = props => {
  const {
    item: { username, profile_photo, id },
    store: {
      chatStore: { currentUserStatus, deleteRoom },
      navStore,
    },
  } = props;

  const [translateY] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));
  const data = [{ text: dropdown1, onPress: () => deleteRoom(id) }];
  const openDropdown = () => navStore.openDropDown(data, styles.dropdown);
  const userStatus = useMemo(() => (currentUserStatus ? online : null), [currentUserStatus]);
  useEffect(
    () =>
      Animated.parallel([
        Animated.timing(translateY, {
          duration: 500,
          toValue: scale(userStatus ? -8 : 0),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          duration: 500,
          toValue: userStatus ? 1 : 0,
          useNativeDriver: true,
        }),
      ]).start(),
    [userStatus]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box1}>
        <TouchableOpacity onPress={Actions.pop} style={styles.button}>
          <Icon type="antdesign" name="left" color="white" size={25} />
        </TouchableOpacity>
        <Avatar uri={profile_photo} style={styles.photo} />
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.name, { transform: [{ translateY }] }]}>
            {username}
          </Animated.Text>
          <Animated.Text style={[styles.status, { opacity }]}>{userStatus}</Animated.Text>
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
  photo: {
    height: '35@s',
    width: '35@s',
    borderRadius: '17.5@s',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14@s',
    position: 'absolute',
  },
  textContainer: {
    height: '100%',
    width: '60%',
    marginLeft: '10@s',
    justifyContent: 'center',
  },
  box1: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  status: {
    color: 'white',
    fontWeight: '400',
    fontSize: '12@s',
  },
  dropdown: {
    right: '10@s',
    top: '50@s',
  },
});
