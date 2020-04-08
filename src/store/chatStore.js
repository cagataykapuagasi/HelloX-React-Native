import { observable, action } from 'mobx';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

let _io = null;
let socket = null;

export default class chatStore {
  @observable
  rooms = {};
  @observable
  currentUserStatus = null;
  @observable
  connected = false;
  @observable
  currentUser = null;
  constructor(store) {
    this.store = store;
  }

  init = async (token) => {
    await this.loadRooms();
    _io = await io('https://hellox.herokuapp.com/', {
      query: {
        token,
      },
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      transports: ['websocket'],
    });

    _io.on('connect', async () => {
      this.connected = _io.connected;
      socket = _io.connect();

      _io.on('new message', ({ senderId, recipientId, ...other }) => {
        this.addNewMessage({
          type: 'received',
          recipientId: senderId,
          ...other,
        });
      });
    });

    _io.on('disconnect', (e) => {
      this.connected = false;
    });
  };

  disconnect = () => {
    _io.disconnect();
  };

  @action
  subscribeToUser = (id) => {
    if (!this.connected || !socket) {
      return;
    }
    socket.emit('subscribe', id);

    _io.on('subscribelisten', (status) => {
      this.currentUserStatus = status;
    });
  };

  unSubscribeToUser = (id) => {
    if (!this.connected || !socket) {
      return;
    }
    socket.emit('unsubscribe', id);
    this.currentUserStatus = null;
    _io.off('subscribelisten');
  };

  loadRooms = async () => {
    const rooms = JSON.parse(await AsyncStorage.getItem('rooms'));
    if (rooms) {
      this.rooms = rooms;
    }
  };

  sendMessage = (data) => {
    const { username, id } = this.store.userStore.user.profile;
    const newMessage = {
      ...data,
      senderId: id,
      username,
      date: Date.now(),
    };
    socket.emit('new message', newMessage);
    this.addNewMessage({ type: 'sent', ...newMessage });
  };

  saveRooms = async () => await AsyncStorage.setItem('rooms', JSON.stringify(this.rooms));

  @action
  addNewMessage = ({ recipientId, username, profile_photo, ...other }) => {
    const { rooms } = this;
    const roomId = recipientId;
    let room = rooms[roomId];

    if (room) {
      room.messages.push(other);
    } else {
      room = {
        messages: [],
        user: { username, id: recipientId, profile_photo },
        unRead: 1,
      };
      room.messages.push(other);
    }
    room.lastUpdate = Date.now();
    room.unRead++;
    rooms[roomId] = room;

    this.saveRooms();
  };

  @action
  closeRoom = (id) => {
    if (this.rooms[id] && !this.rooms[id].messages.length) {
      delete this.rooms[id];
    }

    this.currentUser = null;
    this.saveRooms();
  };

  @action
  deleteRoom = (id) => {
    Actions.pop();
    delete this.rooms[id];
    this.saveRooms();
  };

  @action
  deleteRooms = async () => {
    await AsyncStorage.removeItem('rooms');
    this.rooms = {};
  };

  @action
  getRoom = ({ username, id, profile_photo }) => {
    const roomId = id;
    let room = this.rooms[roomId];
    this.currentUser = username;

    if (room) {
      room.unRead = 0;
      return this.rooms[roomId].messages;
    }
    room = { messages: [], user: { username, id, profile_photo }, unRead: 0 };
    this.rooms[roomId] = room;
    return this.rooms[roomId].messages;
  };
}
