
      
      // Your web app's Firebase configuration
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


      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
      });

      messaging.requestPermission().then(()=>{
        console.log("permissions right")
        return messaging.getToken();
      })
      .then((tkn) =>{
        console.log(`tkn: ${tkn}`)
       // document.getElementById('tkn').value = tkn;
       })
      .catch((e)=>{
        console.error(e)
      })

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/firebase-messaging-sw.js');
        });
      }