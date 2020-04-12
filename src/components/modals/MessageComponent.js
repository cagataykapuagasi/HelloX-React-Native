import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon, Avatar } from '~/components';
import { ScaledSheet } from 'react-native-size-matters';
import { colors } from 'res';
import { hideMessage } from 'react-native-flash-message';

const MessageComponent = ({ message: { user, message, onPress, type } }) => {
  const _onPress = () => {
    hideMessage();
    onPress && onPress();
  };

  const backgroundColor =
    type !== 'default' ? (type === 'danger' ? colors.danger : colors.online) : colors.background;

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={_onPress} style={[styles.container, { backgroundColor }]}>
        {user ? (
          <View style={styles.user}>
            <View style={styles.header}>
              <Avatar uri={user.profile_photo} style={styles.photo} />
              <Text style={styles.username}>{user.username}</Text>
            </View>

            <View style={styles.messageContainer}>
              <Text style={styles.message} numberOfLines={1}>
                {user.message}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.message2Container}>
            <Icon size={30} type="material" name="error" color={colors.background} />
            <Text style={styles.message2}>{message}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MessageComponent;

const styles = ScaledSheet.create({
  container: {
    minHeight: '50@s',
    maxHeight: '100@s',
    width: '90%',
    alignSelf: 'center',
    borderRadius: '8@s',
    justifyContent: 'center',
    padding: '10@s',
    overflow: 'hidden',
  },
  user: {
    height: '100@s',
  },
  photo: {
    height: '40@s',
    width: '40@s',
    borderRadius: '20@s',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  username: {
    fontSize: '14@s',
    fontWeight: '700',
    color: colors.text,
    left: '5@s',
  },
  message: {
    fontSize: '15@s',
    fontWeight: '400',
  },
  message2: {
    fontSize: '15@s',
    fontWeight: '400',
    color: colors.background,
    flex: 1,
    left: '5@s',
  },
  messageContainer: {
    flex: 1,
  },
  message2Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
