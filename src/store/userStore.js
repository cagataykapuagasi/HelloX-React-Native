import { observable, action } from 'mobx';
import { User } from '../api';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../api/Client';
import { showMessage } from 'react-native-flash-message';
import { languages } from 'res';
import messaging from '@react-native-firebase/messaging';

const { userStore } = languages.t('alerts');

export default class UserStore {
  @observable user = { profile: null, token: null, refresh_token: null };

  constructor(store) {
    this.store = store;
  }

  @action
  init = async () => {
    const { profile, token } = JSON.parse(await AsyncStorage.getItem('user'));

    if (profile) {
      setToken(token);

      User.getUser()
        .then(({ user }) => {
          this.setUser({ user, token });
        })
        .catch(e => {
          this.user.profile = profile;
          this.user.token = token;
        });

      return Promise.resolve();
    }

    return Promise.reject();
  };

  @action
  setUser = async ({ user, token }) => {
    const { chatStore, notificationStore } = this.store;
    this.user.profile = user;
    this.user.token = token;
    setToken(token);

    const { language } = this.user.profile;
    const { locale } = languages;
    if (language !== locale) {
      User.updateLanguage(locale).then(r => (language = locale));
    }

    chatStore.init(token);
    notificationStore.init();
    await AsyncStorage.setItem('user', JSON.stringify(this.user));
  };

  @action
  updateProfilePhoto = url => {
    this.user.profile.profile_photo = url;
  };

  @action
  updateProfileAbout = about => {
    this.user.profile.about = about;
  };

  @action
  deleteAccount = () => {
    User.deleteAccount()
      .then(() => {
        this.logOut();
      })
      .catch(() => {
        showMessage({
          message: userStore,
          type: 'danger',
        });
      });
  };

  @action
  logOut = async () => {
    let {
      user: { profile, token },
      store: {
        chatStore: { rooms, disconnect },
      },
    } = this;
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('rooms');
    await messaging().deleteToken();
    Actions.login();
    profile = null;
    token = null;
    rooms = {};
    disconnect();
  };
}
