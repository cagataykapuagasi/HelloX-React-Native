import { observable, action } from 'mobx';
import io from 'socket.io-client/dist/socket.io';
import { user as userStore } from './userStore';

let socket = null;

class chatStore {
  @observable
  messages = [];

  @observable
  rooms = {};

  init = async () => {
    console.log('chat init');
    const { token, user } = userStore.user;
    socket = await io.connect('http://localhost:3000', {
      query: {
        token,
      },
    });

    socket.on('new message', ({ senderId, recipientId, ...other }) => {
      this.addNewMessage({
        type: 'received',
        recipientId: senderId,
        ...other,
      });
    });
  };

  sendMessage = (recipientId, message) => {
    const { token, user } = userStore.user;
    const newMessage = {
      message,
      recipientId,
      senderId: user.id,
    };
    socket.emit('new message', newMessage);
    this.addNewMessage({ type: 'sent', ...newMessage });
  };

  @action
  addNewMessage = ({ recipientId, message, type }) => {
    const { rooms } = this;
    const roomId = recipientId;
    let room = rooms[roomId];

    const newMessage = {
      message,
      type,
    };

    if (room) {
      room.messages.push(newMessage);
    } else {
      room = { messages: [] };
      room.messages.push(newMessage);
    }
    rooms[roomId] = room;
  };

  getRoom = id => {
    const roomId = id;
    let room = this.rooms[roomId];

    if (room) {
      return this.rooms[roomId].messages;
    }
    room = { messages: [] };
    this.rooms[roomId] = room;
    return this.rooms[roomId].messages;
  };
}

export const chat = new chatStore();
