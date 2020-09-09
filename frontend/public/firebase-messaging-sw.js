importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBerFJ0Gfg-ulMUjgMwjF4Fwj5bzb1mqEA",
    authDomain: "node-pn-sample.firebaseapp.com",
    databaseURL: "https://node-pn-sample.firebaseio.com",
    projectId: "node-pn-sample",
    storageBucket: "node-pn-sample.appspot.com",
    messagingSenderId: "750237290410",
    appId: "1:750237290410:web:6b8b7c9b06d6bc96e265d3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload){
      console.log(payload);
      let options = {
          body : payload.data.status
      }
      return self.registration.ShowNotification('title', options)
  })
