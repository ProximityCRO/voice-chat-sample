/* GEORGE CODE  */
import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyBerFJ0Gfg-ulMUjgMwjF4Fwj5bzb1mqEA",
  authDomain: "node-pn-sample.firebaseapp.com",
  databaseURL: "https://node-pn-sample.firebaseio.com",
  projectId: "node-pn-sample",
  storageBucket: "node-pn-sample.appspot.com",
  messagingSenderId: "750237290410",
  appId: "1:750237290410:web:6b8b7c9b06d6bc96e265d3"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
console.log(messaging);

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });


// export const onMessageListener = () =>
// new Promise((resolve) => {
// messaging.onMessage((payload) => {
//   console.log(payload);
// });
//});

export const fbMessaging = messaging;