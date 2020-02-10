import { observable, action, computed } from 'mobx';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';

class UserStore {
  @observable authToken = null;
  @observable user = null;

  @action
  login = form => {
    Auth.login(form)
      .then(({ token, user }) => {
        this.authToken = token;
        this.user = user;
        Actions.replace('home');
      })
      .catch(e => console.log(e));
  };

  @action
  test = () => {
    this.user = 'user';
  };

  @action
  setUser = user => {
    this.user = user;
  };

  @action
  setAuthToken = session => {
    this.authToken = session;
  };

  @action
  reset = () => {
    this.authToken = null;
    this.user = null;
  };
}

export const user = new UserStore();
