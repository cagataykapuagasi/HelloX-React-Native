import { observable, action, computed } from 'mobx';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../api/Client';
import { chat } from './chatStore';

class UserStore {
  @observable user = { user: null, token: null };

  @action
  init = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user) {
      this.user = user;
      setToken(user.token);
      return Promise.resolve();
    }

    return Promise.reject();
  };

  @action
  login = form => {
    Auth.login(form)
      .then(res => {
        this.setUser(res);
        Actions.replace('home');
      })
      .catch(e => console.log(e));
  };

  @action
  setUser = async ({ token, user }) => {
    this.user.user = user;
    this.user.token = token;
    setToken(token);
    await chat.init();
    await AsyncStorage.setItem('user', JSON.stringify(this.user));
  };

  @action
  reset = () => {
    this.user = null;
  };
}

export const user = new UserStore();
