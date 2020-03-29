import messaging from '@react-native-firebase/messaging';
import { showMessage } from 'react-native-flash-message';
import { User } from '../api';

export default class NotificationStore {
  constructor(store) {
    this.store = store;
  }

  init = async () => {
    const token = await messaging().getToken();
    if (token) {
      User.postFCM(token);
    }

    console.warn('firebase :D', token);

    messaging().onMessage(async remoteMessage => {
      console.warn(remoteMessage);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.warn('Message handled in the background!', remoteMessage);
    });
  };
}
