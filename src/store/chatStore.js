import { observable, action } from 'mobx';
import io from 'socket.io-client/dist/socket.io';
import { user as userStore } from './userStore';
import AsyncStorage from '@react-native-community/async-storage';

let socket = null;

class chatStore {
  @observable
  rooms = {};
  @observable
  currentRecipient = null;

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

  setCurrentRecipient = user => (this.currentRecipient = user);

  checkUserStatus = id => {
    socket.emit('checkstatus', id);
    socket.on('checkstatus', id => console.log(id));
  };

  loadRooms = async () => {
    const rooms = JSON.parse(await AsyncStorage.getItem('rooms'));
    if (rooms) {
      this.rooms = rooms;
    }
  };

  sendMessage = ({ recipientId, message }) => {
    const { user } = userStore.user;
    const newMessage = {
      message,
      recipientId,
      senderId: user.id,
    };
    socket.emit('new message', newMessage);
    this.addNewMessage({ type: 'sent', ...newMessage });
  };

  saveRooms = () =>
    AsyncStorage.setItem('rooms', JSON.stringify(this.rooms));

  @action
  addNewMessage = ({ recipientId, message, type }) => {
    const { rooms } = this;
    const roomId = recipientId;
    let room = rooms[roomId];

    const newMessage = {
      message,
      type,
      //viewed: false,
    };

    if (room) {
      room.messages.push(newMessage);
    } else {
      room = { messages: [] };
      room.messages.push(newMessage);
    }
    room.lastUpdate = Date.now();
    rooms[roomId] = room;

    this.saveRooms();
  };

  @action
  closeRoom = id => {
    if (!this.rooms[id].messages.length) {
      delete this.rooms[id];
    }
  };

  @action
  getRoom = id => {
    const roomId = id;
    let room = this.rooms[roomId];

    if (room) {
      return this.rooms[roomId].messages;
    }
    room = { messages: [] };
    if (!room.user) {
      room.user = this.currentRecipient;
    }
    this.rooms[roomId] = room;
    return this.rooms[roomId].messages;
  };
}

export const chat = new chatStore();
