import React from 'react';
import './App.css';


import { requestFirebaseNotificationPermission } from './firebaseInit';
import { Messaging } from './Messaging'
import { registerSession } from './services/messaging-service'



function App() {

  requestFirebaseNotificationPermission()
    .then((firebaseToken) => {
      // eslint-disable-next-line no-console
      console.log(firebaseToken);
      registerSession(firebaseToken);
      sessionStorage.setItem('tkn', firebaseToken);
    })
    .catch((err) => {
      return err;
    });


  return (
    <div className="App">
      <Messaging />
    </div>
  );
}

export default App;
