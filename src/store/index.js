import { user } from './userStore';
import { chat } from './chatStore';
import { observable, action } from 'mobx';

export class RootStore {
  @observable storeLoaded = false;

  @observable
  user = user;

  @observable
  chat = chat;

  @action init = () => {
    return user.init();
  };
}

export const store = new RootStore();
