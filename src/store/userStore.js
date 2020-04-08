import { observable, action } from 'mobx';
import { User } from '../api';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../api/Client';
import { showMessage } from 'react-native-flash-message';
import { languages } from 'res';
import firebase from 'react-native-firebase';
import { showAlert } from '~/components/alert';

const {
  userStore,
  logOut: { title, text, buttons },
} = languages.t('alerts');

export default class UserStore {
  @observable user = { profile: null, token: null, refresh_token: null };

  constructor(store) {
    this.store = store;
  }

  @action
  init = async () => {
    const { profile, token, refresh_token } = JSON.parse(await AsyncStorage.getItem('user'));
    setToken({ token, refresh_token });

    if (profile) {
      User.getUser()
        .then((user) => {
          this.setUser({ user, token, refresh_token });
        })
        .catch((e) => {
          this.user.profile = profile;
          this.user.token = token;
        });

      return Promise.resolve();
    }

    return Promise.reject();
  };

  @action
  initWithNotification = async () => {
    const { profile, token, refresh_token } = JSON.parse(await AsyncStorage.getItem('user'));
    setToken({ token, refresh_token });
    this.user.profile = profile;
    this.user.token = token;
    this.store.chatStore.init(token);
    this.store.notificationStore.init();
  };

  @action
  setUser = async ({ user, token, refresh_token }) => {
    const { chatStore, notificationStore } = this.store;
    this.user.profile = user;
    this.user.token = token;
    this.user.refresh_token = refresh_token;
    setToken({ token, refresh_token });

    const { locale } = languages;
    if (user.language !== locale) {
      User.updateLanguage(locale).then((r) => (this.user.profile.language = locale));
    }

    chatStore.init(token);
    notificationStore.init();
    await AsyncStorage.setItem('user', JSON.stringify(this.user));
  };

  refreshToken = async (res) => {
    if (res.ok && res.data) {
      const { token, refresh_token } = res.data;
      this.user.token = token;
      this.user.refresh_token = refresh_token;
      setToken({ token, refresh_token });
      await AsyncStorage.setItem('user', JSON.stringify(this.user));
    } else {
      this._logOut();
    }
  };

  @action
  updateProfilePhoto = (url) => {
    this.user.profile.profile_photo = url;
  };

  @action
  updateProfileAbout = (about) => {
    this.user.profile.about = about;
  };

  deleteAccount = async () => {
    await User.deleteAccount()
      .then(this._logOut)
      .catch(() => {
        showMessage({
          message: userStore,
          type: 'danger',
        });
      });
  };

  logOut = () => {
    showAlert({
      title,
      text,
      buttons,
      onPress: this._logOut,
    });
  };

  @action
  _logOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await firebase.messaging().deleteToken();
      this.profile = null;
      this.token = null;
      const { disconnect, deleteRooms } = this.store.chatStore;
      deleteRooms();
      disconnect();
    } catch (error) {
    } finally {
      Actions.login();
    }
  };
}

export function refreshToken(res) {
  return new UserStore().refreshToken(res);
}
