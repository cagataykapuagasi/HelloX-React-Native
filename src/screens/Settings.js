import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import { images, languages, colors } from 'res';
import { inject, observer } from 'mobx-react';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Form } from '~/components/form';
import { Container, Icon, LoadingIcon } from '~/components';
import { Actions } from 'react-native-router-flux';
import { Formik } from 'formik';
import { loginSchema } from '~/utils/validationSchema';
import ImagePicker from 'react-native-image-picker';
import { updatePhoto, updateAbout } from '~/api/User';
import { showMessage } from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';

const {
  settings: {
    delete: { title, text, buttons },
  },
} = languages.t('alerts');
const { placeholder, line1, line2, line3, deleteAc } = languages.t('settings');

const data = [
  { text: line1, onPress: () => Actions.changePassword() },
  {
    text: line2,
    onPress: () => Linking.openURL('market://details?id=hellox'),
  },
  {
    text: line3,
    onPress: () => Linking.openURL('mailto:cagatay.kapuagasi@gmail.com'),
  },
];

const Settings = props => {
  const {
    userStore: {
      user: {
        profile: { username, profile_photo, about },
      },
      deleteAccount,
      updateProfilePhoto,
      updateProfileAbout,
    },
  } = props.store;

  const [editable, setEditable] = useState(false);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [_about, setAbout] = useState(about);

  const _deleteAccount = () => {
    Alert.alert(title, text, [
      {
        text: buttons.yes,
        onPress: () => deleteAccount(),
      },
      { text: buttons.no, style: 'cancel' },
    ]);
  };

  const selectImage = () => {
    setPhotoLoading(true);

    ImagePicker.showImagePicker(async ({ uri, fileName, type }) => {
      if (uri) {
        const data = new FormData();

        const photo = {
          name: fileName,
          type,
          uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        };

        data.append('photo', photo);

        await updatePhoto(data)
          .then(r => updateProfilePhoto(uri))
          .catch(e =>
            showMessage({
              type: 'danger',
              message: settings.photo,
            })
          );
      }

      setPhotoLoading(false);
    });
  };

  const onError = e => {
    updateProfilePhoto(null);
  };

  const toggleAbout = () => setEditable(!editable);

  const onEndEditing = async () => {
    toggleAbout();

    if (_about === about) {
      return;
    }
    setAboutLoading(true);

    await updateAbout(_about)
      .then(r => updateProfileAbout(_about))
      .catch(() =>
        showMessage({
          type: 'danger',
          message: settings.about,
        })
      );

    setAboutLoading(false);
  };

  const source = profile_photo ? { uri: profile_photo } : images.user;

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <FastImage onError={onError} source={source} style={styles.photo} />
          <TouchableOpacity disabled={photoLoading} onPress={selectImage} style={styles.select}>
            <LoadingIcon
              loading={photoLoading}
              type="material"
              name="camera"
              size={25}
              color={colors.background}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{username}</Text>
        <View style={styles.aboutContainer}>
          <TextInput
            numberOfLines={1}
            maxLength={15}
            value={_about}
            onEndEditing={onEndEditing}
            onChangeText={about => setAbout(about)}
            editable={editable}
            style={[styles.about, { color: editable ? colors.black : colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={editable ? colors.black : colors.text}
          />
          <TouchableOpacity
            disabled={aboutLoading}
            style={styles.aboutButton}
            onPress={toggleAbout}>
            <LoadingIcon
              loading={aboutLoading}
              type="material"
              name="edit"
              size={22}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          {data.map(({ text, onPress }) => (
            <TouchableOpacity key={text} onPress={onPress} style={styles.menu}>
              <Text style={styles.menuText}>{text}</Text>
              <Icon type="ionicons" name="md-arrow-dropright" size={25} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={_deleteAccount} style={styles.deleteContainer}>
            <Text style={styles.deleteText}>{deleteAc}</Text>
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
  photoContainer: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: '70@s',
  },
  photo: {
    height: '140@s',
    width: '140@s',
    borderRadius: '70@s',
  },
  select: {
    position: 'absolute',
    height: '40@s',
    width: '40@s',
    borderRadius: '20@s',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
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
  aboutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10@s',
  },
  about: {
    fontSize: '13@s',
    textAlign: 'center',
  },
  aboutButton: {
    height: '30@s',
    width: '30@s',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '-40@s',
  },
});
