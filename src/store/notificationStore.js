import messaging from '@react-native-firebase/messaging';
import { showMessage } from 'react-native-flash-message';
import { User } from '../api';
import { Actions } from 'react-native-router-flux';

export default class NotificationStore {
  constructor(store) {
    this.store = store;
  }

  init = async () => {
    const token = await messaging().getToken();
    if (token) {
      User.postFCM(token);
    }

    console.log('firebase :D', token);

    messaging().onMessage(async ({ data: { user } }) => {
      Actions.chat({ item: JSON.parse(user) });
      console.log('test', JSON.parse(user));
    });

    messaging().setBackgroundMessageHandler(async ({ data: { user } }) => {
      setTimeout(() => {
        Actions.chat({ item: JSON.parse(user) });
      }, 1000);
      console.warn('Message handled in the background!', JSON.parse(user));
    });
  };
}
