import { observable, action } from 'mobx';
import io from 'socket.io-client/dist/socket.io';
import { user as userStore } from './userStore';

let socket = null;

class chatStore {
  @observable
  messages = [];

  init = async () => {
    const { token, user } = userStore.user;

    socket = await io.connect('http://localhost:3000', {
      query: {
        token,
      },
    });

    //socket.emit(user.id, 'connected');
    //console.log(user.id);
    socket.on(user.id, text => {
      console.log('gelen', text);
      const newMessage = { text, type: 'received' };
      this.messages.push(newMessage);
    });
  };

  sendMessage = (id, text) => {
    const { token, user } = userStore.user;
    const newMessage = { text, type: 'sent', id };
    this.messages.push(newMessage);
    socket.emit(user.id, newMessage);
  };
}

export const chat = new chatStore();
