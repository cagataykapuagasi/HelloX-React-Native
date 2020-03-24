import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';

export default class NavStore {
  @observable currentScreen = 'home_0';
  @observable dropdown = null;

  constructor(store) {
    this.store = store;
  }

  @action
  hideDropDown = () => {
    if (!this.dropdown) {
      return;
    }

    this.dropdown = null;
  };

  @action
  openDropDown = (data, style) => {
    this.dropdown = { data, style };
  };

  @action
  handleState = () => {
    this.currentScreen = Actions.currentScene.substring(1);
  };
}
