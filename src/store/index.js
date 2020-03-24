import userStore from './userStore';
import chatSore from './chatStore';
import navStore from './navStore';
import { observable, action } from 'mobx';

export class RootStore {
  @observable storeLoaded = false;

  constructor() {
    this.userStore = new userStore(this);
    this.chatStore = new chatSore(this);
    this.navStore = new navStore(this);
  }

  @action init = () =>
    this.userStore
      .init()
      .then(() => Promise.resolve())
      .catch(e => Promise.reject());
}

export const store = new RootStore();
