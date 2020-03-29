import userStore from './userStore';
import chatSore from './chatStore';
import navStore from './navStore';
import notificationStore from './notificationStore';
import { observable, action } from 'mobx';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { Actions } from 'react-native-router-flux';

export class RootStore {
  @observable storeLoaded = false;

  constructor() {
    this.userStore = new userStore(this);
    this.chatStore = new chatSore(this);
    this.navStore = new navStore(this);
    this.notificationStore = new notificationStore(this);
  }

  initIosFirebase = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerForRemoteNotifications();
      await messaging().requestPermission();
    }
  };

  @action init = async () => {
    this.userStore
      .init()
      .then(async () => {
        this.initIosFirebase();
        Actions.replace('home');
      })
      .finally(() => RNBootSplash.hide({ duration: 250 }));
  };
}

export const store = new RootStore();
