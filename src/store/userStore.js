import { observable, action } from 'mobx';
import { Auth, User } from '../api';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../api/Client';
import { chat } from './chatStore';
import { showMessage } from 'react-native-flash-message';

class UserStore {
  @observable user = { user: null, token: null, refresh_token: null };

  @action
  init = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));

    if (user) {
      setToken(user.token);

      User.getUser()
        .then(res => {
          this.setUser(res);
        })
        .catch(e => {
          this.user = user;
        });

      return Promise.resolve();
    }

    return Promise.reject();
  };

  @action
  setUser = async ({ token, user }) => {
    this.user.user = user;
    if (token) {
      this.user.token = token;
      setToken(token);
    }

    await chat.init();
    await AsyncStorage.setItem('user', JSON.stringify(this.user));
  };

  @action
  deleteAccount = () => {
    User.deleteAccount()
      .then(() => {
        this.logOut();
      })
      .catch(() => {
        showMessage({
          message:
            "Something went wrong. We couldn't delete your account.",
          type: 'danger',
        });
      });
  };

  @action
  logOut = async () => {
    await AsyncStorage.removeItem('user');
    Actions.login();
    this.user.user = null;
    this.user.token = null;
  };
}

export const user = new UserStore();
