import { observable, action, computed } from 'mobx';
import { Auth } from '../api';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../api/Client';
import { chat } from './chatStore';

class NavStore {
  @observable currentScreen = 'home_0';

  @action
  handleState = () => {
    this.currentScreen = Actions.currentScene.substring(1);
  };
}

export const nav = new NavStore();
