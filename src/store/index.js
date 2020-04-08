import userStore from './userStore';
import chatSore from './chatStore';
import navStore from './navStore';
import notificationStore from './notificationStore';
import { observable, action } from 'mobx';
import RNBootSplash from 'react-native-bootsplash';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

export class RootStore {
  @observable storeLoaded = false;

  constructor() {
    this.userStore = new userStore(this);
    this.chatStore = new chatSore(this);
    this.navStore = new navStore(this);
    this.notificationStore = new notificationStore(this);
  }

  @action init = async () => {
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { user } = notificationOpen.notification._data;
      this.userStore.initWithNotification();
      Actions.replace('home');
      Actions.chat({ item: JSON.parse(user) });
      RNBootSplash.hide();
      return;
    }

    this.userStore
      .init()
      .then(Actions.home)
      .finally(() => RNBootSplash.hide({ duration: 250 }));
  };
}

export const store = new RootStore();
