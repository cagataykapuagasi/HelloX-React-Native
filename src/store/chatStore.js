import { observable, action } from 'mobx';
import io from 'socket.io-client/dist/socket.io';
import { user as userStore } from './userStore';
import AsyncStorage from '@react-native-community/async-storage';

let socket = null;

class chatStore {
  @observable
  rooms = {};

  init = async () => {
    console.log('chat init');
    await this.loadRooms();
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

  loadRooms = async () => {
    const rooms = JSON.parse(await AsyncStorage.getItem('rooms'));
    if (rooms) {
      this.rooms = rooms;
    }
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

    AsyncStorage.setItem('rooms', JSON.stringify(rooms));
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
