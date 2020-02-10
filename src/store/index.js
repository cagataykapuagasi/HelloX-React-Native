import { user } from './userStore';
import { chat } from './chatStore';
import { AsyncTrunk, ignore } from 'mobx-sync';
import { observable, action } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken } from '../api/Client';

export class RootStore {
  @observable storeLoaded = false;

  @observable
  user = user;

  @observable
  chat = chat;

  @action init = () => {
    return new Promise((resolve, reject) => {
      trunk.init().then(() => {
        console.log(store);
        store.storeLoaded = 'lale';

        if (user.user) {
          chat.init();
          setToken(user.authToken);
          resolve();
        } else {
          reject();
        }
      });
    });
  };
}

export const store = new RootStore();

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__HelloX__',
});
