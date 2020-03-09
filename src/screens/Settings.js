import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { TextInput, Form } from '~/components/form';
import { Container, Icon } from '~/components';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { loginSchema } from '~/utils/validationSchema';
import ImagePicker from 'react-native-image-picker';
import { updatePhoto } from '~/api/User';

const data = [
  { text: 'Change password', onPress: () => Actions.changePassword() },
  { text: 'Rate us' },
  { text: 'Contact us' },
];

const Settings = props => {
  const {
    user: {
      user: {
        user: { username, profile_photo },
      },
      deleteAccount,
    },
  } = props.store;

  const _deleteAccount = () => {
    Alert.alert('Are you sure?', 'Your account will be deleted', [
      {
        text: 'Yes',
        onPress: () => deleteAccount(),
      },
      { text: 'No', style: 'cancel' },
    ]);
  };

  const selectImage = () => {
    ImagePicker.showImagePicker(({ uri, fileName, type }) => {
      if (uri) {
        const data = new FormData();

        data.append('photo', {
          name: fileName,
          type: type,
          uri:
            Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        });

        global.FormData = global.originalFormData;

        updatePhoto(data)
          .then(res => console.warn(res))
          .catch(e => console.warn(e));
      }
    });
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <TouchableOpacity onPress={selectImage}>
          <Image source={{ uri: profile_photo }} style={styles.photo} />
        </TouchableOpacity>
        <Text style={styles.text}>{username}</Text>
        <View style={styles.menuContainer}>
          {data.map(({ text, onPress }) => (
            <TouchableOpacity
              key={text}
              onPress={onPress}
              style={styles.menu}>
              <Text style={styles.menuText}>{text}</Text>
              <Icon type="ionicons" name="md-arrow-dropright" size={25} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={_deleteAccount}
            style={styles.deleteContainer}>
            <Text style={styles.deleteText}>Hesabı Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default inject('store')(observer(Settings));

const styles = ScaledSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30@vs',
    paddingHorizontal: '20@s',
  },
  photo: {
    height: '140@s',
    width: '140@s',
    borderWidth: 0.5,
    borderRadius: '70@s',
  },
  text: {
    fontSize: '14@s',
    fontWeight: 'bold',
    marginTop: '10@s',
    color: colors.secondary,
  },
  menuContainer: {
    marginTop: '30@s',
    width: '100%',
  },
  menu: {
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray,
    marginTop: '15@s',
    padding: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    color: 'black',
    fontWeight: '500',
  },
  deleteContainer: {
    marginTop: '30@s',
    alignItems: 'flex-end',
  },
  deleteText: {
    color: colors.danger,
    fontSize: '12@s',
  },
});
