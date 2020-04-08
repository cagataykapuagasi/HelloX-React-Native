import { showMessage } from 'react-native-flash-message';
import { User } from '../api';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

export default class NotificationStore {
  constructor(store) {
    this.store = store;
  }

  init = async () => {
    await firebase.messaging().requestPermission();
    const token = await firebase.messaging().getToken();

    if (token) {
      User.postFCM(token);
    }

    firebase.notifications().onNotification(({ _data }) => {
      const user = JSON.parse(_data.user);

      if (this.store.chatStore.currentUser === user.username) {
        return;
      }

      showMessage({
        message: {},
        user,
        onPress: () => Actions.chat({ item: user }),
      });
    });
  };
}
