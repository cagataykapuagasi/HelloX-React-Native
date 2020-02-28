import { user } from './userStore';
import { chat } from './chatStore';
import { nav } from './navStore';
import { observable, action } from 'mobx';

export class RootStore {
  @observable storeLoaded = false;

  @observable
  user = user;

  @observable
  chat = chat;

  @observable
  nav = nav;

  @action init = () =>
    user
      .init()
      .then(() => {
        chat.init();
        return Promise.resolve();
      })
      .catch(() => Promise.reject());
}

export const store = new RootStore();
