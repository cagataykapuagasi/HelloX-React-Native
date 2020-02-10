import { Platform, Dimensions, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  request,
  openSettings,
} from 'react-native-permissions';
import RNExitApp from 'react-native-exit-app';

const { width, height } = Dimensions.get('window');

const {
  IOS: { LOCATION_WHEN_IN_USE },
  ANDROID: { ACCESS_FINE_LOCATION },
} = PERMISSIONS;

let watchID;
const latitudeDelta = 0.002;

options = {
  enableHighAccuracy: true,
  forceRequestLocation: true,
};

const ShowAlert = () =>
  Alert.alert(
    'Konum',
    'Uygulamayı kullanmak için konum izni vermeniz gerekiyor.',
    [
      {
        text: 'Ayarları aç',
        onPress: () => openSettings().then(RNExitApp.exitApp),
      },
      {
        text: 'Kapat',
        onPress: RNExitApp.exitApp,
      },
    ]
  );

const getLocation = () =>
  request(
    Platform.select({
      android: ACCESS_FINE_LOCATION,
      ios: LOCATION_WHEN_IN_USE,
    })
  ).then(result => {
    switch (result) {
      case 'granted':
        return getCurrentPosition();
      case 'denied':
        getLocation();
        break;
      default:
        ShowAlert();
        break;
    }
  });

const getCurrentPosition = async () => {
  const location = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });

  return new Promise((resolve, reject) => {
    location
      .then(({ coords: { latitude, longitude } }) => {
        let region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta,
          longitudeDelta: latitudeDelta * (width / height),
        };

        resolve(region);
      })
      .catch(er => reject(er));
  });
};

export { getLocation };
