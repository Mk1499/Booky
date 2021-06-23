import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization statuss:', authStatus);
    await messaging()
      .getToken()
      .then((token) => {
        // console.log('Your Device Token is : ', token);
        AsyncStorage.setItem('DeviceToken', token);
      });
    messaging().subscribeToTopic('MobileApp');
  }
}

export const backgroundMsgs = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
  });
};

export const forgroundMsgs = () => {
  messaging().onMessage(async (remoteMessage) => {
    // console.log(
    //   'A new FCM message arrived! from fb file',
    //   JSON.stringify(remoteMessage),
    // );
  });
};
